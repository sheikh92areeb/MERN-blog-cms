import { MetadataRoute } from "next";
import  connectToDB  from "@/lib/db";
import Blog from "@/lib/models/blog.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDB();
  const blogs = await Blog.find({ status: "PUBLISHED" });

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
