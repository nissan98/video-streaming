import express from "express"
import { userRouter } from "./routes/userRoutes.js"
import dotenv from "dotenv"
import { connectDb } from "./db/mongo.connection.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { responseError } from "./utils/ResponseError.js"
dotenv.config()

const app = express()
//middlewares 
app.use(express.json({
  limit:"16KB",
}))
app.use(express.urlencoded({
  extended:true,
}))
app.use(cors())

app.use(cookieParser())

app.use((err,req,res,next)=>{
  responseError(res,500,err,"Something went wrong")
})




const runServer = async()=>{
  await connectDb()
  app.use("/",userRouter)
  app.listen(6000)
}


runServer().then(()=>{
  console.log("server connected sucessfully")
})
