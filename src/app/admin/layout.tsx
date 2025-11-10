'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sprout, LayoutDashboard, Users, FileText, MessageSquare, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  
  const isLinkActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent className="p-2">
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="h-10 w-10 p-0">
                  <Link href="/" className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
                      <Sprout className="h-6 w-6 text-primary-foreground" />
                  </Link>
                </Button>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <h2 className="font-headline font-semibold text-lg text-sidebar-foreground">W. Chloe</h2>
                    <p className="text-xs text-sidebar-foreground/70">Admin Panel</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarMenu>
              {adminNavLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isLinkActive(link.href)}
                    tooltip={{ children: link.label }}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isLinkActive('/admin/settings')} tooltip={{ children: 'Settings' }}>
                  <Link href="#">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card px-6">
                <SidebarTrigger className="md:hidden"/>
                <div className="flex-1">
                    <h1 className="font-semibold text-lg">
                        {adminNavLinks.find(link => isLinkActive(link.href))?.label || 'Admin'}
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <p className="text-sm hidden sm:block">Admin User</p>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-background">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
