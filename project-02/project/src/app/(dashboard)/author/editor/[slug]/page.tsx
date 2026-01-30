"use client";

import Tiptap from "@/components/editor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IBlog } from "@/lib/models/blog.model";

export default function EditBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${params.slug}`);
        setBlog(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [params.slug]);

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    if (!blog) return;
    setIsSubmitting(true);
    try {
      const response = await axios.put(`/api/blogs/${blog._id}`, {
        title,
        content,
        status,
      });
      router.push(`/blog/${response.data.slug}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Edit Blog</h1>
      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Tiptap content={content} onChange={handleContentChange} />
        <div className="flex space-x-2">
          <Button
            onClick={() => handleSubmit("DRAFT")}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit("PUBLISHED")} disabled={isSubmitting}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
