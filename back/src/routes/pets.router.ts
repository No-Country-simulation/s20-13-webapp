import { Router } from "express";
import { PetsController } from "../controllers/petsController";


const router = Router();
const petsController = new PetsController();

router.get("/", petsController.getAllPets)
router.get("/:id", petsController.getPet);

router.post("/create", petsController.createPet);
router.put("/update/:id", petsController.updatePet); 
router.delete("/delete/:id", petsController.deletePet); 

export default router;


