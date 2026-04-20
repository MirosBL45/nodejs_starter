import { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

import { AuthRequest } from "../middleware/auth.middleware";
import { Post } from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  const { title, content } = req.body;

  const numberOfWords = content.split(" ").length;
  const onlyLetters = content.match(/[a-zA-Z\u0080-\u024F]/g)?.length || 0;
  const readingTime = Math.ceil(numberOfWords / 30);

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

export const getSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Nevalidan ID buraz",
    });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post ga nema prike",
    });
  }

  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  const { id } = req.params;

  // ✅ 1. VALIDACIJA ID-a
  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Nevalidan ID torima",
    });
  }

  const post = await Post.findById(id);

  // ✅ 2. POST POSTOJI?
  if (!post) {
    return res.status(404).json({
      message: "Post ne postoji prike",
    });
  }

  // ✅ 3. VLASNIŠTVO
  if (post.userId.toString() !== authReq.user?.userId) {
    return res.status(403).json({
      message: "Nije tvoj post buraz",
    });
  }

  const { title, content } = req.body;

  // ✅ 4. UPDATE samo ako postoji vrednost
  if (title) {
    post.title = title;
  }

  if (content) {
    post.content = content;

    // 🔥 recalculation samo ako se content menja
    const numberOfWords = content.split(" ").length;
    const onlyLetters = content.match(/[a-zA-Z\u0080-\u024F]/g)?.length || 0;

    post.readingTime = Math.ceil(numberOfWords / 30);
    post.numberOfWords = numberOfWords;
    post.onlyLetters = onlyLetters;
  }

  // ✅ 5. UPDATE SLIKE (opciono)
  if (req.file) {
    post.image = req.file.path;
  }

  await post.save();

  res.json({
    message: "Post promenjen, bravo prike",
    data: post,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  const { id } = req.params;

  // 1. validacija ID-a
  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Nevalidan ID batke",
    });
  }

  const post = await Post.findById(id);

  // 2. da li post postoji
  if (!post) {
    return res.status(404).json({
      message: "Post ne postoji sine",
    });
  }

  // 3. samo vlasnik može da briše
  if (post.userId.toString() !== authReq.user?.userId) {
    return res.status(403).json({
      message: "Niej tvoj post da tako ide",
    });
  }

  // 4. obriši sliku sa diska ako postoji
  if (post.image) {
    const imagePath = path.resolve(post.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  // 5. obriši post iz baze
  await post.deleteOne();

  res.json({
    message: "Post i slika obrisani prike",
  });
};
