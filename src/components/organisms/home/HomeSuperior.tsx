"use client";

import {
  ShieldCheck,
  LayoutGrid,
  MessageCircleMore,
  Sparkles,
  BookOpenText,
  Users2,
} from "lucide-react";

const superiorBenefits = [
  {
    icon: LayoutGrid,
    title: "Tampilan terstruktur",
    description:
      "Materi, sub modul, artikel, dan diskusi disusun rapi agar pengguna lebih mudah memahami alur belajar.",
  },
  {
    icon: BookOpenText,
    title: "Fokus pada dakwah",
    description:
      "Dirancang khusus untuk kebutuhan dakwah digital, bukan sekadar platform umum yang terlalu luas.",
  },
  {
    icon: Users2,
    title: "Lebih dekat dengan komunitas",
    description:
      "Mendukung interaksi yang hangat antara pengguna, pengajar, dan komunitas Weleri mengaji.",
  },
  {
    icon: MessageCircleMore,
    title: "Diskusi lebih aktif",
    description:
      "Memberi ruang bertanya dan berbagi agar proses belajar terasa lebih hidup dan saling menguatkan.",
  },
];

const comparisonPoints = [
  "Fokus pada Weleri dan sekitarnya",
  "Alur belajar lebih jelas dan terarah",
  "Konten dakwah, artikel, dan forum dalam satu tempat",
  "UI sederhana, nyaman, dan mudah digunakan",
];

export default function HomeSuperior() {
  return (
    <section className="w-full bg-white py-20 md:py-28" id="keunggulan">
      <div className="mx-auto pad-x-3xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose Us
          </div>

          <h2 className="mt-6 font-bricolage text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Keunggulan Nusa Dakwah
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base md:text-lg">
            Nusa Dakwah hadir sebagai platform dakwah digital yang lebih fokus,
            lebih dekat dengan komunitas, dan lebih mudah digunakan untuk
            mendukung proses belajar serta berbagi ilmu.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {superiorBenefits.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {comparisonPoints.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm text-slate-600">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
