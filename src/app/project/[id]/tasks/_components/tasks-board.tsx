"use client";

import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";

import { STATUS_LABELS, TASK_STATUSES } from "@/shared/lib/constants/constants";
import { useAppDispatch } from "@/store/hooks";
import { openTaskModal } from "@/store/features/ui/slice";

import BoardColumn from "./board-column";
import BoardTaskCard from "./board-task-card";
import { Toast } from "@/shared/ui/toast";
import { useTasksBoard } from "../_hooks/use-tasks-board";

export default function TasksBoard({ projectId }: { projectId: string }) {
  const dispatch = useAppDispatch();

  const {
    tasksMap,
    loading,
    activeTask,
    toast,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useTasksBoard(projectId);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 h-full overflow-auto pb-4">
          {TASK_STATUSES.map((status) => (
            <BoardColumn
              key={status}
              projectId={projectId}
              status={status}
              label={STATUS_LABELS[status]}
              tasks={tasksMap[status]}
              loading={loading}
              onTaskClick={(taskId) =>
                dispatch(openTaskModal({ taskId, projectId }))
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="rotate-2 opacity-90 shadow-xl">
              <BoardTaskCard task={activeTask} onClick={() => {}} isDragging />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
