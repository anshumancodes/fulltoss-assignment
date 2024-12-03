import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true
    
  },
  team: {
    type: String,
    
  },
  AcessToken:{
    type: String,
  }

},{ timestamps: true });

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next(); // prevents hashing if password isnt modified !
    
    // if password is modfied saves new password with encryption
    this.password = await bcrypt.hash(this.password,10);
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
 }

userSchema.methods.generateAccessToken=function(){
    return Jwt.sign({
         _id:this._id,
         email:this.email,
         username:this.username,
         fullname:this.fullname
     },
     process.env.ACCESS_SECRET_KEY,{expiresIn:process.env.ACESS_TOKEN_EXPIRY}
     )
 }

const User = mongoose.model("User", userSchema);

export default User;