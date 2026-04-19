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

export const getPosts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const search = req.query.search as string;
  const userId = req.query.userId as string;

  const query: any = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (userId) {
    query.userId = userId;
  }

  const posts = await Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

  const total = await Post.countDocuments();

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: posts,
  });
};
