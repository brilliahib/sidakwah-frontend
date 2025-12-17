import AuthRegisterWrapper from "@/components/organisms/auth/AuthRegisterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Nusa Dakwah",
  description: "Daftar untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthRegisterPage() {
  return <AuthRegisterWrapper />;
}
