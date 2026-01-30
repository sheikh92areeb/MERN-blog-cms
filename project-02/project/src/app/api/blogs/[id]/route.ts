import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToDB from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import { authOptions } from "../../auth/[...nextauth]/route";
import slugify from "slugify";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const blog = await Blog.findById(params.id).populate("author", "name image");

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check if the authenticated user is the author of the blog
    if (blog.author.toString() !== (session.user as any)._id.toString()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    blog.title = title;
    blog.content = content;
    blog.status = status;
    blog.slug = slugify(title, { lower: true, strict: true });

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

export async function DELETE(
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

    // Check if the authenticated user is the author or an admin
    if (
      blog.author.toString() !== (session.user as any)._id.toString() &&
      (session.user as any).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Blog.deleteOne({ _id: params.id });

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
