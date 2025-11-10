'use client';

import Link from 'next/link';
import { Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid gap-8 md:grid-cols-12">
           <div className="space-y-2 md:col-span-4">
            <Link href="/" className="font-headline text-xl font-bold text-primary">
              W. Chloe Creative Agency
            </Link>
            <p className="text-muted-foreground text-sm">Discover Africa's finest creative talent.</p>
             <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary"><Github className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="md:col-span-8">
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h3 className="font-headline text-lg font-semibold mb-2">Navigate</h3>
                     <ul className="space-y-1">
                       <li><Link href="/talent" className="text-sm text-muted-foreground hover:text-primary">Talent</Link></li>
                       <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
                       <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                     </ul>
                 </div>
                 <div>
                     <h3 className="font-headline text-lg font-semibold mb-2">Connect</h3>
                     <div className="space-y-2 text-sm text-muted-foreground">
                         <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4" />
                             <span>Westlands, Nairobi</span>
                         </div>
                          <div className="flex items-center gap-2">
                             <Mail className="w-4 h-4" />
                             <a href="mailto:contact@wchloecreativetalent.co.ke" className="hover:text-primary">contact@wchloecreativetalent.co.ke</a>
                         </div>
                          <div className="flex items-center gap-2">
                             <Phone className="w-4 h-4" />
                             <span>+254707858885</span>
                         </div>
                     </div>
                 </div>
               </div>
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} W. Chloe Creative Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
