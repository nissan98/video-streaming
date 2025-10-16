import jwt from "jsonwebtoken"
import { user } from "../schemas/user.schema.js"
import { responseError } from "../utils/response.error.utils.js"
import { ApiResponse } from "../utils/api.response.utils.js"


const validateAccessTokenn=async(req,res,next)=>{
  try{
    const {authorization} = req.headers
    const authToken = authorization.split("Bearer ")[1]
    const decode = jwt.verify(authToken,process.env.ACCESS_TOKEN_SECRET)
    const id = decode._id
    const userData = await user.findById(id)

    if (!user){
      responseError(res,401,{},"wrong access_token")
      return
    }

    req.userData = userData
    next()
    

  }catch(e){
    if (e instanceof jwt.TokenExpiredError){
      responseError(res,401,{},"access_token expired pleade login again")
      return
    }
    if (e instanceof jwt.JsonWebTokenError){
      responseError(res,400,{},"access_token signature is not valid")
      return
    }
    res.json(new ApiResponse(500,{},"please provide a valide access_token"));

  }
}

export{
  validateAccessTokenn
}
