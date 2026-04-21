"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BreadcurumbArrow from "../../../../public/icons/breadcrumbs.svg";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const allPaths = pathname.split("/").filter(Boolean);

  const startIndex = allPaths.indexOf("project");

  const paths = startIndex !== -1 ? allPaths.slice(startIndex) : allPaths;

  const buildHref = (index: number) => {
    return "/" + paths.slice(0, index + 1).join("/");
  };

  return (
    <nav className="text-xs text-[#43465499] uppercase font-bold mb-3">
      <ul className="flex items-center gap-2">
        {paths.map((segment, index) => (
          <>
            {segment == "project" ? null : (
              <>
                <li key={index}>
                  <Link href="/project" className="hover:text-black">
                    Project
                  </Link>
                </li>
                <li key={index} className="flex items-center gap-2">
                  <Image
                    src={BreadcurumbArrow}
                    alt="arrow"
                    height={5}
                    width={5}
                  />
                  <Link
                    href={buildHref(index)}
                    className="text-primary hover:text-primary-container "
                  >
                    {decodeURIComponent(segment).split("-").join(" ")}
                  </Link>
                </li>
              </>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
}
