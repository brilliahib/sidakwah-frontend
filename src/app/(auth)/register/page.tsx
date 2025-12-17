import AuthRegisterWrapper from "@/components/organisms/auth/AuthRegisterWrapper";
import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Daftar | Nusa Dakwah",
  description: "Daftar untuk mengakses fitur-fitur yang tersedia.",
  url: "https://nusadakwah.creatify.id/register",
  keywords: ["Daftar", "Register", "Nusa Dakwah", "Dakwah Digital"],
  siteName: "Daftar | Nusa Dakwah",
  type: "website",
});

export default function AuthRegisterPage() {
  return <AuthRegisterWrapper />;
}
