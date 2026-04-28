"use client";
import Image from "next/image";
import Button from "@/shared/ui/button";
import AddIcon from "../../../../../../public/icons/add-tasks.svg";
import ListIcon from "../../../../../../public/icons/list.svg";
import { useEffect, useState } from "react";
import { Task } from "@/shared/lib/types/task";
import { Epic } from "@/shared/lib/types/epic";
import { getEpicTasksAction } from "@/shared/lib/actions/get-epic-tasks.action";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { formatDate } from "@/app/project/_components/project-card";
import CheckedIcon from "../../../../../../public/icons/gray-checked.svg";
import EpicTasksSkeleton from "./epic-tasks-skeleton";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function EpicTasks({ epic }: { epic: Epic }) {
  const { projectId } = useAppSelector((state) => state.activeProject);
  const [tasks, setTaskes] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!epic) return;

    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      const result = await getEpicTasksAction(epic.id);

      if (!result.success) {
        setLoading(false);
        setError(result.error);
        return;
      }

      setLoading(false);
      setTaskes(result.tasks);
    };

    fetchTasks();
  }, [epic]);

  if (loading) return <EpicTasksSkeleton />;

  if (error)
    return (
      <p className="text-sm text-error text-center py-4">
        Failed to load tasks.
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-slate-dark mb-3 mt-5">Tasks</p>
        <Link
          href={`/project/${projectId}/tasks/new?epicId=${epic.id}`}
          className="text-sm font-semibold text-primary-container mb-3 mt-5 flex items-center gap-1 cursor-pointer"
        >
          <Image src={AddIcon} height={13} width={13} alt="add-tasks-icon" />
          Add Tasks
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="flex flex-col">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-[auto_1fr_auto] gap-4 items-center px-3 py-3 border-b border-[#F1F3FF] last:border-0 hover:bg-gray-50 transition-colors"
            >
              <Image
                src={CheckedIcon}
                alt="checkedIcon"
                width={20}
                height={20}
              />
              <div className="min-w-0">
                <p className="text-[1rem] font-medium text-slate-dark truncate">
                  {task.title}
                </p>
                {/* Assignee */}
                {task.assignee.name ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[.5rem] font-semibold shrink-0">
                      {getNameInitials(task.assignee.name)}
                    </div>
                    <span className="text-xs text-[#041B3C99] whitespace-nowrap">
                      {task.assignee.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-medium shrink-0">
                    Unassigned
                  </span>
                )}
              </div>

              {/* Due date */}
              <div className="text-[#041B3C66] text-[.625rem] flex flex-col font-bold">
                DUE DATE
                <span className="text-xs text-[#041B3CB2] whitespace-nowrap shrink-0">
                  {task.due_date ? formatDate(task.due_date) : "No due date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-low border border-dashed border-gray-200 rounded-sm py-10 flex flex-col items-center justify-center gap-4">
          <div className="bg-[#D7E2FF] p-4 rounded-md">
            <Image src={ListIcon} height={16} width={16} alt="calender-icon" />
          </div>
          <p className="text-1rem text-slate-dark font-bold text-center">
            No tasks have been added to this epic yet.
          </p>
          <Button className="text-sm">+ Add Task</Button>
        </div>
      )}
    </div>
  );
}
