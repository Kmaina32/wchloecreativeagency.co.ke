import { messages } from "@/lib/placeholder-data"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"

export default function AdminMessagesPage() {
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
      <DataTable columns={columns} data={messages} />
    </div>
  )
}
