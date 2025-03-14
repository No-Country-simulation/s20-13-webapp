import { Request, Response } from "express";
import UserService from "../services/users.service"
import cloudinary from "../config/cloudinary";
import path from "path";

class UserController {

    static async uploadImage(req: Request, res: Response) {

      
        const file = req.file
        if (!file) {
            res.status(400).json({ error: "No se ha subido ninguna imagen" })
            return
        }
        const extension = path.extname(file).toLowerCase()
        const uniqueFilename = `profile_${Date.now()}${extension}`
        try {

            const user=await UserService.getUserById(req.params.id)
            
            cloudinary.uploader.upload(file, {
                public_id: uniqueFilename, 
                resource_type: "image" 
            }, async function (error, result) {
                if (error) {
                    const error = new Error("Hubo un error al subir la imágen")
                    res.status(500).json({ error: error.message })
                    return
                }
                if (result && user) {
                    user.profilePicture = result.secure_url
                    await user.save()
                    res.status(200).json({ image: result.secure_url })
                }
            })

  

        } catch (error) {
            res.status(404).json({ error: "Hubo un error al subir la imagen" })
        }

    }

    static async profile(req: Request, res: Response) {

       
       const user=req.user
       console.log(user)
        try {
            if (!user) {
                res.status(404).json({ error: "No existe un usuario con ese id" });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: "Hubo un error al buscar un usuario" });
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (err: any) {
            res.status(404).json({ error: "Hubo un error al buscar un usuario" });
        }
    }

    static async getAll(req: Request, res: Response) {
        const filters = req.query;
        try {
            const users = await UserService.getAllUsers(filters);
            res.status(200).json(users);
        } catch (err: any) {
            res.status(404).json({ error: "Hubo un error al buscar los usuarios" });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedUser = await UserService.updateUser(id, data);
            res.status(200).json({ message: "Datos actualizados correctamente", user: updatedUser });
        } catch (err: any) {
            res.status(400).json({ error: "Hubo un error al actualizar al usuario" });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await UserService.deleteUser(id);
            res.status(200).json({ message: "Usuario eliminado" });
        } catch (err: any) {
            res.status(404).json({ error: "Hubo un error al eliminar al usuario" });
        }
    }
}

export default UserController;