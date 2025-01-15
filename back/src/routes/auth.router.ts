import axios from "axios";
import { Request, Response, Router } from "express";


const router = Router()

router.post("/auth/login", async (req: Request, res: Response) => {
    const{ token}= req.body
    console.log(token)


    if (!token) {
        res.status(400).json({ message: 'Token de Google requerido' });
        return
    }

    try {
        
        const  {data}  = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        );

        console.log(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar el token' });
        return
    }


})


export default router;