import express from "express"
import { userRouter } from "./routes/user.router.routes.js"
import dotenv from "dotenv"
import { connectDb } from "./db/mongo.connection.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { responseError } from "./utils/response.error.utils.js"
import { tokenRouter } from "./routes/generate.token.route.js"
import { uploadVideo } from "./routes/upload.video.routes.js"
dotenv.config()

const app = express()
//middlewares 
app.use(express.json({
  limit: "20KB",
}))
app.use(express.urlencoded({
  extended: true,
}))
app.use(cors())

app.use(cookieParser())

app.use((err, req, res, next) => {
  responseError(res, 500, err, "Something went wrong")
})

app.use(express.static("public"))

//Routes
app.use("/", userRouter)
app.use("/", tokenRouter)
app.use("/", uploadVideo)


const runServer = async () => {
  await connectDb()
  app.listen(process.env.PORT)
}


runServer().then(() => {
  console.log("server connected sucessfully")
})
