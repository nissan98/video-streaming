import {Router} from "express"


import { 
  validateUserSignUp,
  validateUserLogin
} from "../middlewares/user.validate.middleware.js"
import { sighupController,loginController } from "../controllers/user.controller.js"

const router = Router()


router.post("/signup",validateUserSignUp,sighupController)


router.post("/login",validateUserLogin,loginController)

export {
  router as userRouter
}

