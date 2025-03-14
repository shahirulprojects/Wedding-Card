"use client";

import React, { useEffect, useRef } from "react";

const ScreenProtection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // draw watermark pattern
    const drawWatermark = () => {
      if (!ctx || !canvas) return;

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // set watermark style
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.font = "16px Arial";

      // get current time for animation
      const time = new Date().getTime() / 1000;

      // draw watermark text in a grid pattern with slight movement
      for (let x = -50; x < canvas.width + 50; x += 150) {
        for (let y = -50; y < canvas.height + 50; y += 100) {
          // add subtle movement to make it harder to remove with image editing
          const offsetX = Math.sin(time + y * 0.01) * 10;
          const offsetY = Math.cos(time + x * 0.01) * 5;

          ctx.save();
          ctx.translate(x + offsetX, y + offsetY);
          ctx.rotate(-Math.PI / 4); // 45 degree angle
          ctx.fillText("© Hisham & Fatin", 0, 0);
          ctx.restore();
        }
      }

      // continue animation
      requestAnimationFrame(drawWatermark);
    };

    // start animation
    drawWatermark();

    // detect screenshot attempts using the Page Visibility API
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // user might be taking a screenshot or switching to screen recording app
        console.log("Visibility changed - possible screenshot attempt");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ScreenProtection;
