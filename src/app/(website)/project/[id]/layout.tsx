import React from "react";
import ActiveProjectWrapper from "./_components/active-project-wrapper";

export default function ActiveProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ActiveProjectWrapper>{children}</ActiveProjectWrapper>;
}
