import { Express } from "express";
import { DeleteUser } from "./controller/users/deleteUser";
import { GetAllUser } from "./controller/users/getAllUser";
import { EditUser } from "./controller/users/updateUser";
import { CreateUser } from "./controller/users/createUser";
import { GetUserByID } from "./controller/users/getUserById";
import { CreateTask } from "./controller/tasks/createTask";
import { GetAllTasksByUser } from "./controller/tasks/getAllTaskByUser";
import { GetTasksById } from "./controller/tasks/getTaskById";
import { updateTask } from "./controller/tasks/updateTask";
import { ChangeTaskStatus } from "./controller/tasks/ChangeTaskStatus";
import { ValidateCreatedUserMiddleware } from "./middleware/validateUser/ValidateUser";
import { ValidateEmailMiddleware } from "./middleware/validateUser/ValidateEmail";
import { LoggedUserMiddleware } from "./middleware/validateUser/LoggedUser";



export default (app: Express) => {
  app.get("/user", new GetAllUser().execute);

  app.post("/user", 
  new ValidateCreatedUserMiddleware().execute,
  new ValidateEmailMiddleware().execute, 
  new CreateUser().execute);

  app.get("/user/:userId", new GetUserByID().execute);

  app.delete("/user/:userId", new LoggedUserMiddleware().execute ,new DeleteUser().execute);

  app.put("/user/:userId", new EditUser().execute);

  app.post("/user/:userId/tasks", 
  new LoggedUserMiddleware().execute,
  new CreateTask().execute);
  
  app.get("/user/:userId/tasks", new LoggedUserMiddleware().execute, new GetAllTasksByUser().execute);
  
  app.get("/user/:userId/tasks/:id", new LoggedUserMiddleware().execute, new GetTasksById().execute);
  
  app.put("/user/:userId/tasks/:id", new LoggedUserMiddleware().execute, new updateTask().execute);

  app.put("/user/:userId/tasks/:id/status", new LoggedUserMiddleware().execute, new ChangeTaskStatus().execute);
};
