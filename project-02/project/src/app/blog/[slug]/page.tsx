import Image from "next/image";
import { notFound } from "next/navigation";
import  connectToDB  from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import type { Metadata } from "next";
import CommentSection from "@/components/CommentSection"; // Import CommentSection

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  await connectToDB();
  const blog = await Blog.findOne({ slug: params.slug });

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectToDB();
  const blog = await Blog.findOne({ slug: params.slug }); // Fetch without populate for static data

  if (!blog) {
    notFound();
  }

  // Increment view count directly in the database (or via API if preferred)
  // For simplicity, doing it directly here. In a larger app, an API endpoint would be better.
  blog.views = (blog.views || 0) + 1;
  await blog.save();

  // Re-fetch with populate for display
  const fullBlog = await Blog.findOne({ slug: params.slug }).populate(
    "author",
    "name image"
  );

  if (!fullBlog) {
    notFound(); // Should not happen if blog was found above
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-4xl font-bold text-center">{fullBlog.title}</h1>
      <p className="text-gray-600 text-center mb-6">
        By {fullBlog.author ? (fullBlog.author as any).name : "Unknown"} on{" "}
        {new Date(fullBlog.createdAt as any).toLocaleDateString()} - Views:{" "}
        {fullBlog.views}
      </p>

      {fullBlog.coverImage && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={fullBlog.coverImage}
            alt={fullBlog.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <div
        className="prose mx-auto"
        dangerouslySetInnerHTML={{ __html: fullBlog.content }}
      ></div>

      <CommentSection blogId={fullBlog._id as any} />
    </div>
  );
}
