import express from "express";
import dotenv from "dotenv";

// Cargamos variables de entorno
dotenv.config();

// Inicializamos express
const app = express();

app.get("/", (req, res) => {
  res.send("API running");
});

// Importamos las rutas de tareas
import taskRoutes from "./src/routes/taskRoutes.js";

// Conectamos las rutas bajo el prefijo /tasks
app.use("/tasks", taskRoutes);

// Importamos rutas de autenticación
import authRoutes from "./src/routes/authRoutes.js";

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
