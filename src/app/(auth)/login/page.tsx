import AuthLoginWrapper from "@/components/organisms/auth/AuthLoginWrapper";
import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Masuk | Nusa Dakwah",
  description:
    "Platform pembelajaran dan dakwah digital untuk memberdayakan umat melalui konten edukatif dan inspiratif.",
  url: "https://nusadakwah.creatify.id/login",
  image: "https://nusadakwah.creatify.id/images/logo.png",
  keywords: ["Masuk", "Login", "Nusa Dakwah", "Dakwah Digital"],
  siteName: "Masuk | Nusa Dakwah",
  type: "website",
});

export default function AuthLoginPage() {
  return <AuthLoginWrapper />;
}
