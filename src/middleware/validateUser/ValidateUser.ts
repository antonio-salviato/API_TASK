import { Request, Response, NextFunction } from "express";

export class ValidateDataUserMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-mail e/ou senha obrigaórios." });
    }
    return next();
  }
}
