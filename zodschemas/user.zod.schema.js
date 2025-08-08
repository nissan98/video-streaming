import z from "zod"


function isStrongPassword(value){
  const smallCharchters = "abcdefgjijklmnopqrstuvwxyz"
  const capitalCharchter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const digits = "0123456789"
  const special = "@#£_&-+()/?!;:"
  let isSmallExist = false
  let isBigExists = false
  let isDigitExits = false
  let isSpecialExists = false
  
  for (let i=0;i<value.length;i++){
    const text = value[i]
    if (!isSpecialExists){
      isSpecialExists = special.includes(text)
    }
    if(!isSmallExist){
      isSmallExist = smallCharchters.includes(text)
    }
    if(!isBigExists){
      isBigExists = capitalCharchter.includes(text)
      
    }
    if(!isDigitExits){
      isDigitExits = digits.includes(text)
    }
  }
  return (isSpecialExists && isBigExists && isSmallExist && isDigitExits)
}
  
const userSchema = z.object({
  username:z.string().lowercase().min(4),
  email:z.email(),
  password:z.string().min(6).refine(isStrongPassword,{
    message:"please provide more stronger password"
  }),

})


const loginSchema = z.object({
  username:z.string().min(4),
  email:z.email().min(1),
  password:z.string().min(1)
})

export {
  userSchema,
  loginSchema
}
