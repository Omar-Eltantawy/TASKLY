export type Epic = {
  id: string;
  title: string;
  description: string | null;
  assignee_id: string | null;
  project_id: string;
  deadline: string | null;
  created_at: string;
};

export type AddEpicPayload = {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
};

export type AddEpicResult =
  | { success: true }
  | { success: false; error: string };
