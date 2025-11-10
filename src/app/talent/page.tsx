import { talents } from '@/lib/placeholder-data';
import TalentCard from '@/app/_components/talent-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Talent Directory | W. Chloe Creative Hub',
  description: 'Explore our diverse roster of talented artists, actors, models, and content creators.',
};

export default function TalentDirectoryPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Talent</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          A curated collective of Africa's most promising creative professionals.
        </p>
      </div>

      <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search" className="text-sm font-medium text-muted-foreground">Search by name</label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="search" placeholder="e.g., Patricia Wambui" className="pl-10" />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium text-muted-foreground">Category</label>
             <Select>
              <SelectTrigger id="category" className="mt-1">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="actress">Actress</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="creator">Content Creator</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="availability" className="text-sm font-medium text-muted-foreground">Availability</label>
             <Select>
              <SelectTrigger id="availability" className="mt-1">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="soon">Available Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {talents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  );
}
