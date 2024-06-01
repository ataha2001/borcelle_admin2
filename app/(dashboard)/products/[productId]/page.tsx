'use client'
// import React, { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader"
import ProductForm from "@/components/products/ProductForm"
// import ProductForm from "@/components/products/ProductForm"
import { useEffect, useState } from "react"

const ProductDetails = ({params}: {params: {productId: string}}) => {
    const [loading, setLoading] = useState(true)
    const [productDetails, setProductDetails] = useState<ProductType | null>(null)
console.log('patams.productId', params.productId);

    const getproductDetails = async()=>{
        try {
          const res = await fetch(`/api/products/${params.productId}`, {
            method: 'GET',
          }) 
          const data = await res.json()
          setProductDetails(data)
          setLoading(false)
    
        } catch (error) {
          console.log("ProductId_ GET ", error);
          
        }
      }
    useEffect(()=>{
        getproductDetails()
    },[])  

  return loading ? <Loader /> :  (
    <ProductForm initialData={productDetails} />
  )
}

export default ProductDetails