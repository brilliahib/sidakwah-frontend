import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src={"/images/logo.png"}
                alt="Nusa Dakwah"
                width={150}
                height={150}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
