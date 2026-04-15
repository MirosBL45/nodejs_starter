import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Sine nemas token");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Los format tokena buraz");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Nemas token lepi");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Nemas pristup bajo",
      greska: error,
    });
  }
};
