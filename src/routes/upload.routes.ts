import { Request, Response, Router } from "express";

import { upload } from "../config/multer";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/upload', authMiddleware, upload.single('image'), (req: Request, res: Response) => {
    res.json({
        message: 'Slika prosla batkeee',
        file: req.file,
    })
});

export default router;