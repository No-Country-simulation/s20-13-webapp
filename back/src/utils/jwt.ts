import jwt, { JwtPayload } from "jsonwebtoken"


export const generateJWT=(id:JwtPayload)=>{

    const token=jwt.sign(id,process.env.JWT_SECRET  as string,{
        expiresIn:"1h"
    })
    return token
}