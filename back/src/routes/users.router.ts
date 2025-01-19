import { Router } from "express";
import UserController from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";

const router=Router()

router.get("/:id",UserController.getById)
router.get("/profile",authenticate,UserController.profile)
router.put("/:id",authenticate,UserController.update)
router.get("/",UserController.getAll)
router.delete("/:id",authenticate,UserController.delete)



export default router