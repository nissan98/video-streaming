import { Router } from "express"
import multer from "multer"
import { storage } from "../utils/multer.configuration.utils.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { responseError } from "../utils/response.error.utils.js"
import { ApiResponse } from "../utils/api.response.utils.js"
import { rootPath } from "../utils/constants.utils.js"
import path from "path"
import { mergeVideo } from "../utils/video.merger.utils.js"
import { videoModel } from "../schemas/video.schema.js"
import mongoose from "mongoose"
const route = Router()
const uploader = multer(
  {
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("video/")) {
        req.isFileUploaded = true
        cb(null, true)
      } else {
        req.isFileUploaded = false
        cb(null, false)
      }
    }
  }
)


route.post("/uploadVideo", validateAccessTokenn, uploader.single("file"), async (req, res) => {
  try {
    const { end } = req.body
    const { _id } = req.userData
    if (!req.isFileUploaded) {
      responseError(res, 415, {}, "unsupported media type")
      return
    }

    if (end == "false") {
      res.status(202)
        .json(new ApiResponse(202, {}, `chunk ${req.body.currentchunk} upload sucessfully`))
      return
    }
    const { destination } = req.file
    const absolutePath = path.join(rootPath, destination)
    await mergeVideo(absolutePath, req.userData.id)
    const videoPath = destination.replace("public/", "") + "video.m3u8"
    const { title, description } = req.body
    if (!title) {
      responseError(res, 400, {}, "title is required")
      return
    }

    await videoModel.create({
      title: title,
      description: description || "",
      videoPath: videoPath,
      createdBy: new mongoose.Types.ObjectId(_id)
    })

    res.status(200).json(new ApiResponse(200, {}, "file uploaded sucessfully"))

  } catch {
    responseError(res, 500, {}, "something went wrong")
  }

})
export {
  route as uploadVideo
}
