import { Request, Response } from "express";
import { DB } from "../../db/db";

export class updateTask {
  execute(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { task } = request.body;

    const user = DB.userDb.find((user) => userId === user.id);

    const taskFound = user?.taskUser.find((t) => id === t.id);
    
    taskFound?.updateTask(task);

    return response.status(200).json(taskFound);
  }
}
