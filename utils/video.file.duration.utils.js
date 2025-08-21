import ffmpeg from "fluent-ffmpeg"

const extractVideoMetaData = (path) => {
  //fluent-ffmpeg is depriciated this is a personal project so its fine for now 
  return new Promise((res, rej) => {
    ffmpeg.ffprobe(path,(err,metedata)=>{
        if (err){
            rej("something went wrong while extracting video metadata")
        }
        res(metedata)
    })
  })
}

export { extractVideoMetaData }
