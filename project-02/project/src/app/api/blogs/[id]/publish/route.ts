import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToDB from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import { authOptions } from "../../../auth/[...nextauth]/route";

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

    // Check if the authenticated user is the author or an admin
    if (
      blog.author.toString() !== (session.user as any)._id.toString() &&
      (session.user as any).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Toggle the status
    blog.status = blog.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
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
