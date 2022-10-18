import { Request, Response, NextFunction } from "express";

import userDb from "../db/db";


export class ValidateUser{
execute(req: Request, res: Response, next: NextFunction){
    try {
        const {userId} = req.params
        const user = userDb.find(u => u.id === userId)
        if(!user){
            return res.status(404).json({message:'Not Found ID'})
          }
        
       
        req.user = user
        next()
       
        
    } catch (error:any) {res.status(500).send(error.message)
        
    }

}

}