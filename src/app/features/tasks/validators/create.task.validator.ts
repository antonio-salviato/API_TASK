import { Request, Response, NextFunction } from "express";

export class CreateTaskValidator {
  validate(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;

    if (!task) {
      return res
        .status(400)
        .json({ message: "A tarefa não pode ser vazia" });
    }
    return next();
  }
}
