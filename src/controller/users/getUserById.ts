import { Request, Response } from "express";
import {DB} from "../../db/db";



export class GetUserByID{
execute(req: Request, res: Response){
    try {
      const {userId} = req.params
      const user = DB.userDb.find(user => user.id === userId )
      if(!user){
        return res.status(404).json({message:'Usuário não encontrado'})
      }
      return res.status(200).json({user})
        
        
    } catch (error:any) {res.status(500).send(error.message)
        
    }

}

}