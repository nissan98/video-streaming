import { Router } from "express"
import multer from "multer"
import { storage } from "../utils/multerConfiguration.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { responseError } from "../utils/ResponseError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { rootPath } from "../utils/constants.js"
import path from "path"
import { mergeVideo } from "../utils/videoMerger.js"
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


route.post("/uploadVideo",validateAccessTokenn,uploader.single("file"),async(req,res)=>{
  try{
    const {end} = req.body
   if(!req.isFileUploaded){
     responseError(res,415,{},"unsupported media type")
     return
    }
   if(end === "false"){
      res.status(202)
    .json(new ApiResponse(202,{},`chunk ${req.body.currentchunk} upload sucessfully`))
      return
    }
    const {destination} = req.file
    const absolutePath = path.join(rootPath,destination)
    const result = await mergeVideo(absolutePath,req.userData.id)
    res.status(200).json(new ApiResponse(200,{},"file uploaded sucessfully"))
  }catch(e){
    responseError(res,500,{},"something went wrong")
  }
})
export {
  route as uploadVideo
}
