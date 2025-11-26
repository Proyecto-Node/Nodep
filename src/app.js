import express from "express";
import dotenv from "dotenv";
import prisma from "./prisma.js"; // 👈 Importa Prisma

dotenv.config();

const app = express();

// Solo para probar que Prisma funciona
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany(); // 👈 Usa Prisma
  res.json({
    message: "API running with Prisma connected",
    users,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
