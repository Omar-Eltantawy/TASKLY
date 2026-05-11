import { TaskStatus } from "../types/task";

export const TASK_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
] as const;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  TO_DO: "TO DO",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  IN_REVIEW: "In Review",
  READY_FOR_QA: "Ready For QA",
  REOPENED: "Reopened",
  READY_FOR_PRODUCTION: "Ready For Production",
  DONE: "Done",
};

export const COLUMN_COLORS: Record<
  TaskStatus,
  {
    bg: string;
    text: string;
    chart: string;
  }
> = {
  TO_DO: {
    bg: "bg-gray-400",
    text: "text-gray-900",
    chart: "#9CA3AF",
  },

  IN_PROGRESS: {
    bg: "bg-primary-container",
    text: "text-white",
    chart: "#0052cc",
  },

  BLOCKED: {
    bg: "bg-error",
    text: "text-white",
    chart: "#EF4444",
  },

  IN_REVIEW: {
    bg: "bg-yellow-500",
    text: "text-gray-900",
    chart: "#EAB308",
  },

  READY_FOR_QA: {
    bg: "bg-purple-500",
    text: "text-white",
    chart: "#A855F7",
  },

  REOPENED: {
    bg: "bg-orange-500",
    text: "text-white",
    chart: "#F97316",
  },

  READY_FOR_PRODUCTION: {
    bg: "bg-green-500",
    text: "text-white",
    chart: "#22C55E",
  },

  DONE: {
    bg: "bg-emerald-600",
    text: "text-white",
    chart: "#059669",
  },
};
