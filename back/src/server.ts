import express from 'express';
import {config} from "dotenv"
import { connectDB } from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.router';

config()

connectDB()

const server=express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan("dev"))
server.use("/api",authRouter)

export default server