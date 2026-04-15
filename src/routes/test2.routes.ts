import { Request, Response, Router } from "express";

import { registerUser } from "../controllers/auth.controller";
import { loginUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { registerSchema } from "../validators/register.schema";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Srecko lepi");
});

router.get("/beli", (req: Request, res: Response) => {
  res.send("Beli macak je  lepi macak");
});

// router.post('/register', validate(registerSchema), (req, res) => {
//     console.log('BODY', req.body);
//     res.send('Dobra validacija')
// });

// router.post('/register', validate(registerSchema), registerUser);
router.post("/register", validate(registerSchema), asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: "Ovo vidi samo ulogovan bratic",
  });
});

router.get("/admin-only", authMiddleware, roleMiddleware(["admin"]), (res: Response, req: Request) => {
  res.json({
    message: "Samo admin vidi sine",
  });
});

export default router;
