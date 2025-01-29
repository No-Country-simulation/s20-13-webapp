import { Router } from "express";
import { PetsController } from "../controllers/petsController";
import { upload } from "../middleware/upload";


const router = Router();
const petsController = new PetsController();

router.get("/user/:userId", petsController.getAllPetsByUser)
router.get("/:id", petsController.getPet);

router.post("/create",upload, petsController.createPet);
router.put("/update/:id", petsController.updatePet); 
router.delete("/delete/:id", petsController.deletePet); 

export default router;


