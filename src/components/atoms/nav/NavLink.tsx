import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  scrolled?: boolean;
}

export default function NavLink({
  href,
  label,
  active,
  scrolled,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center rounded font-medium transition-colors", {
        "text-white hover:text-primary": !scrolled && !active,
        "text-slate-900 hover:text-primary": scrolled && !active,
        "text-primary": active,
      })}
    >
      {label}
    </Link>
  );
}
