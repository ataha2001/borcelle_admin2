// 'use client'
import { DataTable } from '@/components/custom ui/DataTable';
import { columns } from '@/components/orderItems/OrderItemsColumns';
import React from 'react'

const OrderDetails = async ({params}:{params:{orderId:string}}) => {
    const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`)
    
    const { orderDetails, customer } = await res.json()
    
    const {street, city, state, postalCode, country } = orderDetails.shippingAddress

  return (
    <div className='flex flex-col gap-5 p-10'>
        <p className='text-base-bold'>
            Order ID: <span className='tetxt-base-medium'>{orderDetails._id}</span>
        </p>
        <p className='text-base-bold'>
            Customer name: <span className='tetxt-base-medium'>{customer?.name}</span>
        </p>
        <p className='text-base-bold'>
            Shipping address: <span className='tetxt-base-medium'>{street},{city}, {state}, {postalCode}, {country}</span>
        </p>
        <p className='text-base-bold'>
            Total paid: <span className='tetxt-base-medium'>${orderDetails.totalAmount}</span>
        </p>
        <p className='text-base-bold'>
            Shipping rate ID: <span className='tetxt-base-medium'>{orderDetails.shippingRate}</span>
        </p>
        <DataTable columns={columns}  data={orderDetails.products} searchKey='product'/>
    </div>
  )
}

export default OrderDetails