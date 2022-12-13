import { Request, Response } from "express";

export class TaskController {
  execute(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { taskUser } = req.body;

      const user = DB.userDb.find((user) => user.id === userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const newTask = new Tasks(taskUser);

      user.creatTask(newTask);

      res.json(newTask);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
