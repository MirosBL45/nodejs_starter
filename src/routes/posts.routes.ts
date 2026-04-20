import { Router } from "express";

import { upload } from "../config/multer";
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPostSchema, updatePostSchema } from "../validators/post.validator";

const router = Router();

router.post("/create-post", authMiddleware, upload.single("image"), validate(createPostSchema), createPost);

router.get("/get-posts", getPosts);

router.get("/post/:id", getSinglePost);

router.put("/post/:id", authMiddleware, upload.single("image"), validate(updatePostSchema), updatePost);

router.delete("/post/:id", authMiddleware, deletePost);

export default router;
