import Link from "next/link";
import { RollingText } from "@/components/RollingText";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-start justify-center px-4 py-20 md:px-8">
      <p className="font-koulen text-ember">404</p>
      <h1 className="mt-4 font-display text-[18vw] font-bold uppercase leading-[0.85] tracking-tightest md:text-[160px]">
        Lost
      </h1>
      <Link href="/" className="group mt-8 font-display text-3xl font-semibold tracking-tightest">
        <RollingText text="Back home" />
      </Link>
    </section>
  );
}
