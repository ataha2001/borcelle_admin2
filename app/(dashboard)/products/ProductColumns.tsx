"use client"
 
import Delete from "@/components/custom ui/Delete"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row})=><Link href={`/products/${row.original._id}`} className="hover:text-red-1"><p>{row.original.title}</p></Link> 
    },
    {
      accessorKey: "category",
      header: "Category",
      // cell: ({row})=> <p>{row.original.products.length}</p>
    },
    {
      accessorKey: "collections",
      header: "Collections",
      cell: ({row})=> row?.original?.collections?.map((collection)=> collection.title).join(", ")
    },
    {
      accessorKey: "price",
      header: "Price ($)",
    },
    {
      accessorKey: "expense",
      header: "Expense ($)",
    },
    {
      id: 'actions',
      cell: ({row})=> <Delete item="product" id={row.original._id} />
    },
  ]