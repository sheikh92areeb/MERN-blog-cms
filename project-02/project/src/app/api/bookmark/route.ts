import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToDB from "@/lib/db";
import Bookmark from "@/lib/models/bookmark.model";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const body = await req.json();
    const { blogId } = body;

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any)._id;

    const existingBookmark = await Bookmark.findOne({ userId, blogId });

    if (existingBookmark) {
      await Bookmark.deleteOne({ userId, blogId });
      return NextResponse.json(
        { message: "Bookmark removed" },
        { status: 200 }
      );
    } else {
      const newBookmark = new Bookmark({
        userId,
        blogId,
      });
      await newBookmark.save();
      return NextResponse.json(
        { message: "Blog bookmarked" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const userId = (session.user as any)._id;
    const bookmarks = await Bookmark.find({ userId }).populate("blogId");

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
