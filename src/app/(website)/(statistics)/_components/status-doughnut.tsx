"use client";

import { COLUMN_COLORS, STATUS_LABELS } from "@/shared/lib/constants/constants";
import { TaskStatus } from "@/shared/lib/types/task";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import NoTasksIcon from "../../../../../public/icons/no-tasks.svg";

type Props = {
  totals: Partial<Record<string, number>>;
};

type ChartData = {
  key: TaskStatus;
  name: string;
  value: number;
};

export default function StatusDoughnut({ totals }: Props) {
  const data: ChartData[] = Object.entries(totals)
    .filter(([, v]) => (v ?? 0) > 0)
    .map(([key, value]) => ({
      key: key as TaskStatus,
      name: STATUS_LABELS[key as TaskStatus] ?? key,
      value: value ?? 0,
    }));

  const totalTasks = data.reduce((acc, item) => acc + item.value, 0);

  if (data.length === 0) {
    return (
      <div
        className="bg-white shadow-[0_4px_24px_0_#041B3C0A] p-6
          flex items-center justify-center min-w-70"
      >
        <div className="m-auto text-center flex flex-col items-center justify-center bg-white">
          <Image src={NoTasksIcon} alt="no-tasks" height={30} width={30} />
          <p className="text-[.625rem] text-slate-medium text-center py-2 font-bold">
            No Tasks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A] p-6 min-w-70">
      <p className="text-[.625rem] uppercase font-bold text-[#737685] mb-6">
        Tasks by Status
      </p>

      <div className="flex flex-col xl:flex-row items-center gap-8">
        {/* Chart */}
        <div className="w-60 h-60 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={COLUMN_COLORS[d.key].chart} />
                ))}

                <Label
                  position="center"
                  content={() => (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x="50%"
                        className="fill-[#041B3C] text-2xl font-bold"
                      >
                        {totalTasks}
                      </tspan>

                      <tspan x="50%" dy="20" className="fill-[#737685] text-xs">
                        Total
                      </tspan>
                    </text>
                  )}
                />
              </Pie>

              <Tooltip
                formatter={(value, name) => [value ?? 0, name]}
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "4px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex-1 flex flex-col gap-4">
          {data.map((item) => {
            const percentage = Math.round((item.value / totalTasks) * 100);

            return (
              <div key={item.key} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: COLUMN_COLORS[item.key].chart,
                      }}
                    />

                    <span className="text-[#041B3C] font-medium">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-[#737685]">{item.value}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#EEF2FF] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: COLUMN_COLORS[item.key].chart,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
