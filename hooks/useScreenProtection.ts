"use client";

import { useEffect, useState, useCallback } from "react";
import {
  initializeScreenProtection,
  detectScreenCapture,
} from "@/lib/screenProtection";

interface ScreenProtectionOptions {
  watermarkText?: string;
  preventSelection?: boolean;
  preventRightClick?: boolean;
  preventKeyboardShortcuts?: boolean;
  preventDrag?: boolean;
  detectTools?: boolean;
  preventIframe?: boolean;
  onScreenshotAttempt?: () => void;
}

export const useScreenProtection = (options: ScreenProtectionOptions = {}) => {
  const [isScreenshotAttempted, setIsScreenshotAttempted] = useState(false);

  // Create a stable callback that won't change on re-renders
  const handleScreenshotAttempt = useCallback(() => {
    setIsScreenshotAttempted(true);
    if (options.onScreenshotAttempt) {
      options.onScreenshotAttempt();
    }
  }, [options.onScreenshotAttempt]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // initialize all protection methods with our callback
    initializeScreenProtection({
      watermarkText: options.watermarkText || "", // Default to empty string to disable watermark
      preventSelection: options.preventSelection !== false,
      preventRightClick: options.preventRightClick !== false,
      preventKeyboardShortcuts: options.preventKeyboardShortcuts !== false,
      preventDrag: options.preventDrag !== false,
      detectTools: options.detectTools !== false,
      preventIframe: options.preventIframe !== false,
      onScreenshotAttempt: handleScreenshotAttempt,
    });

    // Listen for the custom screenshotAttempted event
    const handleCustomEvent = () => {
      handleScreenshotAttempt();
    };

    document.addEventListener("screenshotAttempted", handleCustomEvent);

    // detect screenshot attempts using the Page Visibility API
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // user might be taking a screenshot
        handleScreenshotAttempt();
      }
    };

    // detect print attempts (often used for screenshots)
    const handleBeforePrint = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      handleScreenshotAttempt();
      alert("Printing is disabled on this website.");
      return false;
    };

    // check for unusual window dimensions periodically
    const checkScreenCapture = () => {
      if (detectScreenCapture()) {
        handleScreenshotAttempt();
      }
    };

    // set up event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeprint", handleBeforePrint);
    const intervalId = setInterval(checkScreenCapture, 1000);

    // Add additional event listeners for more immediate detection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for common screenshot key combinations
      const isPrintScreen = e.key === "PrintScreen";
      const isWindowsSnip =
        (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s";
      const isMacScreenshot =
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === "3" || e.key === "4" || e.key === "5");

      if (isPrintScreen || isWindowsSnip || isMacScreenshot) {
        handleScreenshotAttempt();
      }
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });

    // cleanup
    return () => {
      document.removeEventListener("screenshotAttempted", handleCustomEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeprint", handleBeforePrint);
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      clearInterval(intervalId);
    };
  }, [
    handleScreenshotAttempt,
    options.detectTools,
    options.preventDrag,
    options.preventIframe,
    options.preventKeyboardShortcuts,
    options.preventRightClick,
    options.preventSelection,
    options.watermarkText,
  ]);

  // Function to reset the screenshot attempted state
  const resetScreenshotAttempted = useCallback(() => {
    setIsScreenshotAttempted(false);
  }, []);

  return {
    isScreenshotAttempted,
    resetScreenshotAttempted,
  };
};
