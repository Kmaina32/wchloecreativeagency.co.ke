
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Talent } from '@/lib/definitions';

const profileEditSchema = z.object({
  name: z.string().min(2, "Full name is required."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  category: z.enum(['actress', 'artist', 'model', 'content-creator', 'photographer'], {
    errorMap: () => ({ message: "Please select a category." }),
  }),
  bio: z.string().min(20, "Bio must be at least 20 characters long."),
  instagram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  rate: z.coerce.number().min(0, "Rate must be a positive number.").optional(),
  currency: z.enum(['USD', 'KES', 'EUR', 'GBP']).optional(),
});

type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

function EditProfileSkeleton() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                       <Skeleton className="h-10 w-32" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default function EditProfilePage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const talentDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'talents', user.uid);
  }, [firestore, user]);

  const { data: talent, isLoading: isTalentLoading } = useDoc<Talent>(talentDocRef);

  const form = useForm<ProfileEditFormValues>({
      resolver: zodResolver(profileEditSchema),
      defaultValues: {
        name: '',
        phone: '',
        bio: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        facebook: '',
        youtube: '',
      }
  });

  useEffect(() => {
    if (talent) {
        form.reset({
            name: talent.name,
            phone: talent.phone,
            category: talent.category,
            bio: talent.bio,
            instagram: talent.socials?.instagram || '',
            twitter: talent.socials?.twitter || '',
            tiktok: talent.socials?.tiktok || '',
            facebook: talent.socials?.facebook || '',
            youtube: talent.socials?.youtube || '',
            rate: talent.rate || undefined,
            currency: talent.currency || undefined,
        })
    }
  }, [talent, form]);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!isTalentLoading && !talent) {
        router.replace('/complete-profile');
    }
  }, [isTalentLoading, talent, router]);

  const onSubmit: SubmitHandler<ProfileEditFormValues> = async (data) => {
    if (!talentDocRef) return;

    try {
      const updatedData = {
        name: data.name,
        phone: data.phone,
        category: data.category,
        bio: data.bio,
        socials: {
            instagram: data.instagram,
            twitter: data.twitter,
            tiktok: data.tiktok,
            facebook: data.facebook,
            youtube: data.youtube,
        },
        rate: data.rate,
        currency: data.currency,
      };

      await updateDoc(talentDocRef, updatedData);

      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });

      router.push('/profile');

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not update your profile.",
      });
    }
  };

  if (isUserLoading || isTalentLoading || !talent) {
    return <EditProfileSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>
            Update your information to keep your profile fresh.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
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
                </div>
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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
                
                <CardTitle className="text-lg pt-4 border-t">Rates</CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Rate (Optional)</FormLabel>
                        <FormControl>
                           <Input type="number" placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="KES">KES (Ksh)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CardTitle className="text-lg pt-4 border-t">Social & Portfolio Links</CardTitle>

                <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                            <Input placeholder="https://instagram.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Twitter / X</FormLabel>
                        <FormControl>
                            <Input placeholder="https://twitter.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="tiktok"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                            <Input placeholder="https://tiktok.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                            <Input placeholder="https://facebook.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="youtube"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>YouTube</FormLabel>
                        <FormControl>
                            <Input placeholder="https://youtube.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
