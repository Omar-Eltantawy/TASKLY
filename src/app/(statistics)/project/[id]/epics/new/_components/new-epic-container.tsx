"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectMembers } from "@/store/features/active-project/slice";
import NewEpicForm from "./new-epic-form";

export default function NewEpicContainer() {
  const dispatch = useAppDispatch();
  const { members, projectId } = useAppSelector((state) => state.activeProject);

  useEffect(() => {
    if (members.length === 0 && projectId) {
      dispatch(fetchProjectMembers(projectId));
    }
  }, [members, projectId, dispatch]);

  return <NewEpicForm members={members} projectId={projectId!} />;
}
