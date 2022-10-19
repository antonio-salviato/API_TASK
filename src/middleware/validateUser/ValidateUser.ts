import { Request, Response, NextFunction } from "express";

export class ValidateCreatedUserMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }
    return next();
  }
}
