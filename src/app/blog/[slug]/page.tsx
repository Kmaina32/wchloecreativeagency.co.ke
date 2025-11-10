'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { BlogPost } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

const { placeholderImages } = placeholderImagesData;

function BlogPostSkeleton() {
  return (
    <article>
       <header className="container mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <Skeleton className="h-12 w-3/4 max-w-3xl mx-auto" />
        <Skeleton className="h-5 w-1/3 mx-auto mt-4" />
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </header>
       <div className="container mx-auto px-4 md:px-6">
        <Skeleton className="aspect-video w-full rounded-lg" />
       </div>
       <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <br />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
       </div>
    </article>
  )
}

export default function BlogPostPage() {
  const params = useParams();
  const id = params.slug as string; // The "slug" from the URL is the document ID
  const firestore = useFirestore();

  const postDocRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'blogPosts', id);
  }, [firestore, id]);

  const { data: post, isLoading } = useDoc<BlogPost>(postDocRef);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }
  
  if (!post) {
    notFound();
  }

  const featuredImage = placeholderImages.find((img) => img.id === post.featuredImage);

  return (
    <article>
      <header className="container mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold max-w-3xl mx-auto">{post.title}</h1>
        <p className="text-muted-foreground mt-4">
          By {post.author} on {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Date not available'}
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </header>

      {featuredImage && (
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={featuredImage.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={featuredImage.imageHint}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
