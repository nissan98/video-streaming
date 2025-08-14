import {Router} from "express"


import { 
  validateUserSignUp,
  validateUserLogin
} from "../middlewares/user.validate.middleware.js"
import { sighupController,loginController } from "../controllers/user.controller.js"
import { validateAccessTokenn } from "../middlewares/access.token.validator.middleware.js"
import { getVideos } from "../controllers/video.controllers.js"

const router = Router()


router.post("/signup",validateUserSignUp,sighupController)


router.post("/login",validateUserLogin,loginController)

router.get("/getVideos",validateAccessTokenn,getVideos)


export {
  router as userRouter
}

