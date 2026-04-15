export type User = {
  name: string;
  department: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};

export type UserProfileResponse = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: User;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
