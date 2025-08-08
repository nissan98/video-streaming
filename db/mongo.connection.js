import mongo from "mongoose"

const connectDb = async()=>{
  await mongo.connect(process.env.MONGO_CONNECTION_URL)
  console.log("mongodb connected succesfully")
}
export {
  connectDb
}
