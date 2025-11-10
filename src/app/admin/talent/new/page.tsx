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
import { useToast } from "@/hooks/use-toast";

const talentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  category: z.enum(['Actress', 'Artist', 'Model', 'Content Creator', 'Photographer']),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters." }),
  instagram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
});

type TalentFormValues = z.infer<typeof talentFormSchema>;

export default function NewTalentPage() {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors } } = useForm<TalentFormValues>({
        resolver: zodResolver(talentFormSchema),
    });

    const onSubmit: SubmitHandler<TalentFormValues> = (data) => {
        console.log(data);
        toast({
            title: "Talent Profile Created",
            description: `${data.name} has been added to the talent pool.`,
        });
    };

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
            <h2 className="text-2xl font-bold tracking-tight">Add New Talent</h2>
            <p className="text-muted-foreground">
                Fill out the form below to add a new talent to the roster.
            </p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Talent Information</CardTitle>
                <CardDescription>All fields are required unless otherwise noted.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(value) => control._updateFormState({ ...control._formValues, category: value })} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Actress">Actress</SelectItem>
                                    <SelectItem value="Artist">Artist</SelectItem>
                                    <SelectItem value="Model">Model</SelectItem>
                                    <SelectItem value="Content Creator">Content Creator</SelectItem>
                                    <SelectItem value="Photographer">Photographer</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                             {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" {...register("phone")} />
                             {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea id="bio" rows={5} {...register("bio")} />
                        {errors.bio && <p className="text-destructive text-sm">{errors.bio.message}</p>}
                    </div>

                     <div className="grid sm:grid-cols-3 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram URL (Optional)</Label>
                            <Input id="instagram" {...register("instagram")} />
                             {errors.instagram && <p className="text-destructive text-sm">{errors.instagram.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter URL (Optional)</Label>
                            <Input id="twitter" {...register("twitter")} />
                            {errors.twitter && <p className="text-destructive text-sm">{errors.twitter.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok URL (Optional)</Label>
                            <Input id="tiktok" {...register("tiktok")} />
                             {errors.tiktok && <p className="text-destructive text-sm">{errors.tiktok.message}</p>}
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button type="submit">Create Talent Profile</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
