import { videoModel } from "../schemas/video.schema.js"

const getVideos = async (req, res) => {
  const { _id } = req.userData
  const videos = await videoModel.aggregate([
    {
      "$match": { "createdBy": _id }
    }
  ])
  res.json(videos)
}

export {
  getVideos
}

