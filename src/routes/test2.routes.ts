import { Router, Request, Response } from "express";
import { validate } from "../middleware/validate.middleware";
import { registerSchema } from "../validators/register.schema";
import { registerUser } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Srecko lepi');
});

router.get('/beli', (req: Request, res: Response) => {
    res.send('Beli macak je  lepi macak');
});

// router.post('/register', validate(registerSchema), (req, res) => {
//     console.log('BODY', req.body);
//     res.send('Dobra validacija')
// });

// router.post('/register', validate(registerSchema), registerUser);
router.post("/register", validate(registerSchema), asyncHandler(registerUser));

export default router;