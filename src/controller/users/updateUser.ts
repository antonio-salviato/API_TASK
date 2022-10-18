import { Request, Response } from "express";
import { DB } from "../../db/db";

export class EditUser {
  execute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = DB.userDb.find((user) => user.id === id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
     
      const index = DB.userDb.findIndex((user) => user.id === id);
      DB.userDb[index] = user;
      return res.status(200).json({ data: user });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
