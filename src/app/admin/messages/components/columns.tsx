"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Message } from "@/lib/definitions"
import { format } from "date-fns"

export const columns: ColumnDef<Message>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "From",
     cell: ({ row }) => {
      const message = row.original;
      return (
        <div>
            <div className="font-medium">{message.name}</div>
            <div className="text-sm text-muted-foreground">{message.email}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "subject",
    header: "Subject",
     cell: ({ row }) => {
        return <p className="max-w-xs truncate">{row.original.subject}</p>
     }
  },
  {
    accessorKey: "read",
    header: "Status",
    cell: ({ row }) => {
      const isRead = row.original.read
      return <Badge variant={isRead ? "secondary" : "default"}>{isRead ? "Read" : "Unread"}</Badge>
    }
  },
    {
    accessorKey: "createdAt",
    header: "Date Received",
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : null;
      return <span>{date ? format(date, 'MMM d, yyyy') : 'N/A'}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Message</DropdownMenuItem>
            <DropdownMenuItem>Mark as Read</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
