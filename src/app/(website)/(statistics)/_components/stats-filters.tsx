"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Project } from "@/shared/lib/types/project";
import { daysBetween } from "@/shared/lib/utils/date";
import { STATUS_LABELS, TASK_STATUSES } from "@/shared/lib/constants/constants";
import { TaskStatus } from "@/shared/lib/types/task";

type Props = {
  projects: Project[];
  defaultStartDate: string;
  defaultEndDate: string;
  defaultProjectId: string | null;
  defaultStatus: string | null;
};

export default function StatsFilters({
  projects,
  defaultStartDate,
  defaultEndDate,
  defaultProjectId,
  defaultStatus,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [projectId, setProjectId] = useState(defaultProjectId ?? "");
  const [status, setStatus] = useState(defaultStatus ?? "");
  const [dateError, setDateError] = useState<string | null>(null);

  const apply = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    const s = overrides.startDate ?? startDate;
    const e = overrides.endDate ?? endDate;

    const p =
      overrides.projectId !== undefined ? overrides.projectId : projectId;

    const st = overrides.status !== undefined ? overrides.status : status;

    params.set("startDate", s);
    params.set("endDate", e);

    if (p) params.set("projectId", p);
    else params.delete("projectId");

    if (st) params.set("status", st);
    else params.delete("status");

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleStartDate = (val: string) => {
    setStartDate(val);
    setDateError(null);

    if (endDate && daysBetween(val, endDate) > 7) {
      setDateError("Date range cannot exceed 7 days.");
      return;
    }

    apply({ startDate: val });
  };

  const handleEndDate = (val: string) => {
    setEndDate(val);
    setDateError(null);

    if (startDate && daysBetween(startDate, val) > 7) {
      setDateError("Date range cannot exceed 7 days.");
      return;
    }

    apply({ endDate: val });
  };

  const inputCls =
    "outline-none text-sm px-3 py-2.5 bg-white rounded-md " +
    "shadow-[0_4px_24px_0_#041B3C0A] text-gray-700 " +
    "w-full min-h-[42px] border border-transparent " +
    "focus:border-primary transition-colors";

  return (
    <div className="flex flex-col gap-3 mb-6 bg-surface-low py-4 px-4 md:px-5 rounded-xl">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full xl:w-auto">
          {/* Start Date */}
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-xs font-semibold text-slate-medium">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => handleStartDate(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-xs font-semibold text-slate-medium">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => handleEndDate(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full xl:w-auto">
          {/* Project */}
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-xs font-semibold text-slate-medium">
              Project
            </label>

            <select
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
                apply({ projectId: e.target.value });
              }}
              className={inputCls}
            >
              <option value="">All Projects</option>

              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-xs font-semibold text-slate-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                apply({ status: e.target.value });
              }}
              className={inputCls}
            >
              <option value="">All Statuses</option>

              {TASK_STATUSES.map((s: TaskStatus) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {dateError && (
        <p className="text-error text-xs font-medium">{dateError}</p>
      )}
    </div>
  );
}
