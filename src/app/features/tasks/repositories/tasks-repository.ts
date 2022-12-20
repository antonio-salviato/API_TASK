import { TaskEntity } from "../../../shared/entities/task.entity";
import { Tasks } from "../../../models/tasks";
import { UserEntity } from "../../../shared/entities/user.entity";
import { dataSource } from "../../../../main/database/typeorm";
import { userInfo } from "os";


export class TaskRepository {
 async getAll(userId: string): Promise<Tasks[]> {
          const manager = dataSource.manager;
  
          const tasksEntities = await manager.find(TaskEntity, {
              where: { userId },
          });
          
          return tasksEntities.map(row => {
              return Tasks.createTask(
                  row.id,
                  row.task,
                  row.completed,
              
              )
          });
      }
  
    async getTasksById(id:string){
      const manager = dataSource.manager;

      const taskEntity = await manager.findOne(TaskEntity, {
          where: { id }
      });

      if(!taskEntity) return null;
      
      return Tasks.createTask(
          taskEntity.id,
          taskEntity.task,
          taskEntity.completed,
          

      )
  }

    async createTask(userId: string, task: Tasks) {
        const manager = dataSource.manager;
    
        const userTaskEntity = await manager.findOne(UserEntity, {
          where: { id:userId },
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
        const manager = dataSource.manager;

        await manager.delete(TaskEntity, {id: id});
    }
    
    async taskUpdate(task: Tasks): Promise<void> {
        const manager = dataSource.manager;
        
        const taskEntity = manager.create(TaskEntity, {
            id: task.id,
            task: task.task,
            completed: task.completed,
              
        });
        
        await manager.save(taskEntity);
    }
  
   async completedStatus(id: string, completed: boolean): Promise<void>{
    const manager = dataSource.manager;
    await manager.update(TaskEntity, {id: id},
    {   
        completed
    });
}
}