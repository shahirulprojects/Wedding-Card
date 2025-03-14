"use client";

import React, { useEffect } from "react";
import { initializeScreenProtection } from "@/lib/screenProtection";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeScreenProtection({
      watermarkText: "", // Empty string to disable watermark
      preventSelection: true,
      preventRightClick: true,
      preventKeyboardShortcuts: true,
      preventDrag: true,
      detectTools: true,
      preventIframe: true,
      onScreenshotAttempt: () => {
        // Handle screenshot attempt
        console.log("Screenshot attempt detected in layout");
      },
    });

    const handleBeforePrint = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      alert("Printing is disabled on this website.");
      return false;
    };

    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-1">
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
