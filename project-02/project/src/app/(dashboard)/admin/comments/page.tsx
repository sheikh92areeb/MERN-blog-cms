import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDB from "@/lib/db";
import Comment from "@/lib/models/comment.model";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";

export default async function AdminCommentModerationPage() {
  const session = await getSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  await connectToDB();
  const comments = await Comment.find({}).populate("userId", "name email");

  // Client-side functionality for deletion will be added in a separate component.

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Comment Moderation</h1>

      {comments.length === 0 ? (
        <p>No comments to moderate.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Comment Content</th>
                <th className="py-3 px-6 text-left">Author</th>
                <th className="py-3 px-6 text-left">Blog ID</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {comments.map((comment) => (
                <tr
                  key={comment._id.toString()}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left">{comment.content}</td>
                  <td className="py-3 px-6 text-left">
                    {(comment.userId as any)?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {comment.blogId.toString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      {/* Placeholder for client-side delete */}
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
