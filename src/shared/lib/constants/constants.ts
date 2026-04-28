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
