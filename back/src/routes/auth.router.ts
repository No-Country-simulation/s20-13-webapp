import axios from "axios";
import { Request, Response, Router } from "express";
import { User } from "../models/Users.model";
import { generateJWT } from "../utils/jwt";
import { authenticate } from "../middleware/authenticate";
import AuthController from "../controllers/authController";


const router = Router()

router.post("/login",AuthController.login)

router.get("/user",authenticate,AuthController.getUser)


export default router;