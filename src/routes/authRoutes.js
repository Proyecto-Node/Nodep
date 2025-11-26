import express from "express";

// Importamos los controladores reales
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/* ================================
   RUTAS DE AUTENTICACIÓN
================================ */

// Registro de usuario
router.post("/register", registerUser);

// Login de usuario
router.post("/login", loginUser);

export default router;
