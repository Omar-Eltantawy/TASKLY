import { STATUS_LABELS, TASK_STATUSES } from "@/shared/lib/constants/constants";
import BoardColumn from "./board-column";

export default function TasksBoard({ projectId }: { projectId: string }) {
  return (
    <div className="flex gap-4 h-full overflow-auto scroll-smooth no-scrollbar pb-4">
      {TASK_STATUSES.map((status) => (
        <BoardColumn
          key={status}
          projectId={projectId}
          status={status}
          label={STATUS_LABELS[status]}
        />
      ))}
    </div>
  );
}
