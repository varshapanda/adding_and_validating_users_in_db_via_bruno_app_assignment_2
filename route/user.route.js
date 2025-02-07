const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../model/user.model.js');


const router = express.Router();
router.post('/login',async(req, res)=>{
    const {email, password}=req.body;
    if(!email||!password){
        return res.status(400).json({error:'Email and password are required'});
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        const isUserPresent = await bcrypt.compare(password, user.password);
        if(!isUserPresent){
            return res.status(401).json({error:'Invalid credentials'});
        }
        return res.status(200).json({message:'Login successful', userId:user._id})
    }
    catch(err){
        return res.status(500).json({error:'server error',details:err.message});
    }
})

module.exports = router;