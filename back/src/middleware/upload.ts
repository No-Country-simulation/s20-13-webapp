import { NextFunction, Request, Response } from "express";
import formidable from "formidable";


declare global {
    namespace Express {
        interface Request {
            file?: string
        }
    }
}

export const upload = async (req: Request, res: Response, next: NextFunction) => {

    const form=formidable({multiples:false})

     try {
        form.parse(req,(err,fields,files)=>{
            if(err){
                res.status(400).json({error:"Hubo un error al subir la imagen"})
                return
            }
            if(files.image){
            req.file=files.image[0].filepath 
            next()
        }
        })
     } catch (error) {
        res.status(404).json({error:"Hubo un error al subir la imagen"})
     }   

}