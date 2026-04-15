"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { User } from "@/shared/lib/types/user";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar user={user} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
