import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/user/user";
import { generateFallbackFromName } from "@/utils/generate-name";

interface CardUserDetailProps {
  data?: User;
}

export default function CardUserDetail({ data }: CardUserDetailProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-center items-center mb-12">
          <Avatar className="h-36 w-36 rounded-full border">
            <AvatarImage
              src={data?.profile_picture || ""}
              alt={data?.name || "Tidak dapat dimuat"}
              className="h-36 w-36 rounded-full"
            />
            <AvatarFallback className="rounded-lg h-36 w-36 text-3xl font-bold">
              {generateFallbackFromName(data?.name || "")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Nama Pengguna</span>
            <h3 className="font-medium">{data?.name}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Email</span>
            <h3 className="font-medium">{data?.email}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Username</span>
            <h3 className="font-medium">{data?.username}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Alamat</span>
            <h3 className="font-medium">{data?.address}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Nomor Telepon</span>
            <h3 className="font-medium">{data?.phone_number}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Role</span>
            <h3 className="font-medium capitalize">{data?.role}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
