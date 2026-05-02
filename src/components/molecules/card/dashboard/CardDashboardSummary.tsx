import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSummary } from "@/types/dashboard/summary";
import { Book, Layers3, FileText } from "lucide-react";

interface CardDashboardSummaryProps {
  data?: DashboardSummary;
  isPending?: boolean;
}

type SummaryItem = {
  key: keyof DashboardSummary;
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const summaryItems: SummaryItem[] = [
  {
    key: "modules",
    title: "Total Modul",
    icon: Book,
    iconBg: "bg-green-600/20",
    iconColor: "text-green-600",
  },
  {
    key: "sub_modules",
    title: "Total Sub Modul",
    icon: Layers3,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-600",
  },
  {
    key: "material_contents",
    title: "Total Konten Materi",
    icon: FileText,
    iconBg: "bg-orange-600/20",
    iconColor: "text-orange-600",
  },
];

function CardDashboardSummarySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="rounded-2xl bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function CardDashboardSummary({
  data,
  isPending,
}: CardDashboardSummaryProps) {
  if (isPending) {
    return <CardDashboardSummarySkeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.key} className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-2.5 flex-shrink-0 ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-2xl xl:text-3xl font-bold">
                {data?.[item.key] ?? 0}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
