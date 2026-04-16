import Button from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";
import AddIcon from "../../../../public/icons/add.svg";
import noProjects from "../../../../public/images/no-projects.jpg";

export default function ProjectsList() {
  const projects = [];
  return (
    <div className="flex flex-col justify-center items-center gap-11">
      {projects.length === 0 ? (
        <>
          <Image
            src={noProjects}
            alt="empty projects"
            className="max-w-55 sm:max-w-65 lg:max-w-75"
          />
          <div className="text-center">
            <h2 className="text-[2.3rem] font-semibold">No Projects</h2>
            <p className="text-lg text-center text-[#434654] max-w-md font-normal">
              You don’t have any projects yet. Start by defining your first
              architectural workspace to begin tracking tasks and epics.
            </p>
          </div>
          <Button className="w-3/4">
            <Link
              href="/add-new-project"
              className="flex items-center justify-center gap-3"
            >
              <Image src={AddIcon} alt="plus" width={16} height={16} />
              Create New Project
            </Link>
          </Button>
        </>
      ) : null}
    </div>
  );
}
