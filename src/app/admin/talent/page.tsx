import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { talents } from "@/lib/placeholder-data"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import Link from "next/link"

export default function AdminTalentPage() {
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
      <DataTable columns={columns} data={talents} />
    </div>
  )
}
