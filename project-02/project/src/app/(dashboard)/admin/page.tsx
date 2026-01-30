import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default async function AdminDashboardPage() {
  const session = await getSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/users">
          <div className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="mb-2 text-xl font-semibold">User Management</h2>
            <p className="text-gray-600">Manage all users and their roles.</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/blogs">
          <div className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="mb-2 text-xl font-semibold">Blog Moderation</h2>
            <p className="text-gray-600">Review and moderate all blog posts.</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/comments">
          <div className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="mb-2 text-xl font-semibold">Comment Moderation</h2>
            <p className="text-gray-600">Review and moderate all comments.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
