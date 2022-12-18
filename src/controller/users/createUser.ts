import { Request, Response } from "express";
import { DB } from "../../db/db";
import { User } from "../../app/models/user";

export class CreateUser {
  execute(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = new User(name, email.toLowerCase(), password);
    DB.userDb.push(user);
    return res.status(200).send("Login criado com sucesso!");
  }
}
