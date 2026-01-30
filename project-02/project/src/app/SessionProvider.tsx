"use client";

import { SessionProvider as NextAuthSessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/authSlice";

function AuthSessionHandler({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        login({
          _id: (session.user as any)._id,
          name: session.user.name,
          email: session.user.email,
          role: (session.user as any).role,
          image: session.user.image,
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AuthSessionHandler>{children}</AuthSessionHandler>
    </NextAuthSessionProvider>
  );
}
