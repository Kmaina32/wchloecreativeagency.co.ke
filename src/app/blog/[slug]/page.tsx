import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/placeholder-data';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Metadata } from 'next';

const { placeholderImages } = placeholderImagesData;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | W. Chloe Creative Hub`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = placeholderImages.find((img) => img.id === post.featuredImage);

  return (
    <article>
      <header className="container mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold max-w-3xl mx-auto">{post.title}</h1>
        <p className="text-muted-foreground mt-4">
          By {post.author} on {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {post.tags.map((tag) => (
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
