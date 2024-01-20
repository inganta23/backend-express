import { body, query } from "express-validator";

const validateCreateTaskInput = [
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
];

const validateEditTaskInput = [
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("id")
    .notEmpty()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
  body("completed")
    .notEmpty()
    .withMessage("Completed is required")
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

const validateDeleteTaskInput = [
  query("id")
    .notEmpty()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
];

const validateSwapTaskInput = [
  body("firstId")
    .notEmpty()
    .withMessage("firstId is required")
    .isString()
    .withMessage("firstId must be a string"),
  body("secondId")
    .notEmpty()
    .withMessage("secondId is required")
    .isString()
    .withMessage("secondId must be a string"),
];

export {
  validateCreateTaskInput,
  validateEditTaskInput,
  validateDeleteTaskInput,
  validateSwapTaskInput,
};
