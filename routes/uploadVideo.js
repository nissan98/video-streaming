import { Router } from "express"
import multer from "multer"
import { storage } from "../utils/multerConfiguration.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { responseError } from "../utils/ResponseError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import appRootName from "app-root-path"
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
  const {end} = req.body
  
  if(!req.isFileUploaded){
    responseError(res,415,{},"unsupported media type")
    return
  }
  if(end === "false"){
    res.status(200)
  .json(new ApiResponse(200,{},`chunk ${req.body.currentchunk} upload sucessfully`))
    return
  }

  res.status(200).json(new ApiResponse(200,{},"file uploaded sucessfully"))
})
export {
  route as uploadVideo
}
