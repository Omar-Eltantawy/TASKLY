"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getProjectLinks, GLOBAL_LINKS } from "./links";
import ArrowIcon from "../../../../public/icons/colspan-arrow.svg";
import LogoutArrowIcon from "../../../../public/icons/logout-arrow.svg";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { useAppSelector } from "@/store/hooks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const { projectId } = useAppSelector((state) => state.activeProject);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const sidebarWidth = collapsed ? "w-[68px]" : "w-[220px]";

  const isInsideProject = pathname.startsWith("/project/");
  const projectLinks =
    projectId && isInsideProject ? getProjectLinks(projectId) : [];
  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center lg:hidden z-40">
          {GLOBAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center text-xs"
            >
              <Image src={link.icon} alt={link.label} width={16} height={16} />
              <span className="text-[.65rem]">{link.label}</span>
            </Link>
          ))}
          {projectLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center text-xs"
            >
              <Image src={link.icon} alt={link.label} width={16} height={16} />
              <span className="text-[.65rem]">{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-[#F1F3FF]  border-gray-800 flex flex-col transition-all duration-300 lg:relative lg:translate-x-0 lg:z-auto",
          sidebarWidth,
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Nav links */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
          {GLOBAL_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  isActive ? "bg-white text-primary" : "text-[#041B3C]",
                )}
                title={collapsed ? link.label : undefined}
              >
                <span className="shrink-0">
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    width={16}
                    height={16}
                  />
                </span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
          {projectLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  isActive ? "bg-white text-primary" : "text-[#041B3C]",
                )}
                title={collapsed ? link.label : undefined}
              >
                <span className="shrink-0">
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    width={16}
                    height={16}
                  />
                </span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "hidden lg:flex items-center gap-2 px-3 py-4 border-t border-gray-100 text-slate-dark cursor-pointer transition-colors text-sm font-medium",
            collapsed ? "justify-center" : "",
          )}
        >
          <Image
            src={ArrowIcon}
            alt="Collapse"
            width={10}
            height={10}
            className={cn(
              "transition-transform duration-300",
              collapsed ? "rotate-180" : "",
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
        {/* Logout */}

        <button
          className={cn(
            "flex items-center gap-2 text-error p-3 text-sm cursor-pointer",
            collapsed ? "justify-center" : "",
          )}
        >
          <Image src={LogoutArrowIcon} alt="Logout" width={18} height={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </aside>
    </>
  );
}
