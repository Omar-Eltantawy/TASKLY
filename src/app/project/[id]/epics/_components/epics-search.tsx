"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEpics, setEpicsSearch } from "@/store/features/epics/slice";
import Input from "@/shared/ui/input";

export default function EpicsSearch({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.epics.searchTerm);

  const [localValue, setLocalValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setEpicsSearch(localValue));
      dispatch(fetchEpics({ projectId, page: 1, searchTerm: localValue }));
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue, dispatch, projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
  };

  return (
    <Input
      type="search"
      placeholder="Search Epics..."
      className="py-4"
      parentClassName="mt-5"
      value={localValue}
      onChange={handleChange}
    />
  );
}
