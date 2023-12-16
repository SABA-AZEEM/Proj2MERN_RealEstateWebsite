import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import {errorHandler} from '../utils/error.js';

//sign up functionality
export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });
    try {
        await newUser.save();
        res.status(201).json('User Created Successfully!'); 
    } catch (error) {
        next(error);
    }
}

//sign in functionality
export const signin = async (req,res,next) =>{
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials!'));
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const { password:pass, ...rest} = validUser._doc;
        res
        .cookie('access_token',token,{httpOnle:true})
        .status(200)
        .json(rest)
    }catch(error){
        next(error);
    }
}