import { Request, Response } from "express";
import { PetsService } from "../services/pets.service";
import { User } from "../models/Users.model";

export class PetsController {
  private petsService: PetsService;

  constructor() {
    this.petsService = new PetsService();

    this.getAllPets = this.getAllPets.bind(this);
    this.getPet = this.getPet.bind(this);
    this.createPet = this.createPet.bind(this);
    this.updatePet = this.updatePet.bind(this);
    this.deletePet = this.deletePet.bind(this);
  }

  public async getAllPets(req: Request, res: Response): Promise<void> {
    const filters = req.query;

    try {
      const pets = await this.petsService.getAllPets(filters);
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

    try {
      const user = await User.findById(petData.User);
      if (!user) {
        res.status(404).json({ message: "El usuario no está registrado" });
        return;
      }

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
