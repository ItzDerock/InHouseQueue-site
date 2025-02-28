"use client";

import { SessionProvider } from "next-auth/react";
import AuthHeader from "./_components/AuthHeader";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthHeader />
      {/* The auth header needs to push everything down,
          so wrap in an relative container to "reset"
          the origin for future absolute containers */}
      <div className="relative">{children}</div>
    </SessionProvider>
  );
}
