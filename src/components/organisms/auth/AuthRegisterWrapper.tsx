import FormAuthRegister from "@/components/molecules/form/auth/FormAuthRegister";
import Image from "next/image";
import Link from "next/link";

export default function AuthRegisterWrapper() {
  return (
    <div className="relative min-h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="
          bg-muted relative flex flex-col text-white
          h-[250px] p-6
          lg:h-full lg:p-10
          dark:border-r
        "
      >
        <div className="bg-auth-pattern absolute inset-0 bg-cover bg-center bg-no-repeat grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="relative z-20 flex items-center gap-x-3 text-lg font-medium">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Nusa Dakwah"
              width={150}
              height={30}
              priority
            />
          </Link>
        </div>

        <div className="relative z-20 mt-auto hidden lg:block">
          <blockquote className="space-y-2">
            <p className="max-w-md text-lg">
              &ldquo;Menjalankan dakwah dengan teknologi untuk menjangkau lebih
              banyak jiwa.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-1 items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center gap-y-4 sm:w-[350px]">
          <FormAuthRegister />
        </div>
      </div>
    </div>
  );
}
