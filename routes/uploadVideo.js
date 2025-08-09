import { Router } from "express"
import multer from "multer"
import { storage } from "../utils/multerConfiguration.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { responseError } from "../utils/ResponseError.js"

const route = Router()
const uploader = multer(
  {
    storage:storage,
    fileFilter:(req,file,cb)=>{
      if (file.mimetype.startsWith("video/")){
        req.isFileUploaded = true
        cb(null,true)
      }else{
        req.isFileUploaded = false
        cb(null,false)
      }
    }
  }
)


route.post("/uploadVideo",validateAccessTokenn,uploader.single("file"),(req,res)=>{
  if(!req.isFileUploaded){
    responseError(res,415,{},"unsupported media type")
    return
  }
  res.send("file uploaded")
})
export {
  route as uploadVideo
}
