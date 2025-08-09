import multer from "multer"
import fs from "fs"
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    let path = "public/" + req.userData.id +"/"
    if (!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
    path += file.originalname.split(".")[0]+"-"+Date.now()+"/"
    if(!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
    cb(null,path)
  },
  filename:(req,file,cb)=>{
      cb(null,file.originalname)
  }
})

export {
  storage
}
