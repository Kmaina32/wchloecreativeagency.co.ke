import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wchloe.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'W. Chloe Creative Agency | Premier African Talent',
    template: `%s | W. Chloe Creative Agency`,
  },
  description: 'The premier creative talent agency for Africa\'s top models, actors, artists, and content creators. Discover, book, and collaborate with exceptional talent.',
  keywords: ['African talent agency', 'creative agency Kenya', 'models in Africa', 'African actors', 'content creators Africa', 'W. Chloe', 'talent management', 'book African creatives'],
  openGraph: {
    title: 'W. Chloe Creative Agency | Premier African Talent',
    description: 'Discover and collaborate with the most exceptional artists, actors, models, and creators from across the continent.',
    url: siteUrl,
    siteName: 'W. Chloe Creative Agency',
    images: [
      {
        url: 'https://www.tingatingaart.com/cdn/shop/articles/african_culture_2048x.jpg?v=1701245064',
        width: 1200,
        height: 630,
        alt: 'Vibrant African cultural art',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W. Chloe Creative Agency | Premier African Talent',
    description: 'The premier creative talent agency for Africa\'s top models, actors, artists, and content creators.',
    images: ['https://www.tingatingaart.com/cdn/shop/articles/african_culture_2048x.jpg?v=1701245064'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen')}>
        <FirebaseClientProvider>
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
