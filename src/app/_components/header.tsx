'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const navLinks = [
  { href: '/talent', label: 'Talent' },
  { href: '/blog', label: 'Blog' },
  { href: '/talent-match', label: 'Talent Match' },
  { href: '/contact', label: 'Contact' },
];

const adminEmails = ['gmaina424@gmail.com', 'pattynjoki25@gmail.com'];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const isAdmin = user && adminEmails.includes(user.email || '');

  const isNavLinkActive = (href: string) => {
    return pathname.startsWith(href);
  };
  
  const isHomePage = pathname === '/';

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/login');
  };

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
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {isUserLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt={user.email || 'User'} />
                     <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                     <Link href="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
                <div className="pt-4 border-t">
                  {isUserLoading ? (
                    <div className="flex flex-col space-y-2">
                       <Skeleton className="h-10 w-full" />
                       <Skeleton className="h-10 w-full" />
                    </div>
                  ) : user ? (
                    <div className="space-y-4">
                       <Link
                        href="/profile"
                        className={cn(
                          'text-lg transition-colors hover:text-primary',
                          isNavLinkActive('/profile') ? 'text-primary font-bold' : 'text-foreground'
                        )}
                      >
                        My Profile
                      </Link>
                      {isAdmin && (
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
                       <Button onClick={handleLogout} variant="outline" className="w-full">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Button asChild variant="outline">
                          <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                          <Link href="/signup">Sign Up</Link>
                      </Button>
                    </div>
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