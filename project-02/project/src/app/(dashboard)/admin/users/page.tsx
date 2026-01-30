import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDB from "@/lib/db";
import User from "@/lib/models/user.model";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";

export default async function UserManagementPage() {
  const session = await getSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  await connectToDB();
  const users = await User.find({});

  // Client-side functionality will be added in a separate component for reusability and interactivity.
  // This page focuses on fetching and passing initial data.

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr key={user._id.toString()} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    {/* Placeholder for client-side actions */}
                    <Button>
                      Edit Role
                    </Button>
                    <Button>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
