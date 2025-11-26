// Importamos PrismaClient para usar la base de datos
import { PrismaClient } from "@prisma/client";

// Creamos una instancia de Prisma
const prisma = new PrismaClient();

/**
 * Controlador: Obtener todas las tareas
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany(); // Obtiene todas las tareas de la tabla
    res.json(tasks); // Devuelve las tareas
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

/**
 * Controlador: Crear una nueva tarea
 */
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body; // Información enviada por el usuario

    const newTask = await prisma.task.create({
      data: { title, description },
    });

    res.status(201).json(newTask); // 201 = creado
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
};

/**
 * Controlador: Actualizar una tarea por ID
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // ID de la tarea a actualizar
    const { title, description } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

/**
 * Controlador: Eliminar una tarea por ID
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
