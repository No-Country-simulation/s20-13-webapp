import { Router } from "express";
import { CaretakerController } from "../controllers/caretaker.controller";

const router = Router();
const caretakerController = new CaretakerController();

//GET
router.get("/", caretakerController.getAllCaretakersController);
router.get("/:id", caretakerController.getCaretakerByIdController);

//PATCH

export default router;
