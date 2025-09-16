import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export const BaseHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <header className="fixed z-10 flex min-h-24 w-full items-center justify-between gap-4 bg-white px-8 md:px-12">
      <Link className="flex items-center gap-2 font-bold select-none" href="/">
        <Clapperboard />
        <span className="hidden md:block">TV Stats</span>
      </Link>
      {children}
      <div />
    </header>
  );
};
