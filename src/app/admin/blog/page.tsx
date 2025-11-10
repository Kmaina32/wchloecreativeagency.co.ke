import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { blogPosts } from "@/lib/placeholder-data"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Manager</h2>
          <p className="text-muted-foreground">
            Create, edit, and publish articles or news updates.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      <DataTable columns={columns} data={blogPosts} />
    </div>
  )
}
