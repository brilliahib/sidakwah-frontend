"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/nav/NavButton";
import NavL from "@/components/atoms/nav/NavL";
import NavLink from "@/components/atoms/nav/NavLink";
import Link from "next/link";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: "/",
        label: "Beranda",
        active: pathname.startsWith("/"),
      },
      {
        href: "#tentang",
        label: "Tentang",
        active: pathname.startsWith("#tentang"),
      },
      {
        href: "#features",
        label: "Fitur",
        active: pathname.startsWith("#features"),
      },
      {
        href: "#keunggulan",
        label: "Keunggulan",
        active: pathname.startsWith("#keunggulan"),
      },
    ],
    [pathname],
  );

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 text-white bg-transparent font-bricolage">
        <div className="pad-x-xl flex justify-between gap-8 bg-transparent py-3 md:gap-12">
          <NavL />
          <nav className="pad-x hidden items-center space-x-8 py-3 font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <NavButton />
        </div>
      </div>
    </>
  );
}
