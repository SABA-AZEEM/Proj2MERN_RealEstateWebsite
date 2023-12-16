import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB");
})
.catch((error)=>{
    console.log(error.message);
});

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log(`Server is running on Port : 3000 port.`)
});

app.use('/api/auth',authRouter);