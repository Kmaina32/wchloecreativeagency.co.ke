'use client';

import Link from 'next/link';
import Image from 'next/image';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { BlogPost } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

const { placeholderImages } = placeholderImagesData;

export default function BlogPage() {
  const firestore = useFirestore();
  const postsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'blogPosts') : null, [firestore]);
  const { data: blogPosts, isLoading } = useCollection<BlogPost>(postsQuery);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">The Creative Pulse</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          Agency news, industry insights, and stories from our vibrant community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-full flex flex-col">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
              <CardFooter>
                 <Skeleton className="h-6 w-1/4" />
              </CardFooter>
            </Card>
          ))
        )}
        {blogPosts?.map((post) => {
          const featuredImage = placeholderImages.find((img) => img.id === post.featuredImage);
          const excerpt = post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...';

          return (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                {featuredImage && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={featuredImage.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={featuredImage.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                   <p className="text-sm text-muted-foreground pt-1">
                    By {post.author} on {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : ''}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                   <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-semibold text-sm">
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
