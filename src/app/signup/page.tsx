
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
           <Card>
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
