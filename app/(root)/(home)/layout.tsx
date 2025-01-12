import Actionbar from "@/components/actionbar";
import React from "react";

// layout component for the home section
export default function HomeLayout({
  children,
  showActionBar = false,
}: {
  children: React.ReactNode;
  showActionBar?: boolean;
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
