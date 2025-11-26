import express from "express";

// Importamos el controlador de registro
import { registerUser } from "./controllers/authController.js";

const router = express.Router();

// Ruta POST /auth/register
// Esta ruta permite registrar usuarios nuevos
router.post("/register", registerUser);

export default router;
