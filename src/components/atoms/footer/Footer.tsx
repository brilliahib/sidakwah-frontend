"use client";

import Link from "next/link";
import {
  BookOpenText,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import Image from "next/image";

const footerLinks = {
  menu: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/#tentang" },
    { label: "Fitur", href: "/#features" },
    { label: "Keunggulan", href: "/#keunggulan" },
  ],
  support: [
    { label: "Kontak", href: "/#contact" },
    { label: "FAQ", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white mt-24">
      <div className="mx-auto pad-x-3xl py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div>
              <Image
                src={"/images/logo.png"}
                alt="Nusa Dakwah"
                width={100}
                height={100}
              />
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Platform dakwah digital yang dirancang untuk memudahkan akses
              ilmu, materi, dan kegiatan dakwah secara lebih terstruktur,
              sederhana, dan bermanfaat.
            </p>

            <div className="mt-6 flex items-start gap-3 text-sm text-slate-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Weleri dan sekitarnya</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
                Menu
              </h3>
              <ul className="mt-5 space-y-4">
                {footerLinks.menu.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
                Support
              </h3>
              <ul className="mt-5 space-y-4">
                {footerLinks.support.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Nusa Dakwah. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/welerimengaji/"
              className="text-slate-500 transition-colors hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
