import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Raikan Hisham & Fatin",
  description:
    "Dengan penuh kesyukuran dan kegembiraan, kami menjemput tuan/puan untuk meraikan perkahwinan Hisham dan Fatin.",
  icons: "/icons/websitelogo.svg",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-1">
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
