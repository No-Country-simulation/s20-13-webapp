import { User, IUser, UserRole} from "../models/Users.model";
import { IMail, Mailing } from "../emails/mailing";

export class CaretakerService {


  //POST mail to caretakers
  public async sendEmail(data: IMail): Promise<void> {

    try {
      await Mailing.contactCaretaker(data)

    } catch (error) {
      console.error("Error al enviar el correo:", error)
      throw new Error("No se pudo enviar el correo")
    }
  }




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

  // GET caretaker by ID
  public async getCaretakerById(id: string): Promise<IUser | null> {
    try {
      const caretaker = await User.findOne({
        _id: id,
        role: UserRole.CARETAKER,
      }).populate("availability").populate("reviews");

      return caretaker;
    } catch (error) {
      console.error("Error inesperado al obtener al cuidador por ID:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }

  // UPDATE caretaker
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
        { new: true } // última versión
      );

      return updatedCaretaker;
    } catch (error) {
      console.error("Error al actualizar el cuidador:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }

  // Método para filtrar cuidadores
  public async filterCaretakers(zone?: string, service?: string, petType?: string): Promise<IUser[]> {
    const query: any = { role: UserRole.CARETAKER };
  
    if (zone) query.zone = { $regex: new RegExp(zone, "i") };
    if (service) query.service = { $regex: new RegExp(service, "i") };
    if (petType) query.petType = { $regex: new RegExp(petType, "i") };
  
    console.log("Consulta de cuidadores:", query);
  
    try {
      const caretakers = await User.find(query);
  
      if (!caretakers.length) {
        console.warn("No se encontraron cuidadores que cumplan los criterios");
      }
  
      return caretakers;
    } catch (error) {
      console.error("Error al filtrar cuidadores:", error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
  

}