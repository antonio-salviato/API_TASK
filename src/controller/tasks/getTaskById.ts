import { Request, Response } from "express";
import {DB} from "../../db/db";



export class GetTasksById{
execute(req: Request, res: Response){
  const { userId, id } = req.params;

  const user = DB.userDb.find((user) => userId === user.id);

  const taskFound = user?.taskUser.find(
    (task => id === task.id))
    
    
    return res.status(200).json(taskFound);
  }

}

  
  