import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import  connectToDB  from "@/lib/db";
import Comment from "@/lib/models/comment.model";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    const comment = await Comment.findById(params.id);

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    // Check if the authenticated user is the owner of the comment or an admin
    if (
      comment.userId.toString() !== (session.user as any)._id.toString() &&
      (session.user as any).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Comment.deleteOne({ _id: params.id });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
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
