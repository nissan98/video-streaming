import { model, Schema } from "mongoose";

const videoSchema = Schema({
  videoPath:{
    type:String,
    required:true,

  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  size:Number,
  duration:{
    type:Number,
    required:true
  }
},{timestamps:true})

const videoModel = model("Video",videoSchema)

export {
  videoModel
}
