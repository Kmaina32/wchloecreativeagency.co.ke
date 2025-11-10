'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TalentCard from '@/app/_components/talent-card';
import placeholderImages from '@/lib/placeholder-images.json';
import { ArrowRight, Palette, Clapperboard, Mic, Camera } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import type { Talent } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-background');
  const firestore = useFirestore();

  const featuredTalentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'talents'),
      where('approved', '==', true),
      limit(3)
    );
  }, [firestore]);

  const { data: featuredTalents, isLoading } = useCollection<Talent>(featuredTalentsQuery);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            Where African Creativity Shines
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Discover and collaborate with the most exceptional artists, actors, models, and creators from across the continent.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/talent">Explore Talent <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book a Creative</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Talent</h2>
            <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
              Meet some of the exceptional individuals shaping the creative landscape.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
            {featuredTalents?.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/talent">View All Talent</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">A Hub for Africa's Brightest Stars</h2>
              <p className="mt-4 text-muted-foreground">
                W. Chloe is more than an agency; we are a community dedicated to nurturing, managing, and elevating creative careers. We provide our talent with the platform and partnerships they need to succeed on a global stage.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-full"><Palette /></div>
                  <div>
                    <h3 className="font-semibold">Artists & Designers</h3>
                    <p className="text-muted-foreground text-sm">Visionaries who paint, sculpt, and design the future.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-full"><Clapperboard /></div>
                  <div>
                    <h3 className="font-semibold">Actors & Performers</h3>
                    <p className="text-muted-foreground text-sm">Storytellers who bring characters to life on screen and stage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-full"><Camera /></div>
                  <div>
                    <h3 className="font-semibold">Models</h3>
                    <p className="text-muted-foreground text-sm">Faces that define trends and captivate audiences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-full"><Mic /></div>
                   <div>
                    <h3 className="font-semibold">Content Creators</h3>
                    <p className="text-muted-foreground text-sm">Digital natives who build communities and influence culture.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
               <Image src="https://as1.ftcdn.net/v2/jpg/00/54/33/64/500_F_54336435_CEkBMzRjQivuN1iD4CnyP9aFz7pWg9ej.jpg" alt="Creative team" layout="fill" objectFit="cover" data-ai-hint="creative team" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Create Together?</h2>
           <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
             Whether you're a brand looking for your next star or a creative ready to shine, we want to hear from you.
           </p>
           <div className="mt-8 flex justify-center gap-4">
             <Button asChild size="lg">
               <Link href="/contact">Contact Us</Link>
             </Button>
             <Button asChild size="lg" variant="outline">
               <Link href="/signup">Join as Talent</Link>
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
