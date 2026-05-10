import React from "react";
import LayoutWrapper from "./project/_components/layout-wrapper";
import TaskModalGlobal from "./project/[id]/tasks/_components/task-modal-global";

export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>
      {children}
      <TaskModalGlobal />
    </LayoutWrapper>
  );
}
