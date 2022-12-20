import { Tasks } from "../../../models/tasks";
import { redisHelper } from "../../../shared/database/redis-helper";
import { TaskRepository } from "../repositories/tasks-repository";



export default class CreateTaskUseCase {
  async execute( userId:string, task:string ): Promise<any> {
    const taskRepository = new TaskRepository();

    const nTask = new Tasks(task);
    await taskRepository.createTask(userId, nTask);
    await redisHelper.client.del("taskCache")

    return nTask.toJson();
  }
}