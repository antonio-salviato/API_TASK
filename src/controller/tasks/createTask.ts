import { timingSafeEqual } from "crypto";
import { Request,Response } from "express";
import { DB } from "../../db/db";
import { Tasks } from "../../models/tasks";
import { User } from "../../models/user";


export class CreateTask{
    execute(req: Request, res: Response) {
        try {
    
          const {id} = req.params
       
        const {taskUser} = req.body

       const user = DB.userDb.find((user) => id === user.id)
       if(!user){
        return res.status(404).json({message:'Usuário não encontrado'})
      }
       const newTask = new Tasks(taskUser)
       
       user.creatTask(newTask)
        
        res.json(taskUser)
        
    } catch (error:any) {res.status(500).send(error.message)
        
    }

}

}