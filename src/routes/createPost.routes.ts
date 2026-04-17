import { Router } from "express";

import { upload } from "../config/multer";
import { createPost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-post", authMiddleware, upload.single("image"), createPost);

export default router;
