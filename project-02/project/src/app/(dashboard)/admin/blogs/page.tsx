import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDB from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default async function AdminBlogModerationPage() {
  const session = await getSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  await connectToDB();
  const blogs = await Blog.find({}).populate("author", "name image");

  // Client-side functionality for deletion/publishing will be added in a separate component.

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Blog Moderation</h1>

      {blogs.length === 0 ? (
        <p>No blogs to moderate.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id.toString()}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600">
                By {blog.author ? (blog.author as any).name : "Unknown"} on{" "}
                {new Date(blog.createdAt as any).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Status: {blog.status}</p>
              <div className="mt-4 space-x-2">
                <Link href={`/blog/${blog.slug}`}>
                  <Button>
                    View
                  </Button>
                </Link>
                {/* Placeholder for client-side delete/publish toggle */}
                <Button>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
