'use client'
import { DataTable } from "@/components/custom ui/DataTable"
import React, { useEffect, useState } from "react"

import { columns } from "./CollectionColumns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "@/components/custom ui/Loader"

const Collection = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async()=>{
    try {
      const res = await fetch('/api/collections', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }) 
      const data = await res.json()
      setCollections(data)
      setLoading(false)

    } catch (error) {
      console.log("Colections_ GET ", error);
      toast.error('somthing went wrong please try again')
    }
  }
  
  useEffect(()=>{
    getCollections()
  },[])
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Collections</p>
      <Button className="bg-blue-1 text-white" onClick={()=> router.push('/collections/new')}>
        <Plus className="h-4 w-4" />
        Create Collection
      </Button>
    </div>
    <Separator className="bg-grey-1 my-4 mb-7" />
      <DataTable columns={columns} data={collections} searchKey='title' />
    </div>
  )
}

export default Collection