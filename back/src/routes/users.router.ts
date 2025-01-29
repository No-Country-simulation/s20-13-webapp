import { Router } from "express";
import UserController from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";
import { upload } from "../middleware/upload";

const router=Router()

router.get("/:id",UserController.getById)
router.get("/profile",authenticate,UserController.profile)
router.put("/:id",UserController.update)
router.get("/",UserController.getAll)
router.delete("/:id",authenticate,UserController.delete)
router.post("/image",authenticate,upload ,UserController.uploadImage)


export default router