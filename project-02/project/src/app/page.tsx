import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "@/components/ui/SkeletonLoader"; // Import SkeletonLoader
import { IBlog } from "@/lib/models/blog.model";

// Simulate a delay for demonstration purposes
const fetchBlogsWithDelay = async (): Promise<IBlog[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};

export default async function Home() {
  let blogs: IBlog[] = [];
  let loadingError: string | null = null;

  try {
    blogs = await fetchBlogsWithDelay();
  } catch (error: any) {
    loadingError = error.message;
    console.error("Failed to load blogs:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold text-center">Latest Blogs</h1>

      {loadingError ? (
        <div className="text-center text-red-500">{loadingError}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center">No published blogs yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id as any}>
              <div className="block rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300">
                {blog.coverImage ? (
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-500">
                    No Cover Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-3">
                    By {blog.author ? (blog.author as any).name : "Unknown"} on{" "}
                    {new Date(blog.createdAt as any).toLocaleDateString()}
                  </p>
                  <div
                    className="text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
