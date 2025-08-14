import { Router } from "express";
import { responseError } from "../utils/ResponseError.js";
import jwt from "jsonwebtoken"
import { user } from "../schemas/user.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const router = Router()

router.get("/generateAccessToken",async (req,res)=>{
  try{  
    const {authorization} = req.headers
    const authToken = authorization.split("Bearer ")[1]
    const decode = jwt.verify(authToken,process.env.JWT_SECRET)
    const id = decode._id
    const userData = await user.findById(id)

    if (!(authToken === userData.refresh_token)){
      responseError(res,401,{},"this refresh_token dosnt belong to this user")
    }
    //cookie
    res.cookie("accessToken",userData.generateAccessToken())

    res.status(200)
    .json(new ApiResponse(200,{},"access_token genetated sucessfully"))

  }catch(e){
    if (e instanceof jwt.TokenExpiredError){
      responseError(res,401,{},"refresh_token expired pleade login again")
    }
    if (e instanceof jwt.JsonWebTokenError){
      responseError(res,400,{},"refresh_token signature is not valid")
    }
    responseError(res,500,{},"something went wrong")
  }
  
})




export{
  router as tokenRouter
}
