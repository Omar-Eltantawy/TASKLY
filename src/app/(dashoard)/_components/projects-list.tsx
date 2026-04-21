import NoProject from "./no-project";
import ProjectCard from "./project-card";
import Link from "next/link";

import addProjectIcon from "../../../../public/icons/add-project.svg";
import addProjectIcon2 from "../../../../public/icons/add.svg";
import Image from "next/image";
import { Project } from "@/shared/lib/types/project";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  console.log(projects);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <Link
          href="/add-new-project"
          className="rounded-lg p-4 bg-white shadow-xs w-76 h-55 hidden md:flex flex-col items-center justify-center"
        >
          <span className=" flex items-center justify-center text-sm font-medium bg-surface-low w-10 h-10 ">
            <Image
              src={addProjectIcon}
              alt="add member"
              width={16}
              height={16}
            />
          </span>
          Add New Project
        </Link>
        <Link
          href="/add-new-project"
          className="flex items-center justify-center md:hidden bg-primary w-14 h-14  rounded-lg ms-auto"
        >
          <Image
            src={addProjectIcon2}
            alt="add project"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </>
  );
}
