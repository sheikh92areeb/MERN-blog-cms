import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IComment extends Document {
  blogId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  parentId?: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = models.Comment || model<IComment>("Comment", commentSchema);

export default Comment;
