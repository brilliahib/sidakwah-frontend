import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetAuthResponse {
  meta: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: User;
}

export const getAuthApiHandler = async (token: string): Promise<User> => {
  const { data } = await api.get<GetAuthResponse>("/auth/get-auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
