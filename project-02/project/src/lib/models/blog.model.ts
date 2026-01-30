import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
  author: Schema.Types.ObjectId;
  tags?: string[];
  likes: Schema.Types.ObjectId[];
  views: number;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    coverImage: { type: String },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", blogSchema);

export default Blog;
