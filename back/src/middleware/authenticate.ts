import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { IUser, User } from "../models/Users.model";

declare global {
    namespace Express {
      interface Request {
        user?: IUser
      }
    }
  }
  
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token requerido" });
        return
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      console.log(decoded)
      
        if (typeof decoded === "object" && decoded.id) {
            const user = await User.findById(decoded.id);

            console.log(user)
            if (!user) {
                res.status(401).json({ message: "Usuario no encontrado" });
                return
            }

       
            req.user = user
            next()

        }



    } catch (error) {
        res.status(400).json({ message: "No Autorizado" })
        return
    }

}