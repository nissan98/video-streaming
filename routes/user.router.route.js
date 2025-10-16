import { Router } from "express"


import {
  validateUserSignUp,
  validateUserLogin
} from "../middlewares/user.validate.middleware.js"
import { sighupController, loginController } from "../controllers/user.controller.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { getVideos } from "../controllers/video.controllers.js"
import mongoose from "mongoose"
import { ApiResponse } from "../utils/api.response.utils.js"
import { videoModel } from "../schemas/video.schema.js"
import { likeModel } from "../schemas/like.model.js"

const router = Router()


router.post("/signup", validateUserSignUp, sighupController)


router.post("/login", validateUserLogin, loginController)

router.get("/getVideos", validateAccessTokenn, getVideos)

router.get("/likeVideo/:videoId", validateAccessTokenn, async (req, res) => {
  const videoId = req.params.videoId;
  if (!videoId) {
    res.json(new ApiResponse(404, {}, "videoId is not provided"));
    return;
  }
  try {
    new mongoose.Types.ObjectId(videoId);
  } catch (e) {
    res.json(new ApiResponse(404, {}, e.message));
    return;
  }
  const videoData = await videoModel.findById(videoId);
  if (!videoData) {
    res.json(new ApiResponse(404, {}, "video does not exists"));
    return;
  }
  if (!(req.userData.id == videoData.createdBy)) {
    res.json(new ApiResponse(404, {}, "you dont have the privilege to acces this video"));
    return;
  }

  const ifAlreadyLiked = await likeModel.findOne({
    videoId: new mongoose.Types.ObjectId(videoData.id),
    likedBy: new mongoose.Types.ObjectId(req.userData.id)
  });
  if (ifAlreadyLiked) {
    res.json(new ApiResponse(404, "already done"));
    return;
  }

  const likeRes = await likeModel.create({
    videoId: new mongoose.Types.ObjectId(videoData.id),
    likedBy: new mongoose.Types.ObjectId(req.userData.id)
  })
  return res.json(new ApiResponse(200,{},likeRes));
})

router.get("/getTotalVideoLike/:videoId", validateAccessTokenn, async (req, res) => {
  const videoId = req.params.videoId;
  const videoData = await videoModel.findById(videoId);
  if (!videoData){
    return res.json(new ApiResponse(404,{},"video doesnot exists"));
  }
  const totalLikes = await likeModel.aggregate([
    {
    "$match": { "likedBy":req.userData._id }
    },{
      "$count":"id"
    }
  ])
  return res.json(new ApiResponse(200,{likeCount:totalLikes[0]['id']},"operation sucessfull"));

});


export {
  router as userRouter
}

