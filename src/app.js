import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";


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
   - Restringe las peticiones solamente
     al origen permitido (tu frontend).
   - Esto evita que otros sitios llamen a tu API.
================================ */

// Si tienes frontend, pon su URL aquí:
const allowedOrigin = "http://localhost:5173"; 
// Si no tienes frontend aún, puedes permitir temporalmente "*"
// pero explica el motivo en el commit.

app.use(
  cors({
    origin: allowedOrigin, // quién puede hacer peticiones
    methods: ["GET", "POST", "PUT", "DELETE"], // métodos permitidos
    credentials: true, // si el front usa cookies o auth
  })
);

/* ================================
   RATE LIMITING
   - Protege tu API de ataques de fuerza bruta.
   - Evita muchos intentos de login.
================================ */

// Límite especial para rutas de autenticación (/auth)
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Máximo 5 intentos por minuto
  message: {
    error: "Demasiados intentos. Intenta de nuevo en un minuto.",
  },
});

// Límite opcional para tareas (/tasks)
const tasksLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // 30 peticiones por minuto
  message: {
    error: "Límite de peticiones excedido.",
  },
});

// Aplicamos limitador a rutas /auth
app.use("/auth", authLimiter);

// Aplicamos limitador a rutas /tasks (opcional)
app.use("/tasks", tasksLimiter);


/* -----------------------------------------
   RUTAS
------------------------------------------ */

// Ruta base para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("API running");
});

// Importamos las rutas de tareas
import taskRoutes from "./routes/taskroutes.js";

// Conectamos las rutas bajo el prefijo /tasks
app.use("/tasks", taskRoutes);

// Importamos rutas de autenticación
import authRoutes from "./routes/authRoutes.js";

// Usamos las rutas bajo /auth
app.use("/auth", authRoutes);


// Ejemplo usando Prisma
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