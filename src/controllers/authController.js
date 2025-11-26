// ================================
// Controlador de Autenticación
// ================================

// Importamos Prisma Client para interactuar con la base de datos
import { PrismaClient } from "@prisma/client";

// Importamos bcryptjs para hashear contraseñas
import bcrypt from "bcryptjs";

// Importamos jwt para generar tokens de autenticación
import jwt from "jsonwebtoken";

// Inicializamos Prisma
const prisma = new PrismaClient();


// ================================
// REGISTRO DE USUARIO
// ================================
export const registerUser = async (req, res) => {
  try {
    // Extraemos email y password del body
    const { email, password } = req.body;

    // Validamos que ambos datos existan
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }

    // Verificamos si el email ya existe en la base de datos
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Generamos hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Respondemos con el usuario creado (sin enviar el password)
    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};



// ================================
// LOGIN DE USUARIO
// ================================
export const loginUser = async (req, res) => {
  try {
    // Extraemos email y password del body
    const { email, password } = req.body;

    // Validamos que existan
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }

    // Buscamos al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Si no existe → error
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas." });
    }

    // Comparamos la contraseña ingresada con la hasheada en BD
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas." });
    }

    // Generamos un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // datos dentro del token
      process.env.JWT_SECRET,             // clave secreta
      { expiresIn: "1d" }                 // duración del token
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};