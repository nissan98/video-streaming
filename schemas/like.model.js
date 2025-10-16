import { model, Schema } from "mongoose";

const likesSchema =  Schema({
  videoId:{
    type:Schema.Types.ObjectId,
    ref:"Video"
  },
  likedBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true});

const likeModel = new model("Likes",likesSchema);
export {
  likeModel
}