import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToDB  from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import slugify from "slugify";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const body = await req.json();
    const { title, content, status } = body;

    if (!title || !content || !status) {
      return NextResponse.json(
        { message: "Title, content, and status are required" },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const newBlog = new Blog({
      title,
      content,
      status,
      slug,
      author: (session.user as any)._id, // Assuming _id is in session.user
    });

    await newBlog.save();

    return NextResponse.json(newBlog, { status: 201 });
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

    const blogs = await Blog.find({ status: "PUBLISHED" }).populate("author", "name image");

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
