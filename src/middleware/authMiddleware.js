// ==========================================
// Middleware para proteger rutas con JWT
// ==========================================

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Obtenemos el header Authorization: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    // Extraemos el token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Formato de token inválido." });
    }

    // Verificamos el token usando la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos datos del usuario en el request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // Continuamos hacia el controlador
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};
