import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin | Nusa Dakwah",
  description:
    "Dashboard admin Nusa Dakwah untuk mengelola konten, pengguna, modul pembelajaran, dan aktivitas sistem secara terpusat.",
};

export default function DashboardAdminPage() {
  return <DashboardTitle title="Dashboard Admin" />;
}
