import { Request, Response } from "express";
import { redisHelper } from "../../../shared/database/redis-helper";
import { TaskRepository } from "../repositories/tasks-repository";
import CreateTaskUseCase from "../usecases/create-task.usecase";
import DeleteTask from "../usecases/delete-task.usecase";
import GetTask from "../usecases/get-task-ByUser.usecase";

export class TasksController {
  async getAllTaskByUser(req: Request, res: Response){

    try{
      const { userId } = req.params;
      const task = req.query.task as string;
      const completed = req.query.completed as unknown as boolean
      
      const usecase = new GetTask();
        
      const result = await usecase.execute(userId, task, completed);
    
      return res.status(200).json(result.map((t) => t.toJson() ))
  
  }catch (error:any) {
    return res.status(500).send(error.message)
          
      }
  }
  
  async CreateTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { task } = req.body;

      const tasksRepository = new TaskRepository();
  
      const usecase = new CreateTaskUseCase();

      const result = await usecase.execute(userId, task)

      return res.status(200).json(result);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    const taskRepository = new TaskRepository();
    taskRepository.deleteTaks(id)

    return res.json({msg: "Tarefa removida com sucesso"});
  
}

async taskUpdate(req: Request, res: Response) {
  const { id } = req.params;    
  const {task, completed} = req.body;

  const taskRepository = new TaskRepository();
  const repoTask = await taskRepository.getTasksById(id);
  if(!repoTask) return res.status(404).json({ err: "Tarefa não encontrada" });

  task.update(task, completed);
  taskRepository.taskUpdate(repoTask);
  
  return res.status(200).json({msg: "Tarefa editada com sucesso"});
}
}