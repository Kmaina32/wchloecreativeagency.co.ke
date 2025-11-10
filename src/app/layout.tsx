import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'W. Chloe Creative Hub',
  description: 'A creative talent agency for artists, actors, models, and content creators.',
  keywords: ['Creative Talent Africa', 'African Artists Agency', 'Kenya Talents', 'East Africa Creatives', 'W Chloe CTA'],
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
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
