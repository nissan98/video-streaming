import z from "zod"
import { responseError } from "../utils/response.error.utils.js"
import { userSchema,loginSchema} from "../zodschemas/user.zod.schema.js"

const validateUserSignUp = (req,res,next)=>{
  const validationStatus = userSchema.safeParse(req.body)
  if (!validationStatus.success){
    responseError(res,400,z.treeifyError(validationStatus?.error))
    return
  }
  next()
}
const validateUserLogin = (req,res,next)=>{
  const validationStatus = loginSchema.safeParse(req.body)
  if (!validationStatus?.success){
    responseError(res,400,z.treeifyError(validationStatus?.error))
  }

  
  next()
}
export {
  validateUserSignUp,
  validateUserLogin
}
