"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { setUser } from "@/features/user/slice";
import { User } from "@/shared/lib/types/user";

export default function ReduxProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  useEffect(() => {
    if (user) {
      store.dispatch(setUser(user));
    }
  }, [user]);

  return <Provider store={store}>{children}</Provider>;
}
