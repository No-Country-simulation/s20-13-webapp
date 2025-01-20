import { Router } from "express";
import { PetsController } from "../controllers/petsController";


const router = Router();
router.get("/", PetsController.getAllPets)
router.get("/:id", PetsController.getPet);

router.post("/create", PetsController.createPet);
router.put("/update/:id", PetsController.updatePet); 
router.delete("/delete/:id", PetsController.deletePet); 

export default router;


