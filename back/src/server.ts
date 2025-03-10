import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.router";
import petsRouter from "./routes/pets.router";
import caretakerRouter from "./routes/caretaker.router";
import reviewsRouter from "./routes/reviews.router";
import	userRouter from "./routes/users.router"

config();

connectDB();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(
  cors()
);

//seguridad de cors
server.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

//rutas 
server.use("/api/auth", authRouter)
server.use("/api/pets", petsRouter)
server.use("/api/users", userRouter)
server.use("/api/reviews", reviewsRouter)
server.use("/api/caretaker",caretakerRouter)

export default server;
