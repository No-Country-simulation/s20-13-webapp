
import { Router } from "express";

import { authenticate } from "../middleware/authenticate";
import AuthController from "../controllers/authController";


const router = Router()

router.post("/login",AuthController.login)
router.get("/user",authenticate,AuthController.getUser)


export default router;