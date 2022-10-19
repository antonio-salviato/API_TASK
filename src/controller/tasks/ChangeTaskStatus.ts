import { Request, Response } from "express";
import { DB } from "../../db/db";


export class ChangeTaskStatus {
    execute(req: Request, res: Response){
        const { userId, id } = req.params;
        const { completed } = req.body;
       
              
        DB.userDb.find((user) => userId === user.id)?.taskUser.find((t) => id === t.id)?.updateStatus(completed)



   
          return res.status(200).json();
    }
}