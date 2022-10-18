import { Request, Response } from "express";
import {DB} from "../../db/db";


export class GetAllUser{
execute(req: Request, res: Response){

  try{
    const { name, email } = req.query;

    let userFounded = DB.userDb.map(user => {
        return user.toString();
    });

    if(userFounded.length === 0)
       return res.send("Login não encontrado");
   
    if(name) {
      userFounded = userFounded.filter(user => {
            return user.name.toLowerCase().includes(name.toString().toLowerCase())
        });
    }if(email) {
        userFounded = userFounded.filter(user => {
            return user.email.toLowerCase().includes(email.toString().toLowerCase())
        })
    }

    return res.json(userFounded);

}catch (error:any) {res.status(500).send(error.message)
        
    }

}

}