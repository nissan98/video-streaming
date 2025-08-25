import fs from "fs"
const videoTimestampCongigGenerator =(dir,metadata)=>{
  let timestamps = []
  const {duration} = metadata
  console.log(metadata)
  const listFile = fs.readdirSync(dir)
  const fileListIndex = listFile.map(v=>Number(v.split(".")[0]))
  const sortedFiles = fileListIndex.sort((a,b)=>a-b)
  let lastSize = 0
  let lastDuration = 0
  for (let i= 0;i<sortedFiles.length -1;i++){
    const v = sortedFiles[i]
    const stat = fs.statSync(`${dir}${v}.mp4`)
    let size = stat?.size
    timestamps = [...timestamps,{fromSize:lastSize,toSize:lastSize + size,fromDuration:lastDuration,toDuration:lastDuration + 2,chunkName:`${v}.mp4`}]
    lastSize += size
    lastDuration += 2
  }
  const chuckLastIndex = sortedFiles[sortedFiles.length - 1]
  const durationLastIndex = duration - lastDuration
  const stat = fs.statSync(`${dir}${chuckLastIndex}.mp4`)
  timestamps = [...timestamps,{
   fromSize:lastSize,toSize:lastSize + stat?.size,fromDuration:lastDuration,toDuration:durationLastIndex,chunkName:`${chuckLastIndex}.mp4`}]

  const configPath = dir + "videotimestamps.config"
  fs.writeFileSync(configPath,JSON.stringify(timestamps))


}
export {videoTimestampCongigGenerator}
