import React from "react";

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
