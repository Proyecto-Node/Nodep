// ============================================================
// Rutas de Tareas (tasks.routes.js)
// ============================================================

// Importamos Express para crear el router
import express from "express";

// Importamos Passport (nuevo para commit 9)
// Lo usaremos para proteger rutas con la estrategia JWT
import passport from "passport";

// Importamos los controladores de tareas
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js";

// Importamos el middleware personalizado de autenticación (commit 7)
// Este middleware valida manualmente el JWT enviado en los headers
import { authMiddleware } from "../middleware/authMiddleware.js";

// Creamos el router
const router = express.Router();

// ============================================================
// PROTECCIÓN DE RUTAS
// Este archivo ahora admite **dos formas de protección**
//
// 1️⃣ authMiddleware (middleware propio)
// 2️⃣ passport.authenticate("jwt") (nuevo en commit 9)
//
// 🔥 ¿Por qué mantenemos ambos? 
//
// Porque Passport ofrece:
// - Validación del token más robusta
// - Manejo estándar de estrategias JWT
// - Mejor integración si luego agregan roles, OAuth o sesiones
//
// Pero conservamos authMiddleware temporalmente para:
// - Compatibilidad con código existente
// - Probar ambas opciones antes de decidir cuál dejar permanentemente
//
// En este commit permitimos **ambas** protecciones simultáneamente
// para fines educativos y de comparación.
// ============================================================

// ============================================================
// GET /tasks → Lista todas las tareas
// Aquí protegemos la ruta con Passport (nuevo)
// También dejamos authMiddleware para que se pueda comparar
// ============================================================
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // NUEVO
  authMiddleware, // Mantenido como en commit 7
  getTasks
);

// ============================================================
// POST /tasks → Crear una tarea
// Protegida por Passport + middleware propio
// ============================================================
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // NUEVO
  authMiddleware,
  createTask
);

// ============================================================
// PUT /tasks/:id → Actualizar una tarea
// ============================================================
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }), // NUEVO
  authMiddleware,
  updateTask
);

// ============================================================
// DELETE /tasks/:id → Eliminar una tarea
// ============================================================
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }), // NUEVO
  authMiddleware,
  deleteTask
);

// Exportamos el router para usarlo en app.js
export default router;
