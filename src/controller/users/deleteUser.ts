import { Request, Response } from "express";
import { DB } from "../../db/db";


export class DeleteUser{
  execute(req: Request, res: Response){
      try {
        const {id} = req.params
        const user = DB.userDb.find(user => user.id === id )
        if(!user){
          return res.status(404).json({message:'Usuário não encontrado'})
        }
        DB.userDb = DB.userDb.filter(user => user.id !== id)
          return res.status(204).send('Login excluído com sucesso!')
         
          
      } catch (error:any) {res.status(500).send(error.message)
          
      }
  }
  }