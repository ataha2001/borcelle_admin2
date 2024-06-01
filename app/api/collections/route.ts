import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import { Collection } from "@/lib/models/Collection";

export const POST= async(req: NextRequest)=>{
    try {
        const {userId}  = auth()
        if(!userId){
            return new NextResponse("unauthorized", {status:403})
        }
        await connectToDB()

        const {title, description, image } = await  req.json()
        const exsistingCollection = await Collection.findOne({title})
        if(exsistingCollection){
            return new NextResponse("Collection already exists", {status:400})
        }
        if(!title || !image){
            return new NextResponse("Title & Imaage are required..", {status:400})
        }
        const newCollection = await Collection.create({
            title,
            description,
            image
        })
        await newCollection.save()
        return NextResponse.json(newCollection, {status:200})
    } catch (error) {
        console.log('Coeections_POST ',error);
        return new NextResponse("Internal Server Error", {status:500})
        
    }
}

export const GET= async(req: NextRequest)=>{
    try {
        await connectToDB()
        
        console.log('check connect in get');
        
        const collections = await Collection.find().sort({createdAt: 'desc'})

        return NextResponse.json(collections, {status: 200})
    } catch (error) {
        console.log('Coeections_GET ',error);
        return new NextResponse("Internal Server Error", {status:500})
        
    }
}

export const dynamic = 'force-dynamic'