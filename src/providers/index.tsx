import React from "react";
import ReduxProvider from "./components/redux-provider";
import { getUserAction } from "@/shared/lib/actions/get-user.action";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getUserAction();
  const user = "user_metadata" in res ? res.user_metadata : null;
  return <ReduxProvider user={user}>{children}</ReduxProvider>;
}
