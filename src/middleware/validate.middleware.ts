import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation error човеče",
      errors: error.errors,
    });
  }
};
