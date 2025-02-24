import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Middleware to validate task input
const validateTaskInput = (
  req: Request,
  res: Response,
  next: Function
): any => {
  const { title, color } = req.body;

  // Validating if title is provided
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Title is required and should be a non-empty string" });
  }

  // Validating if color is provided and valid
  if (!color || typeof color !== "string" || color.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Color is required and should be a non-empty string" });
  }

  next(); // Proceed to the next middleware or route handler
};

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Get task by ID
router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    try {
      const { id } = req.params; // Params should be typed as { id: string }

      const task = await prisma.task.findUnique({
        where: { id }, // If id is a number in DB, convert it using parseInt()
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to retrieve the task" });
    }
  }
);

// Create a new task
router.post("/", validateTaskInput, async (req: Request, res: Response) => {
  const { title, color } = req.body;
  try {
    const task = await prisma.task.create({ data: { title, color } });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
router.put(
  "/:id",
  validateTaskInput,
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    try {
      const task = await prisma.task.update({
        where: { id: id },
        data: { title, color, completed },
      });
      res.json(task);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(500).json({ error: "Failed to update task" });
    }
  }
);

// Delete a task
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({ where: { id: id } });
    res.json({ message: "Task deleted", task });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
