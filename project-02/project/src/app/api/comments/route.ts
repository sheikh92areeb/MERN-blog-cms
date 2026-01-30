import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import  connectToDB  from "@/lib/db";
import Comment from "@/lib/models/comment.model";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const body = await req.json();
    const { blogId, content, parentId } = body;

    if (!blogId || !content) {
      return NextResponse.json(
        { message: "Blog ID and content are required" },
        { status: 400 }
      );
    }

    const newComment = new Comment({
      blogId,
      userId: (session.user as any)._id,
      content,
      parentId: parentId || null,
    });

    await newComment.save();

    return NextResponse.json(newComment, { status: 201 });
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
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ blogId })
      .populate("userId", "name image")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
