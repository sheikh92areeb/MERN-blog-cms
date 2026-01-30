"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { IBlog } from "@/lib/models/blog.model";

export default function MyBlogsPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchBlogs();
    }
  }, [session]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs"); // Fetch all blogs for now, filter on client
      const userBlogs = response.data.filter(
        (blog: IBlog) => blog.author.toString() === (session?.user as any)._id.toString()
      );
      setBlogs(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        fetchBlogs(); // Refresh the list
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await axios.post(`/api/blogs/${id}/publish`);
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto p-4 text-center">
        Please login to view your blogs.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Blogs</h1>
      <div className="mb-4">
        <Link href="/dashboard/author/editor/new">
          <Button>Create New Blog</Button>
        </Link>
      </div>
      {blogs.length === 0 ? (
        <p>You haven't created any blogs yet.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id as any}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600">
                Status: {blog.status} - Views: {blog.views}
              </p>
              <div className="mt-2 space-x-2">
                <Link href={`/dashboard/author/editor/${blog._id}`}>
                  <Button>
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => handleTogglePublish(blog._id as any)}
                >
                  {blog.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  onClick={() => handleDelete(blog._id as any)}
                >
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
