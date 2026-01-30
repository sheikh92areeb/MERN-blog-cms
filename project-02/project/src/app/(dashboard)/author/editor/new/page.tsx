"use client";

import Tiptap from "@/components/editor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import slugify from "slugify";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    setIsSubmitting(true);
    try {
      const slug = slugify(title, { lower: true });
      const response = await axios.post("/api/blogs", {
        title,
        content,
        status,
        slug,
      });
      router.push(`/blog/${response.data.slug}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Create New Blog</h1>
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
