import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";

function MobileLink({
  href,
  children,
  icon: Icon,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  pathname: string;
}) {
  const isActive = pathname === href;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-4 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
          isActive && "bg-primary/10 font-semibold text-primary",
        )}
      >
        {Icon && <Icon className={cn("h-5 w-5", isActive && "text-primary")} />}
        <span>{children}</span>
      </Link>
    </SheetClose>
  );
}

export default function NavButton() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        <div className="flex items-center gap-8">
          <Link href="/login" className="font-semibold">
            Masuk
          </Link>
          <Button className="rounded-full" asChild size={"lg"}>
            <Link href="/register" className="font-semibold">
              Daftar
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 md:hidden md:gap-0">
        <Sheet>
          {/* Hamburger */}
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-left font-semibold"
              >
                <Image
                  src={"/images/logo.png"}
                  alt="Nusa Dakwah"
                  width={100}
                  height={100}
                  className="max-w-[100px]"
                />
              </Link>
            </SheetHeader>
            <nav className="space-y-2">
              <MobileLink href="/" pathname={pathname}>
                Beranda
              </MobileLink>
              <MobileLink href="#tentang" pathname={pathname}>
                Tentang
              </MobileLink>
              <MobileLink href="#modul" pathname={pathname}>
                Modul
              </MobileLink>
              <MobileLink href="#keunggulan" pathname={pathname}>
                Keunggulan
              </MobileLink>
            </nav>
            <SheetFooter>
              <Button className="rounded-full" asChild>
                <Link href="/register" className="font-semibold">
                  Daftar
                </Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
