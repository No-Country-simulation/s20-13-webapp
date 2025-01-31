import { Request, Response } from "express";
import { AvailabilityService } from "../services/availability.service";

export class AvailabilityController {
  private availabilityService: AvailabilityService;

  constructor() {
    this.availabilityService = new AvailabilityService();

    //bindeo de los metodos
    this.getAllAvailabilityController =
      this.getAllAvailabilityController.bind(this);
    this.createAvailabilityController =
      this.createAvailabilityController.bind(this);
    this.updateAvailabilityController =
      this.updateAvailabilityController.bind(this);
    this.deleteAvailabilityController =
      this.deleteAvailabilityController.bind(this);
  }

  // GET /:caretakerId/availability
  public async getAllAvailabilityController(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { caretakerId } = req.params;
      const allAvailability = await this.availabilityService.getAllAvailability(
        caretakerId
      );

      return res.status(200).json({
        success: true,
        data: allAvailability,
        message: "Disponibilidad obtenida con éxito.",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message || "Ocurrió un error al obtener la disponibilidad.",
      });
    }
  }

  // POST /:caretakerId/availability
  public async createAvailabilityController(
    req: Request,
    res: Response
  ): Promise<any> {


  
    try {
      const { caretakerId } = req.params;
       let{availability}=req.body;

    // Verificar si availability es un array, si no, convertirlo
    if (!Array.isArray(availability)) {
      availability = Object.values(availability);
    }

    // Verificar que no esté vacío
    if (!availability || availability.length === 0) {
      return res.status(400).json({ message: "Availability data is required" });
    }

      
       const newAvailability = await this.availabilityService.createAvailability(
         caretakerId,
         availability
       );
  

      return res.status(201).json({
        success: true,
        data: newAvailability,
        message: "Disponibilidad creada con éxito.",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message || "Ocurrió un error al crear la disponibilidad.",
      });
    }
  }

  // PATCH /:caretakerId/availability/:availabilityId
  public async updateAvailabilityController(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { caretakerId, availabilityId } = req.params;
      const { day, startTime, endTime } = req.body;

      const updatedAvailability =
        await this.availabilityService.updateAvailability(
          caretakerId,
          availabilityId,
          { day, startTime, endTime }
        );

      if (!updatedAvailability) {
        return res.status(404).json({
          success: false,
          message: "No se encontró la disponibilidad para actualizar.",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedAvailability,
        message: "Disponibilidad actualizada con éxito.",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message || "Ocurrió un error al actualizar la disponibilidad.",
      });
    }
  }

  // DELETE /:caretakerId/availability/:availabilityId
  public async deleteAvailabilityController(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { caretakerId, availabilityId } = req.params;
      const deletedAvailability =
        await this.availabilityService.deleteAvailability(
          caretakerId,
          availabilityId
        );

      if (!deletedAvailability) {
        return res.status(404).json({
          success: false,
          message: "No se encontró la disponibilidad para eliminar.",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedAvailability,
        message: "Disponibilidad eliminada con éxito.",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message || "Ocurrió un error al eliminar la disponibilidad.",
      });
    }
  }
}
