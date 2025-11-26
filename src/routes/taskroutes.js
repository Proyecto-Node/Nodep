// ============================================================
// Rutas de Tareas (tasks.routes.js)
// ============================================================

// Importamos Express para crear el router
import express from "express";

// Importamos los controladores de tareas
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js";

// Importamos el middleware de autenticación
// Este middleware valida el JWT enviado en los headers
import { authMiddleware } from "../middleware/authMiddleware.js";

// Creamos el router
const router = express.Router();

// ============================================================
// Todas las rutas de tareas están protegidas con JWT
// Esto significa que solo usuarios autenticados pueden:
// - ver sus tareas
// - crear tareas
// - actualizar sus propias tareas
// - eliminar sus propias tareas
// ============================================================

// GET /tasks → Lista todas las tareas del usuario autenticado
router.get("/", authMiddleware, getTasks);

// POST /tasks → Crea una nueva tarea asociada al usuario autenticado
router.post("/", authMiddleware, createTask);

// PUT /tasks/:id → Actualiza una tarea si pertenece al usuario autenticado
router.put("/:id", authMiddleware, updateTask);

// DELETE /tasks/:id → Elimina una tarea si pertenece al usuario autenticado
router.delete("/:id", authMiddleware, deleteTask);

// Exportamos el router para usarlo en app.js
export default router;
