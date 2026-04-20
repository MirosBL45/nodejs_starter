import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Burazer, ide samo jedna slika",
      });
    }
  }
  console.log("ERROR bajoo", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error batice",
  });
};
