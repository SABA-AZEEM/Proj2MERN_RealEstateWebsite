import express from "express";
import cors from 'cors';
import todolistRoute from './routes/todolistRoute.js';
import mongoose from "mongoose";
import { PORT,mongodbURL } from "./config.js";


//create instant of express
const app=express();
//Middleware for enable cors for all routes
app.use(cors());

//Middleware for parsing request body
app.use(express.json());

//Middleware for todolist route
app.use('/todolist',todolistRoute);

//connect to mongodb
mongoose.connect(mongodbURL)
.then(()=>{
    console.log('App connected to DB');
    app.listen(PORT,()=>{
        console.log(`App is running on PORT: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});