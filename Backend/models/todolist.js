import mongoose from "mongoose";

//define schema
const todolistSchema=mongoose.Schema(
    {
        name:String,
    }
);

//define model
export const Item=mongoose.model('Item',todolistSchema);