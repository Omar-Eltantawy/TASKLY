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

export type TaskStatus = (typeof TASK_STATUSES)[number];

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

export type Task = {
  id: string;
  project_id: string;
  epic_id: string | null;
  title: string;
  description: string | null;
  assignee_id: string | null;
  due_date: string | null;
  status: TaskStatus;
  created_at: string;
};

export type AddTaskPayload = {
  project_id: string;
  title: string;
  epic_id?: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  status: TaskStatus;
};

export type AddTaskResult =
  | { success: true }
  | { success: false; error: string };
