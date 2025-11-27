// Importamos dependencias
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import prisma from "../prismaclient.js";

// Carga las variables de entorno
dotenv.config();

// Opciones para la estrategia JWT
const opts = {
  // Extrae el token desde el header Authorization: Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // Clave secreta del .env
  secretOrKey: process.env.JWT_SECRET,
};

// Validación del token
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // Buscamos el usuario por ID usando Prisma
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      // Si no existe -> rechazamos
      if (!user) return done(null, false);

      // Si existe -> lo pasamos
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Exportamos passport
export default passport;
