import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import Navbar from "../nav/Navbar";

export default function HomeHero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/background.jpg"
        alt="Home Hero"
        width={2070}
        height={1380}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center mt-14 md:mt-24 px-8 lg:px-12 py-12 md:py-24 font-bricolage">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Dakwah Melalui <br /> Teknologi
          </h1>
          <p className="text-sm lg:text-lg text-gray-200 max-w-full mx-auto mb-8">
            Menjalankan dakwah dengan teknologi untuk menjangkau lebih banyak
            jiwa!
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden px-3 py-2">
            <input
              type="text"
              placeholder="Cari modul..."
              className="flex-1 bg-transparent px-5 py-3 outline-none text-gray-700 placeholder:text-gray-400"
            />
            <Button className="shrink-0 rounded-full bg-emerald-700 px-8! py-2 h-12 text-white font-semibold hover:bg-emerald-800 transition">
              <Search className="w-5 h-5" />
              Cari Modul
            </Button>
          </div>
        </div>
      </div>

      <Navbar />
    </section>
  );
}
