import { Router } from "express";

import { upload } from "../config/multer";
import { createPost, getPosts } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-post", authMiddleware, upload.single("image"), createPost);

router.get("/get-posts", getPosts);

export default router;
