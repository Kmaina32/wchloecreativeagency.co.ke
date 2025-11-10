'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Talent } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Instagram, Twitter, Music, Mail, Phone, Edit, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import placeholderImagesData from '@/lib/placeholder-images.json';

const { placeholderImages } = placeholderImagesData;

function ProfileSkeleton() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Skeleton className="w-40 h-40 mx-auto rounded-full mb-4" />
                            <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                            <Skeleton className="h-6 w-1/2 mx-auto" />
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full mt-6" />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <Skeleton className="h-8 w-48 mb-4" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                     <div>
                        <Skeleton className="h-8 w-48 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <Skeleton className="aspect-video w-full" />
                           <Skeleton className="aspect-video w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ProfilePage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const talentDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'talents', user.uid);
  }, [firestore, user]);
  
  const { data: talent, isLoading: isTalentLoading } = useDoc<Talent>(talentDocRef);

  if (isUserLoading || isTalentLoading) {
    return <ProfileSkeleton />;
  }
  
  if (!user) {
    router.replace('/login');
    return null;
  }
  
  if (!talent) {
    return (
        <div className="container mx-auto text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">It looks like your talent profile isn't complete yet.</p>
            <Button asChild>
                <Link href="/complete-profile">Complete Your Profile</Link>
            </Button>
        </div>
    )
  }

  const profileImage = placeholderImages.find(img => img.id === talent.profileImage);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 text-center">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                {profileImage ? (
                  <Image
                    src={profileImage.imageUrl}
                    alt={talent.name}
                    fill
                    className="object-cover"
                    data-ai-hint={profileImage.imageHint}
                  />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-5xl text-muted-foreground">{talent.name.charAt(0)}</span>
                    </div>
                )}
              </div>
              <h1 className="font-headline text-3xl font-bold">{talent.name}</h1>
              <p className="text-primary font-semibold text-lg capitalize">{talent.category}</p>
              
              <div className="flex justify-center space-x-4 mt-4 text-muted-foreground">
                {talent.socials?.instagram && <Link href={talent.socials.instagram} className="hover:text-primary"><Instagram /></Link>}
                {talent.socials?.twitter && <Link href={talent.socials.twitter} className="hover:text-primary"><Twitter /></Link>}
                {talent.socials?.tiktok && <Link href={talent.socials.tiktok} className="hover:text-primary"><Music /></Link>}
              </div>

              <Separator className="my-6" />

              <div className="text-left space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${talent.email}`} className="hover:text-primary">{talent.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{talent.phone}</span>
                </div>
              </div>
              
              {/* <Button asChild className="mt-6 w-full">
                <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Link>
              </Button> */}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="font-headline text-2xl font-semibold border-b pb-2">Biography</h2>
            <p className="mt-4 text-foreground/80">{talent.bio}</p>
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Rate Card</h2>
            <Card>
                <CardContent className="pt-6">
                     <div className="flex items-center justify-center text-center p-8">
                         <div className="text-muted-foreground">
                            <FileText className="h-10 w-10 mx-auto mb-2" />
                            <p>Your rate card is not yet available.</p>
                             <p className="text-sm">You can add it by editing your profile.</p>
                        </div>
                     </div>
                </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {talent.portfolio?.map((item, index) => {
                const portfolioImage = placeholderImages.find(img => img.id === item.image);
                return portfolioImage ? (
                  <Card key={index} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <Image
                          src={portfolioImage.imageUrl}
                          alt={item.caption}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={portfolioImage.imageHint}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground">{item.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null;
              })}
            </div>
            {(!talent.portfolio || talent.portfolio.length === 0) && (
              <p className="text-muted-foreground">You haven't added any portfolio items yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
