import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format} from 'date-fns';

export const GET = async(req: NextRequest)=>{
    try {
        await connectToDB()
        const orders = await Order.find().sort({createdAt: -1}) //Or "desc"

        const orderDetails = await Promise.all(orders.map(async(order)=> {
            const customer = await Customer.findOne({clerkId : order.customerClerkId})
            return {
                _id: order._id,
                customer: customer.name,
                products: order.products.length,
                totalAmount: order.totalAmount,
                createdAt: format(order.createdAt,"MMM dd, yyyy")

            }
        }))
        return NextResponse.json(orderDetails, {status: 200})
    } catch (error) {
        console.log("Orders_GET", error);
        return new NextResponse("Internal server error..Faild to get orders", {status: 500})
        
    }
}

export const dynamic = 'force-dynamic'