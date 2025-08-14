import { ApiResponse } from "./api.response.utils.js"

const responseError = (res,status,data,msg=null)=>{
  res.status(status).json(new ApiResponse(status,data,msg))
}
export {
  responseError
}
