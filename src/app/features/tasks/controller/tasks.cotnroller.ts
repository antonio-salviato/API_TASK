import { Request, Response } from "express";

export class TasksController {
  async getAllTaskByUser(req: Request, res: Response){

    try{
      const { userId } = req.params;
      const { task, completed } = req.query
        
      const tasksRepository = new TasksRepository();
    const TasksByUser = await redisHelper.client.get(`messages:${userId}`);
    let tasks = TasksByUser.map(t => t.Json())
  
    return res.status(200).json(tasks)
  
  
  }catch (error:any) {res.status(500).send(error.message)
          
      }
  }
  
  async CreateTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { taskUser } = req.body;

      const tasksRepository = new TasksRepository();
    
      const usecase = new CreateTask();

      const newTask = await usecase.execute({ userId, taskUser });

      return res.status(200).json(newTask);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}

