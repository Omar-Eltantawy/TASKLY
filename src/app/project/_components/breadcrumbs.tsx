"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BreadcurumbArrow from "../../../../public/icons/breadcrumbs.svg";
import { useAppSelector } from "@/store/hooks";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { projectId, projectName } = useAppSelector(
    (state) => state.activeProject,
  );

  const allPaths = pathname.split("/").filter(Boolean);
  const startIndex = allPaths.indexOf("project");
  const paths = startIndex !== -1 ? allPaths.slice(startIndex) : allPaths;

  const buildHref = (index: number) => {
    return "/" + paths.slice(0, index + 1).join("/");
  };

  const getLabel = (segment: string) => {
    if (projectId && segment === projectId && projectName) {
      return projectName;
    }
    return decodeURIComponent(segment).split("-").join(" ");
  };

  return (
    <nav className="text-xs text-[#43465499] uppercase font-bold mb-3">
      <ul className="flex items-center gap-2">
        <li>
          <Link href="/project" className="hover:text-black">
            Project
          </Link>
        </li>

        {paths.map((segment, index) => {
          if (segment === "project") return null;

          return (
            <li key={segment} className="flex items-center gap-2">
              <Image src={BreadcurumbArrow} alt="arrow" height={5} width={5} />
              <Link
                href={buildHref(index)}
                className="text-primary hover:text-primary-container"
              >
                {getLabel(segment)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
