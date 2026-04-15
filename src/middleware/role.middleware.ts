import { NextFunction, Response } from "express";

import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Zabranjeno buraz",
      });
    }

    next();
  };
};
