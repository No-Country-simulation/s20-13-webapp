import { Request, Response } from "express";
import UserService from "../services/users.service"

class UserController {

    static async profile(req: Request, res: Response) {
        try {
            if (!req.user) {
                res.status(404).json({ error: "No existe un usuario con ese id" });
                return;
            }
            res.status(200).json(req.user);
        } catch (err) {
            res.status(400).json({ error: "Hubo un error al buscar un usuario" });
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
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