import { TaskEntity } from "../../../shared/entities/task.entity";
import { pgHelper } from "../../../shared/database/pg-helper";
import { Tasks } from "../../../models/tasks";
import { FindOperator, ILike } from "typeorm";

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
}
