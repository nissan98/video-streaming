export class ApiResponse{
  constructor(status,data,message="operation suceesfull"){
    this.status = status
    this.data = data
    this.message = message
  }
}
