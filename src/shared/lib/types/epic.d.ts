export type EpicUser = {
  sub: string;
  name: string;
  email: string;
  department: string;
};

export type Epic = {
  id: string;
  epic_id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  created_at: string;
  created_by: EpicUser;
  assignee: EpicUser | null;
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

export type GetEpicsResult =
  | {
      success: true;
      epics: Epic[];
      totalCount: number;
      totalPages: number;
      currentPage: number;
    }
  | { success: false; error: string; status?: number };
