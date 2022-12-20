import { Router } from "express";
import {TasksController} from "./controller/tasks.cotnroller";
import { CreateTaskValidator } from "./validators/create.task.validator";


export default () => {
  const router = Router();

  const taskController = new TasksController();

  router.get("/user/:userId/tasks", taskController.getAllTaskByUser);
  router.post(
    "/user/:userId/tasks",
    new CreateTaskValidator().validate,
    taskController.CreateTask
  );
  router.put("/task/:id", taskController.taskUpdate);
  router.delete("/task/:id", taskController.deleteTask);

  return router;
};