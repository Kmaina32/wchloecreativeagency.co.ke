'use client';
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { Message } from "@/lib/definitions";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminMessagesPage() {
  const firestore = useFirestore();
  const messagesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'messages') : null, [firestore]);
  const { data: messages, isLoading } = useCollection<Message>(messagesQuery);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">
            View messages and booking requests submitted via the contact form.
          </p>
        </div>
      </div>
      {isLoading && (
        <div className="rounded-md border bg-card">
           <Skeleton className="h-[400px] w-full" />
        </div>
      )}
      {!isLoading && <DataTable columns={columns} data={messages || []} />}
    </div>
  )
}
