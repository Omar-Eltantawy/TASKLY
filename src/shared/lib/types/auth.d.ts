import { ApiError } from "./api";

export type SignupPayload = {
  email: string;
  password: string;
  data: {
    name: string;
    department: string;
  };
};

export type SignupSuccessResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    user_metadata: {
      name: string;
      email: string;
      department: string;
    };
  };
};

export type SignupAPIResponse = SignupSuccessResponse | ApiError;
