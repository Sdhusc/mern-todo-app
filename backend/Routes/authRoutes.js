const express=require("express");
const bcrypt=require("bcryptjs");
const User1=require("../Models/User1.js");

const router=express.Router();


// register user 

router.post("/register",async(req,res)=>
{
    try 
    {

        const {name,email,password}=req.body;

        console.log(req.body)

        // check if already exist 

        const userExist=await User1.findOne({email});
        if(userExist)
        {
            return res.status(400).json({message:"user already exist"});
        }
      
        // hash password 

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        // create user 

        const user1=await User1.create(
            {
                name,
                email,
                password:hashedPassword,
            }
        );

        res.status(201).json({
            message:"user registered successfully",
            user1,
        })


    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

})


module.exports=router;
// ********************************************

const generateToken=require("../Utils/generateToken.jsx");

router.post("/login",async(req,res)=>
{
    try 
    {
        console.log("Login body : ",req.body);
        const {email,password}=req.body;

        // validation 

        if(!email || !password)
        {
            return res.status(400).json({message:"all fields are required for login"})
        }

        // check user 
        const user1=await User1.findOne({email});
        if(!user1)
        {
            return res.status(400).json({message:"user not found - login"});
        }

        // compare password 

        const isMatch=await bcrypt.compare(password,user1.password);

        if(!isMatch)
        {
            return res.status(400).json({message:"invalid password - login"})
        }

        // generate token

        const token=generateToken(user1._id);

        res.status(200).json(
            {
                message:"login successful",
                token,
                user1,
            }
        )

    }
    catch(err)
    {
        console.log("error : ",err);
        res.status(500).json({message:"server error - login(authRoutes)"})
    }
})
