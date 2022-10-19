import { Request, Response, NextFunction } from "express";
import { DB } from "../../db/db";
import { User } from "../../models/user";


export class ValidateEmailMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {

    const { email } = req.body;
    const user = DB.userDb.find((user: User) => user.email === email);
    

    if (user) {
      return res.status(400).json({ message: "E-mail já foi usado!" });
    }
    return next();
  }
}