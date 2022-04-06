const User=require('../models/User')
const jwt=require('jsonwebtoken')
const {UnauthenticatedError}=require('../errors')

const auth=async (req,res,next)=>{
    //check Header
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Failed')
    }
    const token=authHeader.split(' ')[1]
    try {
        const payload=await jwt.verify(token,process.env.JWT_SECRET)
        //attach user to the job routes
        req.user={userId:payload.userId,name:payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Failed')
    }
}

module.exports=auth;