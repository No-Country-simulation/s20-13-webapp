import { Types } from "mongoose";
import { IPets, Pets } from "../models/Pets.model";
import { User } from "../models/Users.model";

export class PetsService {


    public async getAllPetsByUser(userId: string): Promise<IPets[]> {


        try {
            const pets = await Pets.find({ user: userId })
            if (pets.length === 0) {
                throw new Error("No se encontró ninguna mascota");

            }
            return pets;
        } catch (error) {
            console.error("Error inesperado al obtener las mascotas", error);
            throw new Error("Hubo un error al buscar las mascotas");
        }
    }




    public async getPetById(id: string): Promise<IPets | null> {
        try {
            if (!id) throw new Error("El ID de la mascota es requerido");
            if (!Types.ObjectId.isValid(id)) throw new Error("El ID de mascota es inválido");

            const pet = await Pets.findById(id);

            if (!pet) {
                throw new Error("No se encontró ninguna mascota con ese id");

            }
            return pet;

        } catch (error) {
            console.error("Error al obtener la mascota por id:", error);
            throw new Error("Hubo un error al buscar la mascota");
        }
    }



    public async createPet(petData: any): Promise<IPets> {


        try {
            const user = await User.findById(petData.user);
            if (!user) {
                throw new Error("El ID de mascota es inválido")
            }
            const newPet = new Pets(petData);
            user.pets?.push(newPet.id)  
            await Promise.allSettled([newPet.save(),user.save()])
            return newPet;
        } catch (error) {
            console.error("Error inesperado al crear la mascota:", error);
            throw new Error("Hubo un error al crear la mascota");
        }
    }


    public async updatePet(id: string, data: any): Promise<IPets | null> {
        try {
            if (!id) throw new Error("El id de la mascota es requerido");
            if (!Types.ObjectId.isValid(id)) throw new Error("Id de mascota inválido");


            const updatedPet = await Pets.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });


            if (!updatedPet) {
                throw new Error("No se encontró ninguna mascota con ese id");

            }

            return updatedPet;
        } catch (error) {
            console.error("Error al actualizar la mascota", error);
            throw new Error("Hubo un error al actualizar la mascota");
        }


    }

    public async deletePet(id: string): Promise<IPets | null> {
        try {
            if (!id) throw new Error("El id de la mascota es requerido");
            if (!Types.ObjectId.isValid(id)) throw Error("El ID de la mascota es inválido");

            const deletedPet = await Pets.findByIdAndDelete(id);

            if (!deletedPet) {
                throw new Error("No se encontró ninguna mascota con ese id");

            }
            return deletedPet;
        } catch (error) {
            console.error("Error al eliminar una mascota");
            throw new Error("Hubo un error al eliminar la mascota");
        }
    }

}

