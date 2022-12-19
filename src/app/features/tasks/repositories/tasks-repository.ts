import { TaskEntity } from "../../../shared/entities/task.entity";
import { pgHelper } from "../../../shared/database/pg-helper";
import { Tasks } from "../../../models/tasks";
import { FindOperator, ILike } from "typeorm";
import { UserEntity } from "../../../shared/entities/user.entity";


export class TaskRepository {
  async getTaskByUser(
    userId: string,
    task?: string,
    completed?: string
  ): Promise<Tasks[]> {
    const manager = pgHelper.client.manager;

    let whereConditions: {
      userId: string;
      task?: FindOperator<string>;
      completed?: boolean;
    } = { userId };

    if (completed) {
      whereConditions = {
        ...whereConditions,
        completed: completed === "true" ? true : false,
      };
    }

    if (task) {
      whereConditions = {
        ...whereConditions,
        task: ILike(`%${task}%`),
      };
    }
    const taskEntity = await manager.find(TaskEntity, {
      where: whereConditions,
    });

    return taskEntity.map((e) => Tasks.createTask(e.id, e.task, e.completed));
  }

    async getTasksById(id:string){
        const manager = pgHelper.client.manager;
       
        const taskEntity = await manager.findOne(TaskEntity, {
            where: { id: id },    
        }) as TaskEntity;

        if (!taskEntity) throw new Error("Tarefa não encontrada");
        return taskEntity;
      };

    async createTask(userId: string, task: Tasks) {
        const manager = pgHelper.client.manager;
    
        const userTaskEntity = await manager.findOne(UserEntity, {
          where: { id: userId },
        });
    
        const taskEntity = manager.create(TaskEntity, {
          id: task.id,
          task: task.task,
          completed: task.completed,
          userId,
        });
    
        await manager.save(taskEntity);
      };

   async deleteTaks(id: string): Promise<void>{
        const manager = pgHelper.client.manager;

        await manager.delete(TaskEntity, {id: id});
    }
    
   async updateTask(id: string, task: string, completed: boolean) {
    const manager = pgHelper.client.manager;
    await manager.update(TaskEntity, {id: id},
        {
            task, completed 
        });
  }
  
   async completedStatus(id: string, completed: boolean): Promise<void>{
    const manager = pgHelper.client.manager;
    await manager.update(TaskEntity, {id: id},
    {   
        completed
    });
}
}