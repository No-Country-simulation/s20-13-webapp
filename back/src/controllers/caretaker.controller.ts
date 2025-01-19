import { Request, Response } from "express";
import { CaretakerService } from "../services/caretaker.service";

export class CaretakerController {
  private caretakerService: CaretakerService;

  constructor() {
    this.caretakerService = new CaretakerService();

    //bindeo de los metodos
    this.getAllCaretakersController =
      this.getAllCaretakersController.bind(this);
  }

  //GET all caretakers
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

  //GET caretaker by ID
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
}
