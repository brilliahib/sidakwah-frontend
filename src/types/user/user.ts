export type UserRole = "admin" | "ustadz" | "user";

export interface User {
  id: number;
  email: string;
  username: string;
  phone_number: string;
  name: string;
  password: string;
  address: string;
  role: UserRole;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}
