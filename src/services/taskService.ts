import prisma from "../database/prismaClient";
import { Task } from "@prisma/client";

interface CreateTaskInput {
  description: string;
}

interface EditTaskInput {
  id: string;
  description: string;
  completed?: boolean;
}

async function getAllTasks(order: string = "createdAt"): Promise<Task[]> {
  try {
    const direction = order ? (order[0] === "-" ? "asc" : "desc") : "desc";
    const type = direction === "asc" ? order?.slice(1) : order;
    const tasks = await prisma.task.findMany({
      orderBy: [{ [type]: direction }],
    });
    return tasks;
  } catch (error: any) {
    throw new Error(`Error while fetching tasks: ${error.message}`);
  }
}

async function getTaskById(id: string): Promise<Task> {
  try {
    const tasks = await prisma.task.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return tasks;
  } catch (error: any) {
    throw new Error(`Error while fetching tasks: ${error.message}`);
  }
}

async function createTask(input: CreateTaskInput) {
  try {
    const newTask = await prisma.task.create({
      data: {
        description: input.description,
      },
    });
    return newTask;
  } catch (error: any) {
    throw new Error(`Error while creating task: ${error.message}`);
  }
}

async function editTask(input: EditTaskInput) {
  try {
    const editedTask = await prisma.task.update({
      where: { id: input.id },
      data: { description: input.description, completed: input.completed },
    });
    return editedTask;
  } catch (error: any) {
    throw new Error(`Error while editing task: ${error.message}`);
  }
}

async function deleteTask(taskId: string) {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });
    return deletedTask;
  } catch (error: any) {
    throw new Error(`Error while deleting task: ${error.message}`);
  }
}

async function swapOrder(firstId: string, secondId: string) {
  try {
    const firstTask = await getTaskById(firstId);
    const secondTask = await getTaskById(secondId);
    const editedFirst = await editTask({
      id: firstId,
      description: secondTask.description,
      completed: secondTask.completed,
    });
    const editedSecond = await editTask({
      id: secondId,
      description: firstTask.description,
      completed: firstTask.completed,
    });
    return [editedFirst, editedSecond];
  } catch (error: any) {
    throw new Error(`Error while swapping task: ${error.message}`);
  }
}

export { getAllTasks, createTask, editTask, deleteTask, swapOrder };
