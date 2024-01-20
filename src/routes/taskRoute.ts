import { Router } from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  swapOrder,
} from "../contollers/taskController";
import {
  validateCreateTaskInput,
  validateDeleteTaskInput,
  validateEditTaskInput,
  validateSwapTaskInput,
} from "../middleware/taskInputValidator";

const router: Router = Router();

router
  .route("/")
  .get(getAllTasks)
  .post(validateCreateTaskInput, createTask)
  .put(validateEditTaskInput, editTask)
  .delete(validateDeleteTaskInput, deleteTask);

router.route("/swap").post(validateSwapTaskInput, swapOrder);
export default router;
