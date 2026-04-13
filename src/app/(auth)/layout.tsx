import React from "react";
import AuthHeader from "./_components/auth-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <AuthHeader />
      {children}
    </main>
  );
}
