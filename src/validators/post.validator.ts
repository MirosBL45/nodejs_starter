import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Naslov mora imati minimum 3 karaktera"),
  content: z.string().min(10, "Content mora imati minimum 10 karaktera"),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
});
