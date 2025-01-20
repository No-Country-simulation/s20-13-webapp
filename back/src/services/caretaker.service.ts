import { User, IUser, UserRole } from "../models/Users.model";
import { Types } from "mongoose";

export class CaretakerService {
  //GET all caretakers
  public async getAllCaretakers(): Promise<IUser[]> {
    try {
      const caretakers = await User.find({ role: UserRole.CARETAKER });

      if (caretakers.length === 0) {
        throw new Error("Cuidadores no encontrados");
      }

      return caretakers;
    } catch (error) {
      console.error("Error inesperado al obtener los cuidadores:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }

  //GET caretaker by ID
  public async getCaretakerById(id: string): Promise<IUser | null> {
    try {
      if (!id) throw new Error("El ID del cuidador es requerido");
      if (!Types.ObjectId.isValid(id))
        throw new Error("ID de cuidador inválido");

      const caretaker = await User.findOne({
        _id: id,
        role: UserRole.CARETAKER,
      });

      return caretaker;
    } catch (error) {
      console.error("Error inesperado al obtener al cuidador por ID:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
}
