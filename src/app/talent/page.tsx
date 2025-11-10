'use client';
import { useState, useMemo } from 'react';
import TalentCard from '@/app/_components/talent-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Talent } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

export default function TalentDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const firestore = useFirestore();

  const talentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;

    let q = query(collection(firestore, 'talents'), where('approved', '==', true));

    if (category !== 'all') {
      q = query(q, where('category', '==', category));
    }
    
    return q;
  }, [firestore, category]);

  const { data: talents, isLoading } = useCollection<Talent>(talentsQuery);

  const filteredTalents = useMemo(() => {
    if (!talents) return [];
    return talents.filter(talent =>
      talent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [talents, searchTerm]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Talent</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          A curated collective of Africa's most promising creative professionals.
        </p>
      </div>

      <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search" className="text-sm font-medium text-muted-foreground">Search by name</label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="search" 
                placeholder="e.g., Patricia Wambui" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium text-muted-foreground">Category</label>
             <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="mt-1">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="actress">Actress</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="content-creator">Content Creator</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {isLoading && (
           Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
        )}
        {!isLoading && filteredTalents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
       {!isLoading && filteredTalents.length === 0 && (
        <div className="text-center col-span-full py-12">
          <p className="text-muted-foreground">No talent found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
