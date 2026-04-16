export type AddProjectPayload = {
  name: string;
  description?: string;
};

export type AddProjectResponse =
  | { success: true }
  | { success: false; error: string };

export type Project = {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
};

export type GetProjectResponse =
  | { success: true; projects: Project[] }
  | { success: false; error: string; status?: number };
