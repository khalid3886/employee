const express=require("express")
const userRouter=express.Router()
const bcrypt=require('bcrypt')
const {UserModel}=require('../model/user.model')
const jwt=require('jsonwebtoken')
const {LogoutModel}=require('../model/logout.model')

userRouter.get('/',(req,res)=>{
    res.send('user route')
})

userRouter.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const hash=await bcrypt.hash(password,5)
        const user=new UserModel({name,email,password:hash})
        await user.save()
        res.status(201).json({msg:'user has been registered'})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user)
        {
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result)
                {
                    const token=jwt.sign({userID:user._id},'khalid')
                    res.status(201).json({msg:'login successfull',token})
                }
                else{
                    res.status(200).json({msg:'wrong credential'})
                }
            })
        }
        else{
            res.status(200).json({msg:'register please'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

userRouter.post('/logout',async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        const logout=new LogoutModel({token})
        await logout.save()
        res.status(200).json({msg:'user has been logout'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})
module.exports={
    userRouter
}