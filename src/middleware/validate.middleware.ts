import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({
        message: formattedErrors[0]?.message || "Validation error",
        errors: formattedErrors,
      });
    }

    return res.status(400).json({
      message: "Validation error",
    });
  }
};
