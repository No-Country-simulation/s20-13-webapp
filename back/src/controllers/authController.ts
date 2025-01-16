import { Request, Response } from "express";
import { User } from "../models/Users.model";
import { generateJWT } from "../utils/jwt";
import axios from "axios";

class AuthController{

   static login= async (req: Request, res: Response) => {
        const{ credentials}= req.body
    
    
        if (!credentials) {
            res.status(400).json({ message: 'Token de Google requerido' });
            return
        }
    
        try {
            
            const  {data}  = await axios.get(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${credentials}`
            );
    
            const { email, picture } = data;
    
            let user=await User.findOne({email})
            if(!user){
               user=new User({
                    email,
                    profilePicture:picture
               })              
            }
    
            const token=generateJWT({id:user._id})
            res.status(200).json(token)
            
    
    
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al verificar las credenciales' });
            return
        }
    
    
    }

    static getUser=async (req: Request, res: Response) => {
        res.json(req.user)
    }

}




export default AuthController