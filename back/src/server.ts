import express from 'express';
import { config } from "dotenv"
import { connectDB } from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.router';

config()

connectDB()

const server = express()
server.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev"))
server.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next()
})

//rutas 
server.use("/api/auth", authRouter)

export default server