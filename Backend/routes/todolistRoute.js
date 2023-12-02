import express from 'express';
import { Item } from '../models/todolist.js';
//get router from express
const router=express.Router();

//Routes for save a new item
router.post('/',async(req,res)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                message:'Send name of item field!',
            });
        }
        const newItem={
            name:req.body.name,
        };
        const item=await Item.create(newItem);
        return res.status(201).send(item);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//Routes for get all items from database
router.get('/',async(req,res)=>{
    try{
        const items=await Item.find({});
        return res.status(200).json({
            data:items,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//Route for update an item
router.put('/:id',async(req,res)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                message:'Send name of item field!',
            });
        }
        const {id}=req.params;
        const result=await Item.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:"Item not found"});
        }
        return res.status(200).send({message:"Book updated successfully!"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//Router for delete an item
router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await Item.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"Book not found!"});
        }
        return res.status(200).send({message:'book deleted successfully'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

//export router
export default router;