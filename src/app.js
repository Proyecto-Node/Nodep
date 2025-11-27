import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

// 🔐 Importamos Passport (nuevo)
import passport from "passport";
// 🔐 Importamos la configuración de la estrategia JWT (nuevo)

import "./config/passport.js";

// Cargamos variables de entorno
dotenv.config();

// Inicializamos express
const app = express();

// Inicializamos Prisma
const prisma = new PrismaClient();

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;

/* -----------------------------------------
   MIDDLEWARES
------------------------------------------ */

// Middleware para poder leer JSON del body
app.use(express.json());

/* -----------------------------------------
   CORS y Rate Limiting
------------------------------------------ */

/* ================================
   CONFIGURACIÓN DE CORS
================================ */
const allowedOrigin = "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ================================
   RATE LIMITING
================================ */

// Límite especial para rutas de autenticación (/auth)
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "Demasiados intentos. Intenta de nuevo en un minuto.",
  },
});

// Límite opcional para tareas (/tasks)
const tasksLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    error: "Límite de peticiones excedido.",
  },
});

// Aplicamos limitadores
app.use("/auth", authLimiter);
app.use("/tasks", tasksLimiter);

/* -----------------------------------------
   🔐 PASSPORT (NUEVO)
------------------------------------------ */

// Activamos passport dentro de la app
// Este middleware permite que las rutas puedan usar:
// passport.authenticate("jwt", { session: false })
app.use(passport.initialize()); // <-- NUEVO Y COMENTADO

/* -----------------------------------------
   RUTAS
------------------------------------------ */

// Ruta base para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("API running");
});

// Importamos rutas de tareas
import taskRoutes from "./routes/taskroutes.js";

// Conectamos rutas de tareas
// (Passport se usará dentro de taskroutes.js — NO aquí)
app.use("/tasks", taskRoutes);

// Importamos rutas de autenticación
import authRoutes from "./routes/authRoutes.js";

// Conectamos rutas /auth
app.use("/auth", authRoutes);

// Ejemplo usando Prisma (ya lo tenías)
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* -----------------------------------------
   INICIAR SERVIDOR
------------------------------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
