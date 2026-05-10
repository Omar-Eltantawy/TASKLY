import Select, { SingleValue } from "react-select";
import Image from "next/image";
import epicIdIcon from "../../../../../../../../public/icons/epic.svg";
import { Epic } from "@/shared/lib/types/epic";
import selectStyles from "./select-styles";
import Input from "@/shared/ui/input";

type EpicOptionType = {
  value: string;
  label: string;
};

type Props = {
  taskId: string;
  title: string;
  epicId: string;
  epics: Epic[];
  saving: boolean;
  onTitleChange: (val: string) => void;
  onTitleBlur: () => void;
  onEpicChange: (val: string) => void;
};

export default function TaskDetailsHeader({
  taskId,
  title,
  epicId,
  epics,
  saving,
  onTitleChange,
  onTitleBlur,
  onEpicChange,
}: Props) {
  const epicOptions: EpicOptionType[] = [
    { value: "", label: "No Epic" },
    ...epics.map((e) => ({
      value: e.id,
      label: `${e.epic_id} — ${
        e.title.length > 40 ? e.title.slice(0, 40) + "..." : e.title
      }`,
    })),
  ];

  const selectedEpic =
    epicOptions.find((o) => o.value === epicId) ?? epicOptions[0];

  return (
    <div>
      {/* Task ID + Epic */}
      <div className="flex items-center gap-3 ps-10 pt-6">
        <span
          className="bg-surface-highest px-3 py-1 rounded-sm
          text-primary text-xs font-bold"
        >
          {taskId}
        </span>

        <span className="flex items-center gap-1 text-[#434654] text-sm font-medium">
          <Image src={epicIdIcon} alt="epic" width={12} height={12} />

          <Select<EpicOptionType, false>
            options={epicOptions}
            value={selectedEpic}
            onChange={(opt: SingleValue<EpicOptionType>) =>
              onEpicChange(opt?.value ?? "")
            }
            isDisabled={saving}
            styles={selectStyles<EpicOptionType>()}
            isSearchable={false}
          />
        </span>
      </div>

      {/* Title */}
      <div className="ps-10 mt-3 pb-10 border-b border-b-surface-low">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onBlur={onTitleBlur}
          disabled={saving}
          placeholder="Task title"
          className="text-3xl font-bold text-slate-dark bg-transparent border-none"
        />
      </div>
    </div>
  );
}
