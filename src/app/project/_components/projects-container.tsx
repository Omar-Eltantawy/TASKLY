"use client";

import { useEffect } from "react";

import ProjectsList from "./projects-list";
import ProjectError from "./project-error";
import NoProject from "./no-project";
import ProjectsSkeleton from "./projects-skeleton";
import Pagination from "@/shared/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/features/projects/slice";
import Button from "@/shared/ui/button";
import addMemberIcon from "../../../../public/icons/add-member.svg";
import Image from "next/image";

export default function ProjectsContainer() {
  const dispatch = useAppDispatch();

  const { projects, currentPage, totalPages, loading, error } = useAppSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchProjects(1));
  }, [dispatch]);

  if (loading) return <ProjectsSkeleton />;
  if (error) return <ProjectError />;
  if (projects.length === 0) return <NoProject />;

  return (
    <>
      {/* Header */}
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

      <div className=" w-full">
        <ProjectsList projects={projects} />
        <Pagination
          totalPages={totalPages}
          onPageChange={(page) => dispatch(fetchProjects(page))}
          disabled={loading}
        />
      </div>
    </>
  );
}
