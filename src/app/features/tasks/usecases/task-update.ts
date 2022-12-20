import { TaskRepository } from "../repositories/tasks-repository";

interface RequestData {
  id: string;
  task: string;
  completed: boolean;
}

export class TaskUpdate {
  private _taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this._taskRepository = taskRepository;
  }

  async execute(data: RequestData) {
    const tasks = await this._taskRepository.getTasksById(data.id);

    if (!tasks) {
      throw new Error("Tarefa não encontrada");
    }

    tasks.updateTask(data.task);
    await this._taskRepository.taskUpdate(tasks);

    return tasks.toJson();
  }
}
