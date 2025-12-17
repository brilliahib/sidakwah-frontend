import AuthRegisterWrapper from "@/components/organisms/auth/AuthRegisterWrapper";
import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Daftar | Nusa Dakwah",
  description:
    "Platform pembelajaran dan dakwah digital untuk memberdayakan umat melalui konten edukatif dan inspiratif.",
  url: "https://nusadakwah.creatify.id/register",
  image: "https://nusadakwah.creatify.id/images/logo.png",
  keywords: ["Daftar", "Register", "Nusa Dakwah", "Dakwah Digital"],
  siteName: "Daftar | Nusa Dakwah",
  type: "website",
});

export default function AuthRegisterPage() {
  return <AuthRegisterWrapper />;
}
