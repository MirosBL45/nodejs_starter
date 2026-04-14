import { Router, Request, Response } from "express";

const router = Router();

router.get("/params-test/:id", (req: Request, res: Response) => {
  console.log("PARAMS: ", req.params);
  res.json(req.params);
});

export default router;
