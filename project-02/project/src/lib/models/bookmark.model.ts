import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBookmark extends Document {
  userId: Schema.Types.ObjectId;
  blogId: Schema.Types.ObjectId;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  { timestamps: true }
);

const Bookmark = models.Bookmark || model<IBookmark>("Bookmark", bookmarkSchema);

export default Bookmark;
