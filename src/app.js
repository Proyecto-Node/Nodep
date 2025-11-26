import express from "express";
import dotenv from "dotenv";
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