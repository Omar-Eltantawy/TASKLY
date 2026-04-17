"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));

    const type = params.get("type");
    const token = params.get("access_token");

    if (type === "recovery" && token) {
      router.replace(`/reset-password?token=${token}`);
    }
  }, [router]);

  return null;
}
