import { Request, Response } from "express";
import { Pets } from "../models/Pets.model";
import { User } from "../models/Users.model"

export class PetsController {

    static getAllPets = async (req: Request, res: Response) => {
        const filters = req.query;

        try {
            const pets = await Pets.find(filters);
            if (pets.length === 0) {
                const error = new Error("No se encontró ninguna mascota");
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(200).json(pets);

        } catch (err) {
            const error = new Error("Hubo un error al buscar las mascotas");
            res.status(400).json({ error: error.message });
            return;
        }
    }

    static getPet = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const pet = await Pets.findById(id);
            if (!pet) {
                const error = new Error("No se encontró ninguna mascota con ese id");
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(200).json(pet);

        } catch (err) {
            const error = new Error("Hubo un error al buscar la mascota");
            res.status(400).json({ error: error.message });
            return;
        }
    }

    static createPet = async (req: Request, res: Response) => {
        const petData = req.body;

        try {
            const user = await User.findById(petData.User);
            if(!user){
                res.status(404).json({message:"El usuario no está registrado"});
                return;
            }

            const newPet = new Pets(petData);
            await newPet.save();
            res.status(201).json("Mascota creada con éxito");

        } catch (err) {
            const error = new Error("Hubo un error al crear la mascota");
            res.status(400).json({ error: error.message });
            return;
        }
    }

    static updatePet = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const pet = await Pets.findByIdAndUpdate(id, data, {
                new: true, runValidators: true
            });
            if (!pet) {
                const error = new Error("No se encontró ninguna mascota con ese id");
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(200).json("Datos actualizados correctamente");

        } catch (err) {
            const error = new Error("Hubo un error al actualizar la mascota");
            res.status(400).json({ error: error.message });
            return;
        }
    }

    static deletePet = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const pet = await Pets.findByIdAndDelete(id);
            if (!pet) {
                const error = new Error("No se encontró ninguna mascota con ese id");
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(200).json("Mascota eliminada con éxito");

        } catch (err) {
            const error = new Error("Hubo un error al eliminar la mascota");
            res.status(400).json({ error: error.message });
            return;
        }
    }
}


