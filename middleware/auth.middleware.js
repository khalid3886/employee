const {LogoutModel}=require('../model/logout.model')
const jwt=require('jsonwebtoken')
const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        if(token)
        {
            const logout=await LogoutModel.findOne({token})
            if(logout)
            {
                res.status(200).json({msg:'login again'})
            } 
           else{
            const decoded=jwt.verify(token,'khalid')
            if(decoded)
            {
                req.headers.userID=decoded.userID
                next()
            }
            else{
                res.status(200).json({msg:'you are not authorised'})
            }
           }
        }
        else{
            res.status(200).json({msg:'you are not authorised'})
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
}

module.exports={
    auth
}