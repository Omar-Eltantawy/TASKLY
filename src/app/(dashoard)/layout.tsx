import React from "react";
import LayoutWrapper from "./_components/layout-wrapper";
import { getUserAction } from "@/shared/lib/actions/get-user.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getUserAction();
  console.log(result);
  let user = null;

  if ("user_metadata" in result) {
    user = result.user_metadata;
  }

  return <LayoutWrapper user={user}>{children}</LayoutWrapper>;
}
