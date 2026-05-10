"use client";

import { useAppSelector } from "@/store/hooks";
import EditProjectForm from "./edit-project-form";

export default function EditFormContainer() {
  const project = useAppSelector((state) => state.activeProject);
  return (
    <div className="flex-1 overflow-y-auto min-h-0 ">
      {project && (
        <EditProjectForm
          projectId={project.projectId!}
          defaultName={project.projectName!}
          defaultDescription={project.projectDescription ?? ""}
        />
      )}
    </div>
  );
}
