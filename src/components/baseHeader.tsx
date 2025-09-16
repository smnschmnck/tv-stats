import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export const BaseHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <header className="min-h-24 w-full z-10 md:px-12 px-8 items-center justify-between flex fixed bg-white">
      <Link className="font-bold flex items-center gap-2 select-none" href="/">
        <Clapperboard />
        <span className="md:block hidden">TV Stats</span>
      </Link>
      {children}
      <div />
    </header>
  );
};
