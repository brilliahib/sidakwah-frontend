import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { DashboardSummary } from "@/types/dashboard/summary";

interface GetDashboardSummaryResponse {
  data: DashboardSummary;
}

export const GetDashboardSummaryHandler = async (
  token: string,
): Promise<GetDashboardSummaryResponse> => {
  const { data } = await api.get<GetDashboardSummaryResponse>(
    `/dashboard/summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDashboardSummary = (
  token: string,
  options?: Partial<UseQueryOptions<GetDashboardSummaryResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-dashboard-summary"],
    queryFn: () => GetDashboardSummaryHandler(token),
    ...options,
  });
};
