// Importamos Express para crear el router
import express from "express";

// Importamos los controladores de tareas
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js";

// Creamos el router
const router = express.Router();

// GET /tasks → Lista todas las tareas
router.get("/", getTasks);

// POST /tasks → Crea una nueva tarea
router.post("/", createTask);

// PUT /tasks/:id → Actualiza una tarea existente
router.put("/:id", updateTask);

// DELETE /tasks/:id → Elimina una tarea por ID
router.delete("/:id", deleteTask);

// Exportamos el router para usarlo en app.js
export default router;