import { videoModel } from "../schemas/video.schema.js"
import { ApiResponse } from "../utils/api.response.utils.js"

const getVideos = async (req, res) => {
  const { _id } = req.userData
  const videos = await videoModel.aggregate([
    {
      "$match": { "createdBy": _id }
    }
  ])
  res.json(
    new ApiResponse(200,videos,"video fetching succesfull")
  )
}

export {
  getVideos
}

