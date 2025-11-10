'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const joinFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  category: z.enum(['actress', 'artist', 'model', 'content-creator', 'photographer'], {
    errorMap: () => ({ message: "Please select a category." }),
  }),
  bio: z.string().min(20, "Bio must be at least 20 characters long."),
  portfolioLink: z.string().url("Please enter a valid URL."),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;


export default function JoinPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<JoinFormValues>({
      resolver: zodResolver(joinFormSchema),
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        portfolioLink: '',
      }
  });

  const { formState: { errors } } = form;

  const onSubmit: SubmitHandler<JoinFormValues> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const talentData = {
        id: user.uid,
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        category: data.category,
        bio: data.bio,
        socials: {
          instagram: data.portfolioLink,
        },
        portfolio: [],
        profileImage: '',
        approved: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(firestore, "talents", user.uid), talentData);

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We will review your profile and be in touch.",
      });

      router.push('/talent');

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not submit application.",
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

      <div className="mx-auto grid w-full max-w-md gap-6">
         <Card className="bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">Become a W. Chloe Creative</CardTitle>
            <CardDescription className="pt-2">
              If you are a talented artist, actor, model, or creator, we invite you to apply.
              <br />
              Complete the form below to start your journey with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Patricia Wambui" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                             <Input type="tel" placeholder="+254 700 000 000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your creative category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="actress">Actress</SelectItem>
                            <SelectItem value="artist">Artist</SelectItem>
                            <SelectItem value="model">Model</SelectItem>
                            <SelectItem value="content-creator">Content Creator</SelectItem>
                            <SelectItem value="photographer">Photographer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                 <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about yourself, your work, and your aspirations..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="portfolioLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link to Portfolio or Social Media</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., https://instagram.com/yourprofile" {...field} />
                      </FormControl>
                       <p className="text-xs text-muted-foreground">Link to your Instagram, Behance, YouTube, or personal website.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" size="lg">Submit Application</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
