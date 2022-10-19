import crypto from "crypto";

export class Tasks {
  private _id: string;
  get id() {
    return this._id;
  }
  private _task: string;
  get task() {
    return this._task;
  }
  set task(task){
    this._task = task
  }
  private _completed: boolean;
  get completed() {
    return this._completed;
  }

  constructor(task: string) {
    this._id = crypto.randomUUID();
    this._task = task;
    this._completed = false;
  }


  updateTask(task: string) {
    this._task = task;
  }
  updateStatus( completed: boolean) {
    this._completed = completed;
    
  }
  
  toReturn() {
    return {
      id: this._id,
      task:this._task,
      completed: this._completed,

    };
  }
}
