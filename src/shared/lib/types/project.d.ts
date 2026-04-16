export type AddProjectPayload = {
  name: string;
  description?: string;
};

export type AddProjectResponse =
  | { success: true }
  | { success: false; error: string };
