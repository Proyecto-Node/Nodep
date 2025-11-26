// ============================================================
// Controladores de Tareas (taskcontroller.js)
// ============================================================

// Importamos PrismaClient para usar la base de datos
import { PrismaClient } from "@prisma/client";

// Creamos una instancia de Prisma
const prisma = new PrismaClient();

/**
 * Controlador: Obtener todas las tareas del usuario autenticado
 */
export const getTasks = async (req, res) => {
  try {
    // Obtenemos el ID del usuario autenticado desde el middleware JWT
    const userId = req.user.id;

    // Buscamos solo las tareas que pertenecen a ese usuario
    const tasks = await prisma.task.findMany({
      where: { userId }, // Filtrar por usuario autenticado
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

/**
 * Controlador: Crear una nueva tarea asociada al usuario autenticado
 */
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id; // Usuario autenticado
    const { title, description, status } = req.body;

    // Crear tarea vinculada al usuario
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending",
        userId, // Asociarla al usuario autenticado
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
};

/**
 * Controlador: Actualizar una tarea
 */
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id; // Usuario autenticado
    const { id } = req.params;
    const { title, description, status } = req.body;

    // 1. Verificar que la tarea pertenece al usuario
    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId, // Asegurar que la tarea es suya
      },
    });

    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no pertenece al usuario." });
    }

    // 2. Actualizar la tarea
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

/**
 * Controlador: Eliminar una tarea
 */
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id; // Usuario autenticado
    const { id } = req.params;

    // 1. Verificar que la tarea pertenece al usuario
    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no pertenece al usuario." });
    }

    // 2. Eliminar la tarea
    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
