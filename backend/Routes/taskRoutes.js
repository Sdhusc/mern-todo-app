const express=require("express");
const Task1=require("../Models/Task1.js");
const authMiddleware=require("../Middleware/authMiddleware.js");

const router=express.Router();

// get tasks 
router.get("/",authMiddleware,async(req,res)=>
{
    const tasks=await Task1.find({user:req.user});
    res.json(tasks);
});

// add task 

router.post("/",authMiddleware,async(req,res)=>
{
    console.log("ADD TASK HIT");
    const task=await Task1.create({
        title:req.body.title,
        user:req.user,
    });
    res.json(task);
})

//update task 

router.put("/:id",authMiddleware,async(req,res)=>
{
    const task=await Task1.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    );
    res.json(task);
})

//delete task 

router.delete("/:id",authMiddleware,async(req,res)=>
{
    await Task1.findByIdAndDelete(req.params.id);
    res.json(({message:"task deleted"}))
})

module.exports=router;