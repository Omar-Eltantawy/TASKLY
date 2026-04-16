import { getProjectsAction } from "@/shared/lib/actions/get-projects.action";
import ProjectsList from "./_components/projects-list";
import ProjectError from "./_components/project-error";
import { redirect } from "next/navigation";

export default async function Home() {
  const res = await getProjectsAction();
  if (!res.success) {
    if (res.status === 401) {
      redirect("/login");
    } else {
      return <ProjectError />;
    }
  }

  return (
    <div className=" flex flex-col  flex-1 items-center  justify-center py-28 md:py-20 lg:py-18  ">
      <div>
        <ProjectsList projects={res.projects} />
      </div>
    </div>
  );
}
