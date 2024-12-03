import jwt from "jsonwebtoken";
import User from "../models/user.model";

const verifyJwt=asyncHandler(async(req,res,next)=>{
  try {
     const token= req.cookies?.accessToken || req.header ("Authorization")?.replace("Bearer ", "");
  
      if(!token){
         
          res.status(401).json({message:"Unauthorized Request"})
      }
     const verifiedToken=jwt.verify(token,process.env.ACCESS_SECRET_KEY);
     const user= await User.findById(verifiedToken._id).select("-password -refeshToken");
  
     if(!user){
       res.status(401).json({ message: "Invalid access token" })
     }
     req.user=user;

     next()
  } catch (error) {
    res.status(401).json({ message: "Invalid access token" ,error:error })
  }

}) ;


export {verifyJwt}