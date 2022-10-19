import { Request, Response, NextFunction } from "express";

export class ValidateTaskMiddleware {
  ValidateData(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;

    if (!task) {
      return res
        .status(400)
        .json({ message: 'O campo "Tarefa" não pode estar vazio' });
    }
    return next();
  }
}
