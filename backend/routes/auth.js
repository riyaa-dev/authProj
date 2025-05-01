const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User = require('../models/user');


require('dotenv').config();

router.post('/signup',async(req,res)=>{
    try{
    const{ username,email,password}=req.body;
    
    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({ Message:"user already exits"});
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    
    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    });
    await newUser.save();
    console.log(newUser);
    
    const token = jwt.sign(
        { email:newUser.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );  

    res.status(201).json({ 
        token,
        user:{
                id :newUser._id,
                username :newUser.username,
                email :newUser.email,
        },
    });
}  catch(error) {
    console.error(error.message);
    res.status(500).json({ message:"User creation failed"});


} 

});

router.post("/login",async(req,res)=>{
    console.log("hello")
    try{
        const{email,password}=req.body;
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "invalid email or password"});

        }
        // check password
        
         const isMatch = await bcrypt.compare(password,user.password);

         if(!isMatch){
            return res.status(400).json({message:"invalid email or password"});
         } 
         const token =jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
         );
         res.status(200).json({
            token,
            user:{
                username: user.username,
                email: user.email,
            }
         });
    }catch(error){
        console.error("login error :",error.message);
        res.status(500).json({message:"server error"});
    }
});
module.exports = router;
