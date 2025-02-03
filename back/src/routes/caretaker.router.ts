import { Router } from "express";
import { CaretakerController } from "../controllers/caretaker.controller";
import { AvailabilityController } from "../controllers/availability.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();
const caretakerController = new CaretakerController();
const availabilityController = new AvailabilityController();

//filtros
router.get("/filter", caretakerController.filterCaretakersController);


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


// MAILING //

router.post("/:caretakerId/mailing",authenticate,
  caretakerController.sendEmail)

export default router;
