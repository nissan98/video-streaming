import fs from "fs"
import { convertVideoToStreams } from "./hls.converter.utils.js"
import { extractVideoMetaData } from "./video.file.duration.utils.js"

const mergeVideo = (path, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = fs.readdirSync(path)

      if (file.length === 0) {
        reject("chunk folder is empty")
      }
      const prefix = file[0].split("-")[0] + "-"
      const suffix = "." + file[0].split(".")[1]

      const fileNumbers = file.map((value) => {
        return value.split("blob-")[1].split(".")[0]
      })
      let tSuffix = suffix
      if (tSuffix == ".x-matroska") {
        tSuffix = ".mkv"
      }

      let output = path
      if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
      }
      output += Date.now() + suffix
      const writeStream = fs.openSync(output, "a")
      const sortedFiles = fileNumbers.sort((a, b) => a - b)
      sortedFiles.forEach((value) => {
        const chunkPath = path + prefix + value + suffix
        const readStream = fs.readFileSync(chunkPath)
        fs.writeSync(writeStream, readStream)
        fs.unlinkSync(chunkPath)
      })
      fs.closeSync(writeStream)
      // fs.rmSync(path,{recursive:true})
      const metaData = await extractVideoMetaData(output)
   
      await convertVideoToStreams(output, path,metaData)
      fs.unlinkSync(output)
        if (!metaData || !path){
        reject("something went wrong while processing the video")
      }
      
      resolve(metaData) 
    } catch (e) {
      reject("file not uploaded please upload again")
    }

  })
}


export {
  mergeVideo
}
