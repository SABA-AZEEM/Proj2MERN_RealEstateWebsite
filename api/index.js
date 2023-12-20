import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from './routes/user.route.js';


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB");
})
.catch((error)=>{
    console.log(error.message);
});

const app=express();

//Enable cors for all routes
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's actual origin
    credentials: true,
  };
  
  app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.listen(3000,()=>{
    console.log(`Server is running on Port : 3000 port.`)
});

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

//middleware for handle possible errors
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});