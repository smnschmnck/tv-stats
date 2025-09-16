import { BaseHeader } from "@/components/baseHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col">
      <BaseHeader />
      <div className="w-full h-full pt-24">{children}</div>
    </div>
  );
}
