import mongodb,{  Schema } from "mongoose";
import jwt from "jsonwebtoken"
import {sha256} from "js-sha256"
const userSchema = Schema({
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  username:{
    type:String,
    index:true,
    required:true,
  },
  videos:[{
    type:Schema.Types.ObjectId,
    ref:"videos"
  }],
  refresh_token:{
    type:String,
    default:null
  }
},{timestamps:true})


userSchema.pre("save",function(e){
  if (this.isModified("password")){
    this.password = sha256(this.password)
  }
  e()
})

userSchema.methods.isPasswordSame =function(userPassword){
  const hashPass = sha256(userPassword)
  if (hashPass === this.password){
    return true
  }
  return false
}


userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id:this._id,
  },process.env.JWT_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  )
}

userSchema.methods.generateAccessToken = function(){       return jwt.sign({                                           _id:this._id,                                              username:this.username,
      email:this.email
  },process.env.JWT_SECRET,
      {expiresIn:process.env.ACCESS_TOKEN_EXPITY}
  )
}



const user = mongodb.model("User",userSchema)


export {
  user
}
