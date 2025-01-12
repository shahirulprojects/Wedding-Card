import Actionbar from "@/components/actionbar";
import React from "react";

// layout component for the home section that accepts an optional showActionBar prop
export default function HomeLayout({
  children,
  showActionBar = false,
}: {
  children: React.ReactNode;
  showActionBar?: boolean;
} & {
  // this ensures the component is recognized as a valid Next.js layout
  params?: Record<string, string>;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-1">
        <div className="w-full">{children}</div>
      </section>
      {showActionBar && <Actionbar />}
    </main>
  );
}
