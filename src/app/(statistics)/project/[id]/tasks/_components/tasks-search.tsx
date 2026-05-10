"use client";

import Input from "@/shared/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  const [localSearch, setLocalSearch] = useState(currentSearch);

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const prevSearch = searchParams.get("search") ?? "";

      if (localSearch.trim() !== prevSearch) {
        params.set("page", "1");
      }

      if (localSearch.trim()) {
        params.set("search", localSearch.trim());
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timeout);
  }, [localSearch]); //

  return (
    <Input
      type="search"
      className="py-4"
      parentClassName="mt-5"
      placeholder="Search tasks..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
    />
  );
}
