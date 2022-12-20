import { TaskRepository } from "../repositories/tasks-repository";


export default class DeleteTask{
    async execute (id: string): Promise<any> {
        const taskRepository = new TaskRepository();
        
        await taskRepository.deleteTask(id)
    }

}