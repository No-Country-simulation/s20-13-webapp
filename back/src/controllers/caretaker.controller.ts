import { Request, Response } from "express";
import { CaretakerService } from "../services/caretaker.service";
import { UserService } from "../models/Users.model";
import { IMail, Mailing } from "../emails/mailing";


export class CaretakerController {
  private caretakerService: CaretakerService;

  constructor() {
    this.caretakerService = new CaretakerService();

    // Bindeo de los métodos
    this.getAllCaretakersController = this.getAllCaretakersController.bind(this);
    this.getCaretakerByIdController = this.getCaretakerByIdController.bind(this);
    this.updateCaretakerController = this.updateCaretakerController.bind(this);
    this.filterCaretakersController = this.filterCaretakersController.bind(this);
  }

  //POST /api/caretaker/:caretakerId/mailing
  public sendEmail = async (
    req: Request,
    res: Response
  ): Promise<any> => {

    const owner = req.user!
    const { subject, text } = req.body
    const { caretakerId } = req.params

    try {
      if (!owner.email || !subject || !text || !caretakerId) {
        return res.status(404).json({
          success: false,
          message: "Existen campos vacíos"
        })
      }
      const caretaker = await this.caretakerService.getCaretakerById(caretakerId)
      if (!caretaker) {
        return res.status(404).json({
          success: false,
          message: "Cuidador no encontrado",
        });
      }
      const data: IMail = {
        ownerEmail: owner.email,
        caretakerEmail: caretaker.email,
        caretakerName: caretaker.name,
        name: owner.name,
        lastName: owner.lastName!,
        subject: subject,
        text: text,
      }

      await this.caretakerService.sendEmail(data)

      return res.status(200).json("Correo enviado con éxito")
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Ha ocurrido un error inesperado"
      })
    }

  }



  //GET /api/caretaker/
  public getAllCaretakersController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const caretakers = await this.caretakerService.getAllCaretakers();

      return res.status(200).json({
        success: true,
        message: "Cuidadores obtenidos con éxito",
        data: caretakers,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Ha ocurrido un error inesperado",
      });
    }
  };

  // GET /api/caretaker/:id
  public getCaretakerByIdController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const caretaker = await this.caretakerService.getCaretakerById(id);

      if (!caretaker) {
        return res.status(404).json({
          success: false,
          message: "Cuidador no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cuidador encontrado con éxito",
        data: caretaker,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Ha ocurrido un error inesperado",
      });
    }
  };

  // PATCH /api/caretaker/:id
  public updateCaretakerController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const updatedCaretaker = await this.caretakerService.updateCaretaker(id, req.body);

      if (!updatedCaretaker) {
        return res.status(404).json({
          success: false,
          message: "Cuidador no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cuidador actualizado con éxito",
        data: updatedCaretaker,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Ha ocurrido un error inesperado",
      });
    }
  };

  // Filtrado de cuidadores
  public filterCaretakersController = async (req: Request, res: Response): Promise<any> => {
    const { zone, service } = req.query;
  
    console.log("Filtros recibidos:", { zone, service });
  
    try {
      const caretakers = await this.caretakerService.filterCaretakers(
        String(zone || ""),
        String(service || "")
      );
  
      if (caretakers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Cuidadores no encontrados",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Cuidadores filtrados con éxito",
        data: caretakers,
      });
    } catch (error: any) {
      console.error("Error en el controlador:", error);
  
      return res.status(500).json({
        success: false,
        message: error.message || "Ha ocurrido un error inesperado",
      });
    }
  };
  

}