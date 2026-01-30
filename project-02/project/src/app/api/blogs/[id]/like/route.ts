import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const userId = (session.user as any)._id;

    if (blog.likes.includes(userId)) {
      // Unlike the blog
      blog.likes = blog.likes.filter(
        (id: any) => id.toString() !== userId.toString()
      );
    } else {
      // Like the blog
      blog.likes.push(userId);
    }

    await blog.save();

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
