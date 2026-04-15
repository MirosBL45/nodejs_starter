import { Request, Response, Router } from "express";

const router = Router();

router.get("/query-test", (req: Request, res: Response) => {
  console.log("QUERY: ", req.query);
  res.json(req.query);
});

export default router;
