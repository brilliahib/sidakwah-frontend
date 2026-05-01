"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpenText, MapPin, Users2 } from "lucide-react";
import Link from "next/link";

const aboutHighlights = [
  {
    icon: BookOpenText,
    title: "Belajar lebih terarah",
    description:
      "Menyajikan materi dakwah dalam bentuk yang rapi, mudah dipahami, dan nyaman diikuti.",
  },
  {
    icon: Users2,
    title: "Untuk komunitas Weleri",
    description:
      "Dibuat khusus untuk Weleri mengaji, agar masyarakat sekitar dapat mengakses dakwah digital dengan lebih dekat.",
  },
  {
    icon: MapPin,
    title: "Untuk Weleri dan sekitarnya",
    description:
      "Mendukung kebutuhan dakwah bagi wilayah Weleri dan area sekitar secara lebih praktis dan fleksibel.",
  },
];

export default function HomeAbout() {
  return (
    <section className="w-full bg-white py-20 md:py-28" id="tentang">
      <div className="mx-auto pad-x-3xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            About Us
          </div>

          <h2 className="mt-6 font-bricolage text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Tentang Nusa Dakwah
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base md:text-lg">
            Platform dakwah digital yang dikhususkan untuk Weleri mengaji, hadir
            untuk memudahkan masyarakat Weleri dan sekitarnya dalam mengakses
            ilmu, materi, serta ruang dakwah yang lebih terstruktur.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Nusa Dakwah
                </h3>
                <p className="text-sm text-slate-500">
                  Platform dakwah digital untuk Weleri mengaji
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600 md:text-base">
              Nusa Dakwah dirancang sebagai ruang digital yang memudahkan
              pengguna untuk belajar, membaca, dan terhubung dengan kegiatan
              dakwah secara lebih dekat. Fokus utamanya adalah menghadirkan
              pengalaman yang sederhana, bermanfaat, dan relevan bagi masyarakat
              Weleri serta wilayah sekitarnya.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-slate-900">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button className="rounded-full" asChild>
                <Link href={"/dashboard"}>
                  Jelajahi Platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="text-sm text-slate-500">
                Menghubungkan ilmu, komunitas, dan dakwah dalam satu tempat.
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-primary/10 p-5 md:p-8">
            <div className="flex h-full flex-col justify-between rounded-[28px] bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Visual Preview
                </div>
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>

              <div className="mt-6 rounded-[24px] bg-slate-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <BookOpenText className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="h-4 w-2/3 rounded-full bg-slate-200" />
                    <div className="mt-3 h-3 w-full rounded-full bg-slate-100" />
                    <div className="mt-2 h-3 w-5/6 rounded-full bg-slate-100" />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="h-3 w-16 rounded-full bg-primary/20" />
                    <div className="mt-3 h-4 w-24 rounded-full bg-slate-200" />
                    <div className="mt-2 h-3 w-20 rounded-full bg-slate-100" />
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="h-3 w-16 rounded-full bg-primary/20" />
                    <div className="mt-3 h-4 w-28 rounded-full bg-slate-200" />
                    <div className="mt-2 h-3 w-20 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <div className="text-2xl font-bold text-slate-900">01</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Weleri mengaji
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-bold text-slate-900">24/7</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Akses kapan saja
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
