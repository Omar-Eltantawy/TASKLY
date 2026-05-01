import { TASK_STATUSES } from "../constants/constants";
import { User } from "./user";

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  project_id: string;
  epic_id: string;
  task_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
  created_at: string;
  assignee: {
    department: string;
    email: string;
    id: string;
    name: string;
  };
  created_by: User;
  epic: Epic;
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

export type GetTasksResult =
  | { success: true; tasks: Task[]; totalCount: number; totalPages: number }
  | { success: false; error: string };

export type GetEpicTasksResult =
  | { success: true; tasks: Task[] }
  | { success: false; error: string };

export type GetTaskDetailResult =
  | { success: true; task: Task }
  | { success: false; error: string };
