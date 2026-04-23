"use client";

import { fetchEpics } from "@/store/features/epics/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import EpicCard from "./epic-card";
import EpicCardSkeleton from "./epic-card-skeleton";
import ProjectError from "@/app/project/_components/project-error";
import NoEpics from "./no-epics";
import Image from "next/image";
import Button from "@/shared/ui/button";
import addEpicIcon from "../../../../../../public/icons/add.svg";

export default function EpicsContainer({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();
  const { epics, loading, error } = useAppSelector((state) => state.epics);

  useEffect(() => {
    if (!projectId) return;

    dispatch(fetchEpics(projectId));
  }, [projectId, dispatch]);

  if (error) return <ProjectError />;

  return (
    <>
      {!loading && epics?.length === 0 && <NoEpics />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 pb-20">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <EpicCardSkeleton key={i} />)}

        {!loading &&
          epics?.length > 0 &&
          epics.map((epic) => <EpicCard key={epic.id} epic={epic} />)}
        <Button className="w-10 h-10 ms-auto p-0 flex md:hidden items-center justify-center mt-10">
          <Image src={addEpicIcon} alt="add epic" width={20} height={20} />
        </Button>
      </div>
    </>
  );
}
