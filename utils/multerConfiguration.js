import multer from "multer"
import fs from "fs"
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    let path = "public/" + req.userData.id +"/"
    if (!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
    path += req.body?.dest+"/"
    if(!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
    cb(null,path)
  },
  filename:(req,file,cb)=>{
    const currenChunk = req.body.currentchunk
    const type = file.mimetype.split("video/")[1]
    const filename = file.originalname+"-"+currenChunk+"."+type
    cb(null,filename)
  }
})

export {
  storage
}

