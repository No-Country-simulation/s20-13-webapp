import { config } from "dotenv"
import { transporter } from "../config/nodemailer"
config()


export interface IMail{
    ownerEmail:string
    ownerId:string
    caretakerEmail:string
    caretakerName:string
    name:string
    lastName:string
    subject:string
    text:string
}



export class Mailing {
    static async contactCaretaker(data: IMail) {
        const { ownerEmail,ownerId, caretakerEmail, caretakerName, name, lastName, subject, text } = data;

        const htmlContent = `
            <p>Hola ${caretakerName},</p>
            <p>El usuario ${name} ${lastName} te ha enviado una consulta:</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${text}</p>
           <a href="${process.env.FRONTEND_URL}owner/${ownerId}">Ver Perfil del dueño</a>
            <p>Puedes contactar al usuario a través de su email: <a href="mailto:${ownerEmail}">${ownerEmail}</a>.</p>
            <p>Saludos,</p>
            <p>El equipo de PawPet</p>
        `;

        const textContent = `
            Hola ${caretakerName},\n
            El usuario ${name} ${lastName} te ha enviado una consulta:\n
            Asunto: ${subject}\n
            Mensaje:\n
            ${text}\n
           <a href="${process.env.FRONTEND_URL}owner/${ownerId}">Ver Perfil del dueño</a>\n
            Puedes contactar al usuario a través de su email: ${ownerEmail}.\n
            Saludos,\n
            El equipo de PawPet
        `;

        await transporter.sendMail({
            from: `Usuario de PawPet <${ownerEmail}>`,
            to: caretakerEmail,
            subject: subject,
            text: textContent,
            html: htmlContent,
        });
    }
}