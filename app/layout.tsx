import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Walimatul Urus - Hisham & Fatin",
  description: "Wedding invitation for Hisham & Fatin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          /* prevent selection of text */
          * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          /* ensure modal dialogs are always clickable */
          .screenshot-warning {
            pointer-events: auto !important;
          }
          
          .screenshot-warning button {
            pointer-events: auto !important;
            cursor: pointer !important;
          }
          
          /* prevent any interference with modal clicks */
          .screenshot-warning * {
            pointer-events: auto !important;
          }
        `}</style>
      </head>
      <body
        className={`${cormorant.variable} ${greatVibes.variable} font-serif`}
      >
        {children}
        <Toaster />

        <Script id="anti-screenshot-script" strategy="afterInteractive">
          {`
            // Global variable to track if a screenshot was attempted
            window.screenshotAttempted = false;
            
            // Function to handle screenshot attempts
            function handleScreenshotAttempt() {
              window.screenshotAttempted = true;
              
              // Dispatch a custom event that React components can listen for
              const event = new CustomEvent('screenshotAttempted');
              document.dispatchEvent(event);
              
              console.log('Screenshot attempt detected');
            }
            
            // detect print attempts (often used for screenshots)
            window.addEventListener('beforeprint', (e) => {
              e.preventDefault();
              handleScreenshotAttempt();
              alert('Printing is disabled on this website.');
              return false;
            });
            
            // detect keyboard shortcuts for screenshots
            document.addEventListener('keydown', (e) => {
              // Windows: Win+Shift+S, PrintScreen
              // Mac: Cmd+Shift+3, Cmd+Shift+4
              const isPrintScreen = e.key === 'PrintScreen';
              const isWindowsSnip = (e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 's';
              const isMacScreenshot = (e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4');
              
              if (isPrintScreen || isWindowsSnip || isMacScreenshot) {
                e.preventDefault();
                handleScreenshotAttempt();
                alert('Screenshots are not allowed on this website.');
                return false;
              }
            });
            
            // detect context menu (right-click)
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              return false;
            });
            
            // detect devtools (may be used for bypassing protections)
            function detectDevTools() {
              const widthThreshold = window.outerWidth - window.innerWidth > 160;
              const heightThreshold = window.outerHeight - window.innerHeight > 160;
              
              if (widthThreshold || heightThreshold) {
                handleScreenshotAttempt();
                document.body.innerHTML = '<div style="text-align:center;padding:50px;">Developer tools are not allowed on this website.</div>';
              }
            }
            
            setInterval(detectDevTools, 1000);
            
            // detect page visibility changes (tab switching during recording)
            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'hidden') {
                // user switched tabs, could be to start a recording
                handleScreenshotAttempt();
              }
            });
            
            // Additional detection methods
            
            // Listen for clipboard operations
            document.addEventListener('copy', (e) => {
              handleScreenshotAttempt();
              e.preventDefault();
              return false;
            }, { capture: true });
            
            // Listen for mouse events that might indicate screenshot attempts
            document.addEventListener('mousedown', (e) => {
              if (e.button === 2 || (e.ctrlKey && e.button === 0)) {
                // Right-click or Ctrl+click might be used for screenshots
                setTimeout(handleScreenshotAttempt, 100);
              }
            });
            
            // Listen for the custom event in case React components need to know about screenshot attempts
            document.addEventListener('screenshotAttempted', () => {
              console.log('Screenshot attempt event received');
              
              // Make sure any warning dialog is clickable
              setTimeout(() => {
                const warningElements = document.querySelectorAll('.screenshot-warning, .screenshot-warning *');
                warningElements.forEach(el => {
                  if (el instanceof HTMLElement) {
                    el.style.pointerEvents = 'auto';
                    if (el.tagName === 'BUTTON') {
                      el.style.cursor = 'pointer';
                    }
                  }
                });
              }, 100);
            });
          `}
        </Script>
      </body>
    </html>
  );
}
