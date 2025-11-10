import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { talents } from '@/lib/placeholder-data';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Instagram, Twitter, Tiktok, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

const { placeholderImages } = placeholderImagesData;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const talent = talents.find((p) => p.id === params.id);
  if (!talent) {
    return { title: 'Talent Not Found' };
  }
  return {
    title: `${talent.name} | W. Chloe Creative Hub`,
    description: talent.bio,
  };
}

export default function TalentProfilePage({ params }: { params: { id:string } }) {
  const talent = talents.find((p) => p.id === params.id);

  if (!talent) {
    notFound();
  }

  const profileImage = placeholderImages.find(img => img.id === talent.profileImage);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 text-center">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                {profileImage && (
                  <Image
                    src={profileImage.imageUrl}
                    alt={talent.name}
                    fill
                    className="object-cover"
                    data-ai-hint={profileImage.imageHint}
                  />
                )}
              </div>
              <h1 className="font-headline text-3xl font-bold">{talent.name}</h1>
              <p className="text-primary font-semibold text-lg">{talent.category}</p>
              
              <div className="flex justify-center space-x-4 mt-4 text-muted-foreground">
                {talent.socials.instagram && <Link href={talent.socials.instagram} className="hover:text-primary"><Instagram /></Link>}
                {talent.socials.twitter && <Link href={talent.socials.twitter} className="hover:text-primary"><Twitter /></Link>}
                {talent.socials.tiktok && <Link href={talent.socials.tiktok} className="hover:text-primary"><Tiktok /></Link>}
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
              
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">Book {talent.name.split(' ')[0]}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-headline text-2xl font-semibold border-b pb-2">Biography</h2>
            <p className="mt-4 text-foreground/80">{talent.bio}</p>
          </div>
          
          <Separator className="my-8" />

          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {talent.portfolio.map((item, index) => {
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
            {talent.portfolio.length === 0 && (
              <p className="text-muted-foreground">No portfolio items available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
