import { Availability, IAvailability } from "../models/Availability.model";
import { User, AvailabilityDay} from "../models/Users.model";
import { Types } from "mongoose";

//esto se puede cambiar dependiendo de como lo mande el front
interface IAvailabilityData {
  day: string;
  startTime: string;
  endTime: string;
}

export class AvailabilityService {
  //GET all availability
  public async getAllAvailability(
    caretakerId: string
  ): Promise<IAvailability[]> {
    if (!Types.ObjectId.isValid(caretakerId)) {
      throw new Error("ID de cuidador inválido");
    }

    const availabilityList = await Availability.find({
      caretaker: caretakerId,
    }).sort({ day: 1 }); //ordena por día

    return availabilityList;
  }

  //POST create availability
  public async createAvailability(
    caretakerId: string,
    data: IAvailabilityData
  ): Promise<IAvailability> {
    if (!caretakerId) throw new Error("ID de cuidador inválido");
    if (!data.day || !data.startTime || !data.endTime)
      throw new Error("Faltan datos de disponibilidad");

    if (data.startTime >= data.endTime)
      throw new Error("El horario de inicio debe ser menor al de fin");
    if (
      data.startTime < "00:00" ||
      data.startTime > "23:59" ||
      data.endTime < "00:00" ||
      data.endTime > "23:59"
    ) {
      throw new Error("Horario inválido");
    }

    /*
      FUTURO:
      1) Middleware para verificar que el cuidador existe o con JWT.
      2) Validar si el día es correcto con otras reglas (por ejemplo, no permitir fines de semana).
      3) Evitar choques de disponibilidad (ver si ya existe un Availability en el mismo día/hora).
    */

    //verificar que el usuario existe y sea caretaker
    const caretakerUser = await User.findOne({
      _id: caretakerId,
    });
    if (!caretakerUser) throw new Error("No existe un usuario con ese ID");
    if (caretakerUser.role !== "caretaker")
      throw new Error("El usuario no es cuidador (role=caretaker)");

    const newAvailability = new Availability({
      caretaker: caretakerId,

      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
    });
    const savedAvailability = await newAvailability.save();

    //actualizar el array de availability en el usuario
    caretakerUser.availability = caretakerUser.availability || [];
    if (!caretakerUser.availability.includes(data.day as AvailabilityDay)) {
      caretakerUser.availability.push(data.day as AvailabilityDay);
    }
    await caretakerUser.save();

    return savedAvailability;
  }

  //PATCH update availability
  public async updateAvailability(
    caretakerId: string,
    availabilityId: string,
    data: IAvailabilityData
  ): Promise<IAvailability | null> {
    if (!Types.ObjectId.isValid(caretakerId))
      throw new Error("ID de cuidador inválido");
    if (!Types.ObjectId.isValid(availabilityId))
      throw new Error("ID de disponibilidad inválido");

    if (!data.day || !data.startTime || !data.endTime)
      throw new Error("Faltan datos de disponibilidad");

    if (data.startTime >= data.endTime)
      throw new Error("El horario de inicio debe ser menor al de fin");
    if (
      data.startTime < "00:00" ||
      data.startTime > "23:59" ||
      data.endTime < "00:00" ||
      data.endTime > "23:59"
    ) {
      throw new Error("Horario inválido");
    }

    /*
      FUTURO:
      1- evitar conflictos con schedule: si ya hay un schedule confirmado que cae dentro de esta disponivilida, podes no permitir cambiar el horario que deja sin efecto esa reserva
      2- si el cuidador quiere reducir disponibilidad, notificar a los dueños que tengan reservas en esos dias 
        - reglas de negocio especificas usando el mail con nodemailer, peroq ue se arreglen ellos
    */

    const caretakerUser = await User.findById(caretakerId);
    if (!caretakerUser) throw new Error("No existe un usuario con ese ID");
    if (caretakerUser.role !== "caretaker")
      throw new Error("El usuario no es cuidador (role=caretaker)");

    //comprobar que "availabilityId" esté dentro de su array "availability"
    if (!caretakerUser.availability?.includes(data.day as AvailabilityDay)) {
      throw new Error("La disponibilidad a actualizar no pertenece al cuidador especificado");
    }

    const updatedDoc = await Availability.findOneAndUpdate(
      {
        _id: availabilityId,
        caretaker: caretakerId, //que caretaker sea el dueño
      },
      {
        $set: {
          day: data.day,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      },
      { new: true } //documento actualizado
    );

    return updatedDoc;
  }

  //DELETE availability
  public async deleteAvailability(
    caretakerId: string,
    availabilityId: string
  ): Promise<IAvailability | null> {
    if (!Types.ObjectId.isValid(caretakerId))
      throw new Error("ID de cuidador inválido");
    if (!Types.ObjectId.isValid(availabilityId))
      throw new Error("ID de disponibilidad inválido");

    /*
      FUTURO:
      1 - antes de borrar, verificar si existe un schedule que use esta disponibilidad
         - se puede no permitir el borrado si hay reservas pendientes o confirmadas en el horario de este availabiliti en especifico
    */

    //OJO ACÁ, se borra si se encuentra automaticamente con mongoose
    const deletedDoc = await Availability.findOneAndDelete({
      _id: availabilityId,
      caretaker: caretakerId,
    });

    return deletedDoc; //null si no encuentra
  }
}
