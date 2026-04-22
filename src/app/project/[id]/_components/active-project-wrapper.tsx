"use client";

import { setActiveProject } from "@/store/features/active-project/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ActiveProjectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projects = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    if (!params.projectId) return;

    const project = projects.find((p) => p.id == params.projectId);
    if (project) {
      dispatch(
        setActiveProject({
          projectId: project.id,
          projectName: project.name,
          projectDescription: project.description,
        }),
      );
    }
  }, [params.projectId, projects, dispatch]);

  return <div>{children}</div>;
}
