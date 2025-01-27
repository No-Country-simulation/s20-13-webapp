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

  //UPDATE caretaker
  public async updateCaretaker(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      if (data && Object.keys(data).length === 0)
        throw new Error("Los datos a actualizar son requeridos");
      if (data.role && data.role !== UserRole.CARETAKER)
        data.role = UserRole.CARETAKER;
      if (!id) throw new Error("El ID del cuidador es requerido");

      const updatedCaretaker = await User.findOneAndUpdate(
        { _id: id, role: UserRole.CARETAKER },
        { $set: data },
        { new: true } //ultima version
      );

      return updatedCaretaker;
    } catch (error) {
      console.error("Error al actualizar el cuidador:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
}
