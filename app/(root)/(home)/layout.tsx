import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Raikan Hisham & Fatin",
  description:
    "Dengan penuh kesyukuran dan kegembiraan, kami menjemput tuan/puan untuk meraikan perkahwinan Hisham dan Fatin.",
  icons: {
    icon: [
      {
        url: "/icons/websitelogo.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <head>
        <link rel="icon" href="/icons/websitelogo.svg" type="image/svg+xml" />
      </head>
      <section className="flex-1">
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
