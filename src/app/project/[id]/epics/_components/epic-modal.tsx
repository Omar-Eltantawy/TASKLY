import { formatDate } from "@/app/project/_components/project-card";
import { Epic } from "@/shared/lib/types/epic";
import Button from "@/shared/ui/button";
import EpicIdIcon from "../../../../../../public/icons/epic-id.svg";
import DateIcon from "../../../../../../public/icons/calender.svg";
import Image from "next/image";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import EpicTasks from "./epic-tasks";

type Props = {
  epic: Epic | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
};

export default function EpicModal({ epic, loading, error, onClose }: Props) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#041B3C33]/90 blur-2xl z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-[95%] md:max-w-[60%] lg:max-w-[40%] max-h-[90vh] overflow-y-auto
            shadow-[0_48px_24px_0_#041B3C1A] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-6 h-6 border-2 border-primary border-t-transparent
                rounded-full animate-spin"
              />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 px-6">
              <p className="text-error text-sm text-center">{error}</p>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          )}

          {/* Content */}
          {epic && !loading && (
            <>
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-[#F1F3FF]">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-xs font-bold text-slate-500 px-2 py-1 rounded-sm flex items-center gap-1">
                    <Image
                      src={EpicIdIcon}
                      height={14}
                      width={14}
                      alt="epic-id-icon"
                    />
                    {epic.epic_id}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 mt-2">
                    {epic.title}
                  </h2>
                </div>

                {/* Close button */}
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors shrink-0"
                >
                  x
                </Button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-6">
                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {epic.description ?? "No description provided."}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-14  ">
                  {/* Created By */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
                      Created By
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-xl font-bold flex items-center justify-center",
                          "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm",
                          "bg-primary-container text-[#FDFDFD]",
                        )}
                      >
                        {getNameInitials(epic.created_by.name)}
                      </span>
                      <p className="text-xs md:text-sm  font-medium text-gray-900">
                        {epic.created_by.name}
                      </p>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
                      Assignee
                    </p>
                    {epic.assignee?.name ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded-xl font-bold flex items-center justify-center",
                            "w-7 h-7 sm:w-8 sm:h-8  sm:text-sm",
                            "bg-[#CDDDFF] text-[#51617E]",
                          )}
                        >
                          {getNameInitials(epic?.assignee?.name)}
                        </span>
                        <p className="text-xs md:text-sm font-medium text-gray-900">
                          {epic.assignee.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-medium font-bold">
                        Unassigned
                      </p>
                    )}
                  </div>

                  {/* Created At */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#041B3C66]  mb-2">
                      Created At
                    </p>
                    <p className="text-sm text-slate-dark font-medium flex items-center gap-1">
                      <Image
                        src={DateIcon}
                        height={14}
                        width={14}
                        alt="calender-icon"
                      />
                      {formatDate(epic.created_at)}
                    </p>
                  </div>
                </div>

                {/* Epic Tasks — empty state */}
                {/* <div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg  font-bold text-slate-dark mb-3 mt-5">
                      Tasks
                    </p>
                    <p className="text-sm font-semibold text-primary-container mb-3 mt-5 flex items-center gap-1 cursor-pointer">
                      <Image
                        src={AddIcon}
                        height={13}
                        width={13}
                        alt="add-tasks-icon"
                      />
                      Add Tasks
                    </p>
                  </div>
                  <div
                    className="bg-surface-low border border-dashed border-gray-200 rounded-sm
                    py-10 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="bg-[#D7E2FF] p-4 rounded-md">
                      <Image
                        src={ListIcon}
                        height={16}
                        width={16}
                        alt="calender-icon"
                      />
                    </div>
                    <p className="text-1rem text-slate-dark font-bold text-center">
                      No tasks have been added to this epic yet.
                    </p>
                    <Button className="text-sm">+ Add Task</Button>
                  </div>
                </div> */}
                <EpicTasks epic={epic} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
