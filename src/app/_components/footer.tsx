import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Link href="/" className="font-headline text-xl font-bold text-primary flex items-center gap-2">
              <Sprout />
              W. Chloe Creative Hub
            </Link>
            <p className="text-muted-foreground text-sm">Discover Africa's finest creative talent.</p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-2">Navigate</h3>
            <ul className="space-y-2">
              <li><Link href="/talent" className="text-sm text-muted-foreground hover:text-primary">Talent</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary"><Github className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} W. Chloe Creative Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
