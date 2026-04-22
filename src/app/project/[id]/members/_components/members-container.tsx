"use client";

import { fetchProjectMembers } from "@/store/features/active-project/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MembersSkeleton from "./member-skeleton";
import MembersList from "./members-list";
import ProjectError from "@/app/project/_components/project-error";

export default function MembersContainer() {
  const dispatch = useAppDispatch();
  const { projectId, members, membersLoading, membersError } = useAppSelector(
    (state) => state.activeProject,
  );
  const router = useRouter();
  useEffect(() => {
    if (!projectId) return;
    dispatch(fetchProjectMembers(projectId)).then((action) => {
      if (fetchProjectMembers.rejected.match(action)) {
        const paylaod = action.payload as { status?: number } | undefined;
        if (paylaod?.status === 401) router.push("/login");
      }
    });
  }, [projectId, dispatch, router]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0 ">
      {membersLoading ? (
        <MembersSkeleton />
      ) : membersError ? (
        <ProjectError />
      ) : (
        <MembersList members={members} />
      )}
    </div>
  );
}
