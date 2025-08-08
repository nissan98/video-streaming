import { ZodError } from "zod"

const errorHandler = (err,req,res,next)=>{
  console.log("i am runnimg")
  if (err instanceof ZodError){
    res.json({
      msg:err.message
    })
  }
}

export {
  errorHandler
}
