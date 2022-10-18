import { Express } from "express";
import { DeleteUser } from "./controller/users/deleteUser";

import { GetAllUser } from "./controller/users/getAllUser";
import { EditUser } from "./controller/users/updateUser";
import { CreateUser } from "./controller/users/createUser";
import { GetUserByID } from "./controller/users/getUserById";
import { CreateTask } from "./controller/tasks/createTask";
import { GetAllTasksByUser } from "./controller/tasks/getAllTaskByUser";
import { GetTasksById } from "./controller/tasks/getTaskById";

export default (app: Express) => {
  app.get("/user", new GetAllUser().execute);

  app.post("/user", new CreateUser().execute);

  app.get("/user/:userId", new GetUserByID().execute);

  app.delete("/user/:userId", new DeleteUser().execute);

  app.put("/user/:userId", new EditUser().execute);

  app.post("/user/:userId/tasks", new CreateTask().execute);

  app.get("/user/:userId/tasks", new GetAllTasksByUser().execute);

  app.get("/user/:userId/tasks/:id", new GetTasksById().execute);
};
