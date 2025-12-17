import AuthLoginWrapper from "@/components/organisms/auth/AuthLoginWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Nusa Dakwah",
  description: "Masuk untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthLoginPage() {
  return <AuthLoginWrapper />;
}
