import { Request, Response, Router } from "express";

const router = Router();

router.post("/body-test", (req: Request, res: Response) => {
  console.log("BODY: ", req.body);
  res.json(req.body);
});

export default router;
