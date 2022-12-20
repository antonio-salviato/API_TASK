import { Tasks } from "../../../models/tasks";
import { TaskRepository } from "../repositories/tasks-repository";
import { redisHelper } from "../../../shared/database/redis-helper";

export default class GetTask {
  async execute( userId: string , task: string, completed: boolean) : Promise<Tasks[]> {
    const taskRepository = new TaskRepository();
    let tasks: Tasks[] = [];
    let TaskCache = await redisHelper.client.get("TaskCache");
    let TaskKey = userId + task + completed;

    if (TaskCache) {
      if (TaskCache !== TaskKey) {
        await redisHelper.client.del(TaskCache);
        TaskCache = TaskKey;
        await redisHelper.client.del("TaskCache");
        await redisHelper.client.set("TaskCache", TaskCache);
        tasks = await taskRepository.getTaskByUser(userId, task, completed);
        await redisHelper.client.set(TaskCache, JSON.stringify(tasks));
      } else {
        const taskGet = await redisHelper.client.get(TaskCache);

        const resultTask = JSON.parse(taskGet!);
        tasks = resultTask.map((t: any) =>
          Tasks.createTask(t._id, t._task, t._completed)    
        );
      }
    } else {
      tasks = await taskRepository.getTaskByUser(userId, task, completed);
      TaskCache = TaskKey;
      await redisHelper.client.set("TaskCache", TaskCache);
      await redisHelper.client.set(TaskCache, JSON.stringify(tasks));
    }

    return tasks;
  }
}