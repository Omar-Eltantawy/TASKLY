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
  token_type: string;
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

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = SignupSuccessResponse;

export type LoginAPIResponse = LoginSuccessResponse | ApiError;

export type ForgotPasswordPayload = { email: string };

export type ResetPasswordPayload = { password: string };
