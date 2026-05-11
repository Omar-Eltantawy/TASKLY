import Image from "next/image";
import TotalTasksIcon from "../../../../../public/icons/total-tasks.svg";
import CompleterdTasksIcon from "../../../../../public/icons/checked.svg";
import OverDueTasksIcon from "../../../../../public/icons/delayed.svg";
import { cn } from "@/shared/lib/utils/tailwind-merge";

type Props = {
  totalTasks: number;
  doneTasks: number;
  overdueTasks: number;
};

type CardProps = {
  label: string;
  value: number;
  color: string;
  bg: string;
  imageSrc: string;
  imageAlt: string;
};

function KpiCard({ label, value, color, bg, imageSrc, imageAlt }: CardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-6 bg-white shadow-[0_4px_24px_0_#041B3C0A]",
      )}
    >
      <div className={`rounded-sm flex flex-col gap-2`}>
        <p className="text-xs uppercase  font-bold text-[#737685]">{label}</p>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={cn(bg, "p-4")}>
        <Image src={imageSrc} alt={imageAlt} width={24} height={24} />
      </div>
    </div>
  );
}

export default function KpiCards({
  totalTasks,
  doneTasks,
  overdueTasks,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KpiCard
        label="Total Tasks"
        value={totalTasks}
        color="text-primary"
        bg="bg-surface-highest shadow-[0_4px_24px_0_#041B3C0A]"
        imageSrc={TotalTasksIcon}
        imageAlt="total-tasks"
      />
      <KpiCard
        label="Completed Tasks"
        value={doneTasks}
        color="text-[#2E7D32]"
        bg="bg-[#E8F5E9] shadow-[0_4px_24px_0_#041B3C0A]"
        imageSrc={CompleterdTasksIcon}
        imageAlt="completed-tasks"
      />
      <KpiCard
        label="Overdue Tasks"
        value={overdueTasks}
        color="text-error"
        bg="bg-[#FFDAD6] shadow-[0_4px_24px_0_#041B3C0A]"
        imageSrc={OverDueTasksIcon}
        imageAlt="overdue-tasks"
      />
    </div>
  );
}
