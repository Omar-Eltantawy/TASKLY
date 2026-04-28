import { TASK_STATUSES } from "../constants/constants";

export type TaskStatus = (typeof TASK_STATUSES)[number];

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
