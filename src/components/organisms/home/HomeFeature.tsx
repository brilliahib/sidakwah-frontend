"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    no: "01",
    title: "Modul Dakwah",
    description:
      "Jelajahi modul utama yang disusun berdasarkan tema dakwah, mulai dari akidah, ibadah, akhlak, hingga penguatan karakter Islami.",
  },
  {
    no: "02",
    title: "Sub Modul Terstruktur",
    description:
      "Setiap modul dibagi menjadi sub modul yang lebih ringkas agar materi mudah dipahami, dipelajari bertahap, dan tidak terasa berat.",
  },
  {
    no: "03",
    title: "Konten Materi & Artikel",
    description:
      "Akses materi pembelajaran, artikel inspiratif, dan konten dakwah yang relevan untuk memperdalam pemahaman Anda.",
  },
  {
    no: "04",
    title: "Forum Diskusi",
    description:
      "Berinteraksi dengan sesama pengguna untuk bertanya, berdiskusi, dan saling menguatkan dalam kebaikan.",
  },
];

const TOTAL_DURATION = 3600;

const featurePreviews = [
  {
    eyebrow: "01",
    title: "Modul Dakwah",
    subtitle:
      "Tampilan modul utama dengan kategori tema dakwah yang terstruktur dan mudah dijelajahi.",
    variant: "modules",
  },
  {
    eyebrow: "02",
    title: "Sub Modul Terstruktur",
    subtitle:
      "Preview sub modul yang memudahkan pengguna belajar secara bertahap sesuai urutan materi.",
    variant: "submodules",
  },
  {
    eyebrow: "03",
    title: "Konten Materi & Artikel",
    subtitle:
      "Preview halaman konten yang menampilkan materi pembelajaran dan artikel inspiratif.",
    variant: "content",
  },
  {
    eyebrow: "04",
    title: "Forum Diskusi",
    subtitle:
      "Preview forum diskusi untuk bertanya, berbagi, dan saling menguatkan dalam kebaikan.",
    variant: "forum",
  },
] as const;

export default function HomeFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const nextProgress = (elapsed / TOTAL_DURATION) * 100;

      if (nextProgress >= 100) {
        setProgress(0);
        setActiveIndex((current) => (current + 1) % features.length);
        startTimeRef.current = timestamp;
      } else {
        setProgress(nextProgress);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const activePreview = featurePreviews[activeIndex];

  return (
    <section className="w-full bg-white py-20 md:py-28" id="features">
      <div>
        <div className="mx-auto pad-x-3xl flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Features
          </div>

          <h2 className="mt-6 font-bricolage text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Fitur Unggulan Nusa Dakwah
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base md:text-lg">
            Platform ini membantu Anda menjelajahi modul dakwah, mempelajari sub
            modul secara bertahap, membaca materi dan artikel, serta berdiskusi
            bersama komunitas.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4 pad-x-3xl">
          {features.map((feature, index) => {
            const active = index === activeIndex;

            return (
              <div
                key={feature.no}
                className="group relative rounded-2xl bg-white p-2 transition-all duration-300"
              >
                <Progress
                  value={active ? progress : 0}
                  className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
                />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-sm font-semibold tracking-widest ${
                        active ? "text-primary" : "text-slate-300"
                      }`}
                    >
                      {feature.no}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        active
                          ? "translate-x-0 text-primary opacity-100"
                          : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  <h3
                    className={`mt-3 text-lg font-semibold tracking-tight transition-colors duration-300 ${
                      active ? "text-primary" : "text-slate-900"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pad-x-3xl mt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {activePreview.eyebrow}
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl font-bricolage">
                {activePreview.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                {activePreview.subtitle}
              </p>
            </div>

            <div className="rounded-[28px] bg-primary/10 p-5 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {activePreview.variant === "modules" && (
                    <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <div className="h-5 w-5 rounded-full bg-slate-300" />
                      </div>

                      <div className="space-y-3">
                        <div className="h-4 w-1/3 rounded-full bg-slate-200" />
                        <div className="h-3 w-full rounded-full bg-slate-100" />
                        <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-primary/10 p-4">
                          <div className="h-3 w-16 rounded-full bg-primary/20" />
                          <div className="mt-3 h-4 w-24 rounded-full bg-primary/30" />
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="h-3 w-16 rounded-full bg-slate-200" />
                          <div className="mt-3 h-4 w-24 rounded-full bg-slate-300" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activePreview.variant === "submodules" && (
                    <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="h-4 w-32 rounded-full bg-slate-200" />
                        <div className="h-9 w-28 rounded-full bg-primary" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                          <div className="h-10 w-10 rounded-full bg-primary/20" />
                          <div className="flex-1">
                            <div className="h-3 w-28 rounded-full bg-slate-200" />
                            <div className="mt-2 h-3 w-40 rounded-full bg-slate-100" />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                          <div className="h-10 w-10 rounded-full bg-primary/20" />
                          <div className="flex-1">
                            <div className="h-3 w-28 rounded-full bg-slate-200" />
                            <div className="mt-2 h-3 w-36 rounded-full bg-slate-100" />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                          <div className="h-10 w-10 rounded-full bg-primary/20  " />
                          <div className="flex-1">
                            <div className="h-3 w-28 rounded-full bg-slate-200" />
                            <div className="mt-2 h-3 w-32 rounded-full bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activePreview.variant === "content" && (
                    <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-slate-100" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                          <div className="h-3 w-full rounded-full bg-slate-100" />
                          <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-primary/10 p-4">
                          <div className="h-28 rounded-xl bg-primary/20" />
                          <div className="mt-3 h-3 w-24 rounded-full bg-primary/30" />
                          <div className="mt-2 h-3 w-32 rounded-full bg-primary/20" />
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="h-28 rounded-xl bg-slate-200" />
                          <div className="mt-3 h-3 w-24 rounded-full bg-slate-200" />
                          <div className="mt-2 h-3 w-32 rounded-full bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activePreview.variant === "forum" && (
                    <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="h-4 w-32 rounded-full bg-slate-200" />
                        <div className="h-10 w-32 rounded-full bg-primary" />
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-28 rounded-full bg-slate-200" />
                              <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-primary/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-28 rounded-full bg-primary/30" />
                              <div className="h-3 w-2/3 rounded-full bg-primary/20" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-28 rounded-full bg-slate-200" />
                              <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
