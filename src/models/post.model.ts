import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  image: string;
  userId: string;
  readingTime: number;
  numberOfWords: number;
  onlyLetters: number;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    readingTime: {
      type: Number,
    },
    numberOfWords: {
      type: Number,
    },
    onlyLetters: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
