import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Test ruta radi sa rubi");
});

router.get("/maca", (req: Request, res: Response) => {
  res.send("Test maca Rubi radi");
});

export default router;
