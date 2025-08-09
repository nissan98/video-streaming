import express from "express"
import { userRouter } from "./routes/userRoutes.js"
import dotenv from "dotenv"
import { connectDb } from "./db/mongo.connection.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { responseError } from "./utils/ResponseError.js"
import { tokenRouter } from "./routes/generatToken.js"
import { uploadVideo } from "./routes/uploadVideo.js"
dotenv.config()

const app = express()
//middlewares 
app.use(express.json({
  limit:"20KB",
}))
app.use(express.urlencoded({
  extended:true,
}))
app.use(cors())

app.use(cookieParser())

app.use((err,req,res,next)=>{
  responseError(res,500,err,"Something went wrong")
})

app.use(express.static("public"))

//Routes
app.use("/",userRouter)
app.use("/",tokenRouter)
app.use("/",uploadVideo)


const runServer = async()=>{
  await connectDb()
  app.listen(3000)
}


runServer().then(()=>{
  console.log("server connected sucessfully")
})
