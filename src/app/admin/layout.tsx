'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sprout, LayoutDashboard, Users, FileText, MessageSquare, Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/talent', label: 'Talent', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  const isLinkActive = (href: string) => {
    if (href === '/admin/dashboard') {
        return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
         <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-50">
            <Skeleton className="h-8 w-32" />
            <div className="ml-auto">
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
         </header>
         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Skeleton className="h-[400px] w-full" />
         </main>
        </div>
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Sprout className="h-6 w-6 text-primary" />
            <span className="sr-only">W. Chloe Creative Hub</span>
          </Link>
          {adminNavLinks.map(link => (
             <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "transition-colors hover:text-foreground",
                    isLinkActive(link.href) ? "text-foreground" : "text-muted-foreground"
                )}
            >
                {link.label}
          </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Sprout className="h-6 w-6 text-primary" />
                <span className="">W. Chloe</span>
              </Link>
              {adminNavLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "transition-colors hover:text-foreground",
                        isLinkActive(link.href) ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    {link.label}
              </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
                {/* Search can go here */}
            </div>
             <div className="flex items-center gap-4">
                <p className="text-sm hidden sm:block">{user.email || 'Admin User'}</p>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || "https://picsum.photos/seed/admin/100/100"} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                </Button>
            </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
