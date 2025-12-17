export interface User {
  id: number;
  email: string;
  username: string;
  phone_number: string;
  name: string;
  password: string;
  address: string;
  role: string;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date;
}
