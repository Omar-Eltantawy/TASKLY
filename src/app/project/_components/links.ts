import ProjectsIcon from "../../../../public/icons/projects.svg";
import ProjectEpicsIcon from "../../../../public/icons/project-epics.svg";
import ProjectTaskIcon from "../../../../public/icons/project-tasks.svg";
import MemberIcon from "../../../../public/icons/members.svg";
import DetailsIcon from "../../../../public/icons/details.svg";

type SidebarLink = {
  label: string;
  href: string;
  icon: string;
};

export const SIDEBARLINKS: SidebarLink[] = [
  {
    label: "Projects",
    href: "/",
    icon: ProjectsIcon,
  },
  {
    label: "Project Ecips",
    href: "/project-ecips",
    icon: ProjectEpicsIcon,
  },
  {
    label: "Project Tasks",
    href: "/projects-tasks",
    icon: ProjectTaskIcon,
  },
  {
    label: "Project Members",
    href: "/project-members",
    icon: MemberIcon,
  },
  {
    label: "Project Details",
    href: "/project-details",
    icon: DetailsIcon,
  },
];
