import { ApiResponse } from "../utils/api.response.utils.js"
import { responseError } from "../utils/response.error.utils.js"
import { user } from "../schemas/user.schema.js"
import { cookieOptions } from "../utils/constants.utils.js"
import { generateTokens } from "../utils/generate.tokens.utils.js"
import { mongo, } from "mongoose"

const sighupController = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const createdUser = await user.create({
      username,
      password,
      email
    })
    const { access_token, refresh_token } = generateTokens(createdUser)


    createdUser.refresh_token = refresh_token
    await createdUser.save()
    const currentUser = await user.findById(createdUser.id).select("-password -refresh_token")


    res.status(200)
      .cookie("refreshToken", refresh_token, cookieOptions)
      .cookie("accessToken", access_token, cookieOptions)
      .json(
        new ApiResponse(200, currentUser, "signup sucessful")
      )
  } catch (e) {
    if (e instanceof mongo.MongoServerError) {
      responseError(res, 409, {}, "username or email already exists")
      return
    }
    responseError(res, 500, {}, "something went wrong")
  }


}

const loginController = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const doesUserExist = await user.findOne({
      email: email,
      username: username
    })


    if (!doesUserExist) {
      responseError(res, 404, {}, "user dosnot exists")
      return
    }
    const isPasswordSame = doesUserExist.isPasswordSame(password)
    if (!isPasswordSame) {
      responseError(res, 401, {}, "wrong password")
      return
    }




    const { access_token, refresh_token } = generateTokens(doesUserExist)

    const userData = await user.findById(doesUserExist.id)
      .select("-password -refresh_token")


    res.status(200)
      .cookie("refreshToken", refresh_token, cookieOptions)
      .cookie("accessToken", access_token, cookieOptions)
      .json(new ApiResponse(200, userData, "login sucessfull"))

  } catch {
    responseError(res, 500, {}, "something went wrong")
  }
}

export {
  sighupController,
  loginController
}
