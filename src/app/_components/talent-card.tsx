import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Talent } from '@/lib/definitions';
import placeholderImages from '@/lib/placeholder-images.json';
import { ArrowUpRight } from 'lucide-react';

type TalentCardProps = {
  talent: Talent;
};

export default function TalentCard({ talent }: TalentCardProps) {
  const profileImage = placeholderImages.placeholderImages.find(
    (img) => img.id === talent.profileImage
  );

  return (
    <Link href={`/talent/${talent.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={talent.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={profileImage.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
             <div className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-4 h-4 text-foreground" />
             </div>
          </div>
          <div className="p-4">
            <h3 className="font-headline text-lg font-semibold truncate">{talent.name}</h3>
            <p className="text-sm text-primary">{talent.category}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
