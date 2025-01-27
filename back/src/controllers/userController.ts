import { Response, Request } from "express";
import { User } from "../models/Users.model";

class UserController {

    static profile= async (req: Request, res: Response) => {
        
        try {
          
            if (!req.user) {
                const error = new Error("No existe un usuario con ese id")
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(req.user)

        } catch (err) {
            const error = new Error("Hubo un error al buscar un usuario")
            res.status(400).json({ error: error.message })
            return
        }
    }

    static getById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const user = await User.findById(id)
            if (!user) {
                const error = new Error("No existe un usuario con ese id")
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(user)

        } catch (err) {
            const error = new Error("Hubo un error al buscar un usuario")
            res.status(400).json({ error: error.message })
            return
        }
    }

    static getAll = async (req: Request, res: Response) => {

            const filters=req.query
            
        try {
            const users = await User.find(filters)
            if (users.length === 0) {
                const error = new Error("No se econtró ningún usuario")
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(users)

        } catch (err) {
            const error = new Error("Hubo un error al buscar los usuarios")
            res.status(400).json({ error: error.message })
            return
        }
    }
    static update = async (req: Request, res: Response) => {

        const {id}=req.params
        const data=req.body
        
    try {
        const user=await User.findByIdAndUpdate(id,data,{
            new:true,runValidators:true
        })
        if(!user) {
            const error = new Error("No se econtró ningún usuario")
            res.status(404).json({ error: error.message })
            return
        }
        res.status(200).json("Datos Actualizados Correctamente")

    } catch (err) {
        const error = new Error("Hubo un error al actualizar al usuario")
        res.status(400).json({ error: error.message })
        return
    }
}
static delete = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            const error = new Error("No existe un usuario con ese id")
            res.status(404).json({ error: error.message })
            return
        }
        
        res.status(200).json("Usuario Eliminado")

    } catch (err) {
        const error = new Error("Hubo un error al querer eliminar al usuario")
        res.status(400).json({ error: error.message })
        return
    }
}


    
}


export default UserController