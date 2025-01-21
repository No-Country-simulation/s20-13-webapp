import { Router } from "express";
import { CaretakerController } from "../controllers/caretaker.controller";
import { AvailabilityController } from "../controllers/availability.controller";

const router = Router();
const caretakerController = new CaretakerController();
const availabilityController = new AvailabilityController();

//CARETAKERS
router.get("/", caretakerController.getAllCaretakersController);
router.get("/:id", caretakerController.getCaretakerByIdController);

router.patch("/:id", caretakerController.updateCaretakerController);

//AVAILABILITY (se podria crear un router independiente)
router.get(
  "/:caretakerId/availability",
  availabilityController.getAllAvailabilityController
);

router.post(
  "/:caretakerId/availability",
  availabilityController.createAvailabilityController
);

router.patch(
  "/:caretakerId/availability/:availabilityId",
  availabilityController.updateAvailabilityController
);

router.delete(
  "/:caretakerId/availability/:availabilityId",
  availabilityController.deleteAvailabilityController
);

export default router;
