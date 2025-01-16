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
    const headers = req.headers.authorization
    if (!headers) {
        res.status(401).json({ message: "Token requerido" })
        return
    }
    const bearer: string = headers.split(" ")[1]
    if (!bearer) {
        res.status(401).json({ message: "Token requerido" })
        return
    }
    try {
        const decoded = jwt.verify(bearer, process.env.JWT_SECRET as string)
        if (typeof decoded === "object" && decoded.id) {
            const user = await User.findById(decoded.id)
            if (user) {

                req.user = user

            } else {
                res.status(500).json({ error: "Token no válido" })
            }
        }

    } catch (error) {
        console.log(error)
    }
    next()

}