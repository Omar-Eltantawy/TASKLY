import ProjectsIcon from "../../../../public/icons/projects.svg";
import ProjectEpicsIcon from "../../../../public/icons/project-epics.svg";
import ProjectTaskIcon from "../../../../public/icons/project-tasks.svg";
import MemberIcon from "../../../../public/icons/members.svg";
import DetailsIcon from "../../../../public/icons/details.svg";

export type SidebarLink = {
  label: string;
  href: string;
  icon: string;
};

export const GLOBAL_LINKS: SidebarLink[] = [
  {
    label: "Projects",
    href: "/project",
    icon: ProjectsIcon,
  },
];

export function getProjectLinks(projectId: string): SidebarLink[] {
  return [
    {
      label: "Epics",
      href: `/project/${projectId}/epics`,
      icon: ProjectEpicsIcon,
    },
    {
      label: "Tasks",
      href: `/project/${projectId}/tasks`,
      icon: ProjectTaskIcon,
    },
    {
      label: "Members",
      href: `/project/${projectId}/members`,
      icon: MemberIcon,
    },
    {
      label: "Details",
      href: `/project/${projectId}/edit`,
      icon: DetailsIcon,
    },
  ];
}
