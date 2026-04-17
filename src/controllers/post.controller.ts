import { Request, Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";
import { Post } from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const numberOfWords = content.split(" ").length;
  const onlyLetters = content.match(/[a-zA-Z\u0080-\u024F]/g)?.length || 0;
  const readingTime = Math.ceil(numberOfWords / 200);

  const authReq = req as AuthRequest;

  if (!req.file) {
    throw new Error("Slika je obavezna prike");
  }

  const imagePath = req.file.path;

  const post = await Post.create({
    title,
    content,
    image: imagePath,
    userId: authReq.user.userId,
    readingTime,
    numberOfWords,
    onlyLetters,
  });

  res.json(post);
};
