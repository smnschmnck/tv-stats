import { SearchBarSmall } from "@/components/searchBarSmall";
import { Clapperboard, Settings } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="min-h-24 w-full md:px-12 px-8 gap-4 items-center justify-between flex fixed bg-white/75 backdrop-blur-md">
      <Link className="font-bold flex items-center gap-2 select-none" href="/">
        <Clapperboard />
        <span className="md:block hidden">TV Stats</span>
      </Link>
      <div className="w-128">
        <Suspense>
          <SearchBarSmall />
        </Suspense>
      </div>
      <div className="text-zinc-500">
        <Settings />
      </div>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="w-full h-full pt-24">{children}</div>
    </div>
  );
}
