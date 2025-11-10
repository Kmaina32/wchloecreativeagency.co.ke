'use client';
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import Link from "next/link"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { Talent } from "@/lib/definitions";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTalentPage() {
  const firestore = useFirestore();
  const talentsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'talents') : null, [firestore]);
  const { data: talents, isLoading } = useCollection<Talent>(talentsQuery);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Talent Management</h2>
          <p className="text-muted-foreground">
            Here you can add, edit, and manage all talent profiles.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/talent/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Talent
          </Link>
        </Button>
      </div>
      {isLoading && (
        <div className="rounded-md border bg-card">
           <Skeleton className="h-[400px] w-full" />
        </div>
      )}
      {!isLoading && <DataTable columns={columns} data={talents || []} />}
    </div>
  )
}
