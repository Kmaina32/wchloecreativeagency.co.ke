"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import type { Talent } from "@/lib/definitions"
import placeholderImagesData from '@/lib/placeholder-images.json'
import { format } from "date-fns"

const { placeholderImages } = placeholderImagesData;

export const columns: ColumnDef<Talent>[] = [
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
    header: "Name",
    cell: ({ row }) => {
      const talent = row.original;
      const profileImage = placeholderImages.find(img => img.id === talent.profileImage);
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={profileImage?.imageUrl} alt={talent.name} />
            <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{talent.name}</div>
            <div className="text-sm text-muted-foreground">{talent.email}</div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => {
      const isApproved = row.getValue("approved")
      return <Badge variant={isApproved ? "default" : "secondary"}>{isApproved ? "Approved" : "Pending"}</Badge>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => {
      return <span>{format(new Date(row.original.createdAt), 'MMM d, yyyy')}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const talent = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(talent.id)}
            >
              Copy talent ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
