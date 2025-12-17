import AuthLoginWrapper from "@/components/organisms/auth/AuthLoginWrapper";
import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Masuk | Nusa Dakwah",
  description: "Masuk untuk mengakses fitur-fitur yang tersedia.",
  url: "https://nusadakwah.creatify.id/login",
  keywords: ["Masuk", "Login", "Nusa Dakwah", "Dakwah Digital"],
  siteName: "Masuk | Nusa Dakwah",
  type: "website",
});

export default function AuthLoginPage() {
  return <AuthLoginWrapper />;
}
