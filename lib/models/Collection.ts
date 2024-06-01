import mongoose, { Schema, model, models } from "mongoose";

const collectionsSchema = new Schema({
    title: {
        type:String,
        required: true,
        unique: true,
    },
    
    description: {
        type: String,
    } ,
    image: {
        type: String,
        required: true,
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },

})

export const Collection = models?.Collection || model("Collection", collectionsSchema)
