import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MaterialContent } from "@/types/material-contents/material-content";
import { Play } from "lucide-react";
import Link from "next/link";

interface CardListMaterialContentProps {
  data: MaterialContent[];
  isPending?: boolean;
}

export const CardListMaterialContentSkeleton = () => {
  return (
    <>
      <div className="my-6 grid grid-cols-1 gap-6">
        <div className="flex gap-6">
          <Skeleton className="h-36 w-36 rounded-xl md:flex hidden" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default function CardListMaterialContent({
  data,
  isPending,
}: CardListMaterialContentProps) {
  if (isPending) {
    return <CardListMaterialContentSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {data?.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Materi tidak ditemukan.
        </div>
      ) : (
        data?.map((materialContent) => (
          <Link
            href={`contents/${materialContent.id}`}
            key={materialContent.id}
            className="group block"
          >
            <div className="flex flex-row gap-6">
              <div className="relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg bg-primary group-hover:bg-primary/80 md:flex">
                <Play className="m-auto h-12 w-12 text-background" />
              </div>
              <Card className="w-full border-2 border-muted shadow-transparent group-hover:bg-muted">
                <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-md font-bold md:text-xl capitalize">
                      {materialContent.title}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
