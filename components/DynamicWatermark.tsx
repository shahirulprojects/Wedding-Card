"use client";

import React, { useEffect, useRef } from "react";

interface DynamicWatermarkProps {
  text?: string;
  opacity?: number;
  density?: number;
  speed?: number;
}

const DynamicWatermark: React.FC<DynamicWatermarkProps> = ({
  text = "© Hisham & Fatin",
  opacity = 0.05,
  density = 1,
  speed = 1,
}) => {
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

    // create watermark pattern
    let offset = 0;

    const drawWatermark = () => {
      if (!ctx || !canvas) return;

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // set watermark style
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.font = "16px Arial";

      // calculate grid spacing based on density
      const spacingX = 200 / density;
      const spacingY = 150 / density;

      // update offset for animation
      offset += 0.2 * speed;
      if (offset > 1000) offset = 0;

      // draw watermark text in a grid pattern with movement
      for (let x = -100; x < canvas.width + 100; x += spacingX) {
        for (let y = -100; y < canvas.height + 100; y += spacingY) {
          // add subtle movement to make it harder to remove with image editing
          const time = Date.now() / 1000;
          const offsetX = Math.sin(time * 0.5 + y * 0.01) * 10 * speed;
          const offsetY = Math.cos(time * 0.5 + x * 0.01) * 5 * speed;

          // alternate text direction and size for more complexity
          const row = Math.floor(y / spacingY);
          const col = Math.floor(x / spacingX);
          const isAlternate = (row + col) % 2 === 0;

          ctx.save();
          ctx.translate(x + offsetX, y + offsetY);

          if (isAlternate) {
            ctx.rotate(-Math.PI / 4); // 45 degree angle
            ctx.font = "14px Arial";
          } else {
            ctx.rotate(Math.PI / 4); // -45 degree angle
            ctx.font = "18px Arial";
          }

          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }

      // continue animation
      requestAnimationFrame(drawWatermark);
    };

    // start animation
    const animationId = requestAnimationFrame(drawWatermark);

    // cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [text, opacity, density, speed]);

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
      aria-hidden="true"
    />
  );
};

export default DynamicWatermark;
