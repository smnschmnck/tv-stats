import { BaseHeader } from "@/components/baseHeader";
import { SearchBarSmall } from "@/components/searchBarSmall";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col">
      <BaseHeader>
        <div className="w-128">
          <Suspense>
            <SearchBarSmall />
          </Suspense>
        </div>
      </BaseHeader>
      <div className="w-full h-full pt-24">{children}</div>
    </div>
  );
}
