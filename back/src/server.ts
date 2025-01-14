import express from 'express';
import {config} from "dotenv"
import { connectDB } from './config/db';
config()

connectDB()

const server=express()

export default server