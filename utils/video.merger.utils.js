import fs from "fs"
import { rootPath } from "./constants.utils.js"
import p from "path"
import { convertVideoToStreams } from "./hls.converter.utils.js"
const mergeVideo = (path,id)=>{
  return new Promise(async(resolve,reject)=>{
    try{
      const file = fs.readdirSync(path)
      
      if (file.length === 0){
          reject("chunk folder is empty")
      }
      const prefix = file[0].split("-")[0] + "-"
      const suffix = "."+file[0].split(".")[1]

      const fileNumbers= file.map((value)=>{
        return value.split("blob-")[1].split(".")[0]
      })
      let tSuffix = suffix
      if(tSuffix === ".x-matroska"){
        tSuffix = ".mkv"
      }

      let output = path
      if (!fs.existsSync(output)){
        fs.mkdirSync(output)
      }
      output += Date.now()+suffix
      const writeStream = fs.openSync(output,"a")
      const sortedFiles = fileNumbers.sort((a,b)=>a-b)
      sortedFiles.forEach((value)=>{
        const chunkPath = path + prefix + value + suffix
        const readStream = fs.readFileSync(chunkPath)
        fs.writeSync(writeStream,readStream)
        fs.unlinkSync(chunkPath)
      })
      fs.closeSync(writeStream)
     // fs.rmSync(path,{recursive:true})
      await convertVideoToStreams(output,path)
      fs.unlinkSync(output)
      
      resolve(path)
    }catch(e){
       reject("file not uploaded pleasd upload again")
    }

  })
}


export {
  mergeVideo
}
