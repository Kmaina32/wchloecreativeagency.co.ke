
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useUser } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);


export default function SignupPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Redirect if user is logged in
    if (!isUserLoading && user) {
      router.push('/complete-profile');
    }
  }, [user, isUserLoading, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!auth) return;
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Account Created!",
        description: "You've been successfully signed up. Let's complete your profile.",
      });
      // The useEffect will handle the redirection
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not create your account.",
      });
    }
  };
  
  const handleGoogleSignup = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Signed In with Google!",
        description: "Let's complete your profile.",
      });
      // The useEffect will handle the redirection
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not sign in with Google.",
      });
    }
  };

  return (
     <div className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Image
          src="https://wallpapers.com/images/hd/african-graffiti-art-9voko704yv7gt2fh.jpg"
          alt="African graffiti art"
          fill
          className="object-cover -z-10"
          data-ai-hint="african graffiti"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <div className="mx-auto grid w-full max-w-sm gap-6">
           <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
                <Link href="/" className="font-headline text-2xl font-bold text-primary flex items-center justify-center gap-2 mb-2">
                    <Sprout className="h-6 w-6" />
                    W. Chloe
                </Link>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Enter your details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>                  <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                  {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
              <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                      </span>
                  </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign Up with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
