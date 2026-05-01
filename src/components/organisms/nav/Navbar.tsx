"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import NavButton from "@/components/atoms/nav/NavButton";
import NavL from "@/components/atoms/nav/NavL";
import NavLink from "@/components/atoms/nav/NavLink";

export interface LinkItem {
  href: string;
  label: string;
  active?: boolean;
}

const sectionIds = ["tentang", "features", "keunggulan"];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const updateNavbarState = () => {
      setScrolled(window.scrollY > 0);

      const scrollPosition = window.scrollY + 140;
      let currentSection = "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (element.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    const onHashChange = () => updateNavbarState();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const links = useMemo(
    () => [
      {
        href: "/",
        label: "Beranda",
        active: pathname === "/" && activeSection === "",
      },
      {
        href: "/#tentang",
        label: "Tentang",
        active: activeSection === "tentang",
      },
      {
        href: "/#features",
        label: "Fitur",
        active: activeSection === "features",
      },
      {
        href: "/#keunggulan",
        label: "Keunggulan",
        active: activeSection === "keunggulan",
      },
    ],
    [pathname, activeSection],
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 w-full font-bricolage"
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0, 0, 0, 0.08)"
          : "0 0 0 rgba(0, 0, 0, 0)",
        backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`pad-x-3xl flex justify-between gap-8 py-3 md:gap-12 transition-colors duration-300 ${
          scrolled ? "text-slate-900" : "text-white"
        }`}
      >
        <NavL />
        <nav className="pad-x hidden items-center space-x-8 py-3 font-semibold md:flex">
          {links.map((link) => (
            <NavLink key={link.label} {...link} scrolled={scrolled} />
          ))}
        </nav>
        <NavButton />
      </div>
    </motion.div>
  );
}
