'use client';
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import Link from "next/link"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { BlogPost } from "@/lib/definitions";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminBlogPage() {
  const firestore = useFirestore();
  const postsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'blogPosts') : null, [firestore]);
  const { data: blogPosts, isLoading } = useCollection<BlogPost>(postsQuery);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Manager</h2>
          <p className="text-muted-foreground">
            Create, edit, and publish articles or news updates.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>
       {isLoading && (
        <div className="rounded-md border bg-card">
           <Skeleton className="h-[400px] w-full" />
        </div>
      )}
      {!isLoading && <DataTable columns={columns} data={blogPosts || []} />}
    </div>
  )
}
