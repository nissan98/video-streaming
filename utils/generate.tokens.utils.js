const generateTokens = (query)=>{
  const refresh_token = query.generateRefreshToken()
    const access_token = query.generateAccessToken()
  return {refresh_token,access_token}
}

export {
  generateTokens
}
