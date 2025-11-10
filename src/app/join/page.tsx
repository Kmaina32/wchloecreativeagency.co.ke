'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const { register, handleSubmit, control, formState: { errors } } = useForm<JoinFormValues>({
      resolver: zodResolver(joinFormSchema),
  });

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
         <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">Become a W. Chloe Creative</CardTitle>
            <CardDescription className="pt-2">
              If you are a talented artist, actor, model, or creator, we invite you to apply.
              <br />
              Complete the form below to start your journey with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="e.g., Patricia Wambui" {...register("fullName")} />
                 {errors.fullName && <p className="text-destructive text-sm">{errors.fullName.message}</p>}
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" {...register("email")} />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")} />
                    {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                </div>
              </div>
               <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+254 700 000 000" {...register("phone")} />
                   {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Primary Category</Label>
                  <Select name={control.name} onValueChange={(value) => control._updateFormState({ ...control._formValues, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select your creative category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actress">Actress</SelectItem>
                      <SelectItem value="artist">Artist</SelectItem>
                      <SelectItem value="model">Model</SelectItem>
                      <SelectItem value="content-creator">Content Creator</SelectItem>
                      <SelectItem value="photographer">Photographer</SelectItem>
                    </SelectContent>
                  </Select>
                   {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Your Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself, your work, and your aspirations..." rows={5} {...register("bio")} />
                 {errors.bio && <p className="text-destructive text-sm">{errors.bio.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioLink">Link to Portfolio or Social Media</Label>
                <Input id="portfolioLink" placeholder="e.g., https://instagram.com/yourprofile" {...register("portfolioLink")} />
                 {errors.portfolioLink && <p className="text-destructive text-sm">{errors.portfolioLink.message}</p>}
                <p className="text-xs text-muted-foreground">Link to your Instagram, Behance, YouTube, or personal website.</p>
              </div>
              
              <Button type="submit" className="w-full" size="lg">Submit Application</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
