import NoProject from "./no-project";
import ProjectCard from "./project-card";
import Link from "next/link";
import Button from "@/shared/ui/button";
import addMemberIcon from "../../../../public/icons/add-member.svg";
import addProjectIcon from "../../../../public/icons/add-project.svg";
import addProjectIcon2 from "../../../../public/icons/add.svg";
import Image from "next/image";
import Pagination from "@/shared/ui/pagination";
import { getProjectsAction } from "@/shared/lib/actions/get-projects.action";
import ProjectError from "./project-error";
import { redirect } from "next/navigation";

export default async function ProjectsList() {
  const res = await getProjectsAction();
  if (!res.success) {
    if (res.status === 401) {
      redirect("/login");
    } else {
      return <ProjectError />;
    }
  }
  if (res.projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <NoProject />
      </div>
    );
  }

  const visibleProjects = res.projects.slice(0, 5);

  return (
    <>
      <div className="flex items-center justify-between mb-5 -mt-20">
        <div>
          <h1 className="text-[2.3rem] font-semibold">Projects</h1>
          <p className="text-1rem text-[#434654]">
            Manage and curate your projects
          </p>
        </div>
        <Button className="hidden md:flex items-center gap-2 text-sm">
          <Image src={addMemberIcon} alt="add member" width={16} height={16} />
          Add New Member
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Show max 5 projects */}
        {visibleProjects.map((project) => (
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
      <Pagination />
    </>
  );
}
