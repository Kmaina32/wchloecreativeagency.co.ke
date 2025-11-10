'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

const navLinks = [
  { href: '/talent', label: 'Talent' },
  { href: '/blog', label: 'Blog' },
  { href: '/talent-match', label: 'Talent Match' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  const isNavLinkActive = (href: string) => {
    return pathname.startsWith(href);
  };
  
  const isHomePage = pathname === '/';

  return (
    <header className={cn("bg-transparent sticky top-0 z-40 border-b", { "bg-background/80 backdrop-blur-sm": !isHomePage })}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-headline text-2xl font-bold text-primary bg-foreground/10 backdrop-blur-sm border border-foreground/10 rounded-lg px-4 py-1">
          W. Chloe
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                isNavLinkActive(link.href) ? 'text-primary font-bold' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
          {!isUserLoading && user && (
            <Link
              href="/admin/dashboard"
              className={cn(
                'transition-colors hover:text-primary',
                isNavLinkActive("/admin/dashboard") ? 'text-primary font-bold' : 'text-foreground/60'
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          {!isUserLoading && !user && (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="font-headline text-2xl font-bold text-primary mb-4 bg-foreground/10 backdrop-blur-sm border border-foreground/10 rounded-lg px-4 py-1 self-start">
                  W. Chloe
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      isNavLinkActive(link.href) ? 'text-primary font-bold' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 {!isUserLoading && user && (
                    <Link
                      href="/admin/dashboard"
                      className={cn(
                        'text-lg transition-colors hover:text-primary',
                        isNavLinkActive('/admin/dashboard') ? 'text-primary font-bold' : 'text-foreground'
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {!isUserLoading && !user && (
                    <>
                      <Button asChild variant="outline">
                          <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                          <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
