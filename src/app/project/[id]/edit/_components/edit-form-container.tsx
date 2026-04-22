"use client";

import { useAppSelector } from "@/store/hooks";
import EditProjectForm from "./edit-project-form";
import Button from "@/shared/ui/button";
import Image from "next/image";
import addMemberIcon from "../../../../../../public/icons/add-member.svg";

export default function EditFormContainer() {
  const project = useAppSelector((state) => state.activeProject);
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="hidden md:flex items-center justify-between mb-5 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Edit Project</h1>
        <Button className="flex items-center gap-2 text-sm">
          <Image src={addMemberIcon} alt="add member" width={16} height={16} />
          Add New Member
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 ">
        {project && (
          <EditProjectForm
            projectId={project.projectId!}
            defaultName={project.projectName!}
            defaultDescription={project.projectDescription ?? ""}
          />
        )}
      </div>
    </div>
  );
}
