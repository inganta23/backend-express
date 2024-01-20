import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as taskService from "../services/taskService";

async function getAllTasks(req: Request, res: Response): Promise<void> {
  try {
    let order = req.query.order as string;
    if (!order) order = "createdAt";
    const tasks = await taskService.getAllTasks(order);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description } = req.body;
    const newTask = await taskService.createTask({ description });
    return res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function editTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, description, completed } = req.body;
    const editedTask = await taskService.editTask({
      id,
      description,
      completed,
    });
    return res.json(editedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const taskId = req.query.id as string;
    const deletedTask = await taskService.deleteTask(taskId);
    return res.json(deletedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function swapOrder(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstId, secondId } = req.body;
    const swappedTask = await taskService.swapOrder(firstId, secondId);
    return res.json(swappedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getAllTasks, createTask, editTask, deleteTask, swapOrder };
