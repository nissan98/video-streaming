import ffmpeg from "fluent-ffmpeg"
import { videoTimestampCongigGenerator } from "./video.timestamps.generator.js";
import fs from "fs"
const convertVideoToStreams = (path, outputPath,metadata) => {
  let chunkDuration = 60 * 2
  return new Promise((res, rej) => {
      ffmpeg(path)
      .outputOptions([
      '-c copy',
      '-f segment', 
    `-segment_time ${chunkDuration}`, 
    '-reset_timestamps 1',
    '-map 0',
      ])
      .output(outputPath+"%d.mp4")
      .on('end', (data) => {
        fs.unlinkSync(path)
        videoTimestampCongigGenerator(outputPath,metadata)
        res(metadata)
      })
      .on('error', (err) => {
        rej("something went wrong while transcoding the video")
      })
      .run();
  })
}

export { convertVideoToStreams }
