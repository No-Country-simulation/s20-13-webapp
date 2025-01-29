import { Request, Response } from "express";
import { PetsService } from "../services/pets.service";
import { User } from "../models/Users.model";
import cloudinary from "../config/cloudinary";
import path from "path";
export class PetsController {
  private petsService: PetsService;

  constructor() {
    this.petsService = new PetsService();

    this.getAllPetsByUser = this.getAllPetsByUser.bind(this);
    this.getPet = this.getPet.bind(this);
    this.createPet = this.createPet.bind(this);
    this.updatePet = this.updatePet.bind(this);
    this.deletePet = this.deletePet.bind(this);
  }

  public async getAllPetsByUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const pets = await this.petsService.getAllPetsByUser(userId);
      res.status(200).json(pets);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async getPet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const pet = await this.petsService.getPetById(id);
      res.status(200).json(pet);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async createPet(req: Request, res: Response): Promise<void> {
    const petData = req.body;
    const image = req.file
    if (!image) {
      res.status(400).json({ error: "No se ha subido ninguna imagen" })
      return
    }


    try {

    
      
      const extension = path.extname(image).toLowerCase()
      const uniqueFilename = `pet_${Date.now()}${extension}`

      await cloudinary.uploader.upload(image, {
        public_id: uniqueFilename,
        resource_type: "image"
      }, async function (error, result) {
        if (error) {
          const error = new Error("Hubo un error al subir la imágen")
          res.status(500).json({ error: error.message })
          return
        }
        if (result) {
          petData.image = result.secure_url
        }
      })

      const newPet = await this.petsService.createPet(petData);
         
      res.status(201).json("Mascota creada con éxito");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updatePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body;

    try {
      const updatedPet = await this.petsService.updatePet(id, data);
      res.status(200).json("Datos actualizados correctamente");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deletePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deletedPet = await this.petsService.deletePet(id);
      res.status(200).json("Mascota eliminada con éxito");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
