import { Request, Response } from "express";

import { User } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.create({
    email,
    password,
  });

  res.json(user);
};
