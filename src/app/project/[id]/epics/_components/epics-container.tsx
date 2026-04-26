"use client";

import {
  clearSelectedEpic,
  fetchEpicDetails,
  fetchEpics,
} from "@/store/features/epics/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import EpicCard from "./epic-card";
import EpicCardSkeleton from "./epic-card-skeleton";
import ProjectError from "@/app/project/_components/project-error";
import NoEpics from "./no-epics";
import Image from "next/image";
import Button from "@/shared/ui/button";
import addEpicIcon from "../../../../../../public/icons/add.svg";
import Pagination from "@/shared/ui/pagination";
import EpicModal from "./epic-modal";

export default function EpicsContainer({ projectId }: { projectId: string }) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    epics,
    loading,
    error,
    currentPage,
    totalPages,
    selectedEpic,
    detailError,
    detailLoading,
  } = useAppSelector((state) => state.epics);

  useEffect(() => {
    if (!projectId) return;

    dispatch(fetchEpics({ projectId, page: currentPage }));
  }, [projectId, currentPage, dispatch]);

  const handleShowModal = async (epicId: string) => {
    setIsOpenModal(true);
    dispatch(fetchEpicDetails({ projectId, epicId }));
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    dispatch(clearSelectedEpic());
  };

  if (error) return <ProjectError />;

  return (
    <>
      {!loading && epics?.length === 0 && <NoEpics />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 pb-20">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <EpicCardSkeleton key={i} />)}

        {!loading &&
          epics?.length > 0 &&
          epics.map((epic) => (
            <EpicCard
              onClick={() => handleShowModal(epic.id)}
              key={epic.id}
              epic={epic}
            />
          ))}
        <Button className="w-10 h-10 ms-auto p-0 flex md:hidden items-center justify-center mt-10">
          <Image src={addEpicIcon} alt="add epic" width={20} height={20} />
        </Button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          console.log(page);

          dispatch(fetchEpics({ projectId, page }));
        }}
        disabled={loading}
      />
      {isOpenModal && selectedEpic && (
        <EpicModal
          epic={selectedEpic}
          loading={detailLoading}
          error={detailError}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
