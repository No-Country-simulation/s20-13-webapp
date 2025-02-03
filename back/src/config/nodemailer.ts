import { config } from "dotenv"
import nodemailer from "nodemailer"
config()

const mailConfig = () => {
    return {
        service: process.env.SMPT_HOST,
        port: +process.env.SMPT_PORT!,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASS

        }
    }
}

export const transporter=nodemailer.createTransport(mailConfig())