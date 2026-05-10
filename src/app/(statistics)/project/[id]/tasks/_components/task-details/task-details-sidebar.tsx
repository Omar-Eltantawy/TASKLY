import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import { ProjectMember } from "@/shared/lib/types/project";
import { formatDate } from "@/app/(statistics)/project/_components/project-card";
import { OptionAvatar } from "./option-avatar";
import selectStyles from "./select-styles";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { STATUS_LABELS, TASK_STATUSES } from "@/shared/lib/constants/constants";

type StatusOptionType = {
  value: TaskStatus;
  label: string;
};

type AssigneeOptionType = {
  value: string;
  label: string;
  department: string;
};

// Status colors for the dot indicator
const STATUS_DOT: Record<string, string> = {
  TO_DO: "bg-gray-400",
  IN_PROGRESS: "bg-blue-500",
  BLOCKED: "bg-red-500",
  IN_REVIEW: "bg-yellow-500",
  READY_FOR_QA: "bg-purple-500",
  REOPENED: "bg-orange-500",
  READY_FOR_PRODUCTION: "bg-green-500",
  DONE: "bg-emerald-600",
};

// Custom option for status — dot + label
const StatusOption = (props: OptionProps<StatusOptionType, false>) => (
  <components.Option {...props}>
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${STATUS_DOT[props.data.value]}`} />
      <span className="text-sm">{props.data.label}</span>
    </div>
  </components.Option>
);

const StatusSingleValue = (
  props: SingleValueProps<StatusOptionType, false>,
) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${STATUS_DOT[props.data.value]}`} />
      <span className="text-sm font-medium">{props.data.label}</span>
    </div>
  </components.SingleValue>
);

const AssigneeOption = (props: OptionProps<AssigneeOptionType, false>) => (
  <components.Option {...props}>
    <OptionAvatar name={props.data.label} sub={props.data.department} />
  </components.Option>
);

const AssigneeSingleValue = (
  props: SingleValueProps<AssigneeOptionType, false>,
) => (
  <components.SingleValue {...props}>
    {props.data.value ? (
      <OptionAvatar name={props.data.label} />
    ) : (
      <span className="text-sm text-slate-medium">Unassigned</span>
    )}
  </components.SingleValue>
);

type Props = {
  task: Task;
  status: TaskStatus;
  assigneeId: string;
  dueDate: string;
  members: ProjectMember[];
  saving: boolean;
  onStatusChange: (val: TaskStatus) => void;
  onAssigneeChange: (val: string) => void;
  onDueDateChange: (val: string) => void;
};

export default function TaskDetailsSidebar({
  task,
  status,
  assigneeId,
  dueDate,
  members,
  saving,
  onStatusChange,
  onAssigneeChange,
  onDueDateChange,
}: Props) {
  const statusOptions: StatusOptionType[] = TASK_STATUSES.map((s) => ({
    value: s,
    label: STATUS_LABELS[s],
  }));

  const assigneeOptions: AssigneeOptionType[] = [
    { value: "", label: "Unassigned", department: "" },
    ...members.map((m) => ({
      value: m.user_id,
      label: m.metadata.name,
      department: m.metadata.department,
    })),
  ];

  const selectedStatus = statusOptions.find((o) => o.value === status) ?? null;

  const selectedAssignee =
    assigneeOptions.find((o) => o.value === assigneeId) ?? assigneeOptions[0];

  return (
    <div className="pt-8 ps-8 pr-5 flex flex-col gap-6">
      {/* Status */}
      <div className="flex flex-col gap-2">
        <span className="text-[.625rem] text-slate-medium font-bold uppercase">
          Status
        </span>

        <Select<StatusOptionType, false>
          options={statusOptions}
          value={selectedStatus}
          onChange={(opt) => opt && onStatusChange(opt.value)}
          isDisabled={saving}
          styles={selectStyles<StatusOptionType>()}
          isSearchable={false}
          components={{
            Option: StatusOption,
            SingleValue: StatusSingleValue,
          }}
        />
      </div>

      {/* Assignee */}
      <div className="flex flex-col gap-2">
        <span className="text-[.625rem] text-slate-medium font-bold uppercase">
          Assignee
        </span>

        <Select<AssigneeOptionType, false>
          options={assigneeOptions}
          value={selectedAssignee}
          onChange={(opt) => opt && onAssigneeChange(opt.value)}
          isDisabled={saving}
          styles={selectStyles<AssigneeOptionType>()}
          isSearchable
          placeholder="Search members..."
          components={{
            Option: AssigneeOption,
            SingleValue: AssigneeSingleValue,
          }}
        />
      </div>

      {/* Reporter */}
      <div className="flex flex-col gap-2 pb-6 border-b border-[#C3C6D633]">
        <span className="text-[.625rem] text-slate-medium font-bold uppercase">
          Reporter
        </span>

        {task.created_by ? (
          <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-md">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#DAE2FF] text-slate-dark">
              {getNameInitials(task.created_by.name)}
            </div>
            <span className="text-slate-dark text-sm font-semibold">
              {task.created_by.name}
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-medium">—</span>
        )}
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-medium text-xs">Due Date</span>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            disabled={saving}
            className="text-xs text-gray-700 outline-none rounded-sm px-2 py-1.5 cursor-pointer disabled:opacity-60"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-medium text-xs">Created At</span>
          <span className="text-sm text-slate-dark">
            {formatDate(task.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
