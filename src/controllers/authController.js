// Importamos Prisma Client para interactuar con la base de datos
import { PrismaClient } from "@prisma/client";

// Importamos bcryptjs para hashear contraseñas
import bcrypt from "bcryptjs";

// Inicializamos prisma
const prisma = new PrismaClient();

// Controlador para registrar un usuario
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
