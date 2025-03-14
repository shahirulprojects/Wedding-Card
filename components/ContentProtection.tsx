"use client";

import React, { useState, useEffect } from "react";

interface ContentProtectionProps {
  children: React.ReactNode;
}

const ContentProtection: React.FC<ContentProtectionProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // detect potential screen recording
    const checkRecording = () => {
      // check if any media devices are active (might indicate recording)
      if (
        navigator.mediaDevices &&
        "getDisplayMedia" in navigator.mediaDevices
      ) {
        // this is just a heuristic, not foolproof
        const unusualWindowSize =
          window.outerHeight - window.innerHeight > 200 ||
          window.outerWidth - window.innerWidth > 200;

        if (unusualWindowSize) {
          setIsRecording(true);
        } else {
          setIsRecording(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    const intervalId = setInterval(checkRecording, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  // calculate blur amount based on distance from mouse
  const getBlurStyle = (x: number, y: number) => {
    if (isRecording) {
      // apply maximum blur if recording is detected
      return { filter: "blur(10px)" };
    }

    const distance = Math.sqrt(
      Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
    );

    // only content near the mouse cursor is clear
    const blurAmount = Math.min(Math.max(distance - 100, 0) * 0.05, 5);

    return {
      filter: `blur(${blurAmount}px)`,
      transition: "filter 0.1s ease-out",
    };
  };

  // divide content into a grid of protectable sections
  const createProtectedGrid = () => {
    const gridSize = 3; // 3x3 grid
    const sections = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // calculate position for this grid cell
        const x = (window.innerWidth / gridSize) * (j + 0.5);
        const y = (window.innerHeight / gridSize) * (i + 0.5);

        sections.push(
          <div
            key={`${i}-${j}`}
            style={{
              position: "relative",
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              float: "left",
              ...getBlurStyle(x, y),
            }}
          >
            {/* Clone children for each section to maintain layout */}
            {React.Children.map(children, (child) =>
              React.isValidElement(child) ? React.cloneElement(child) : child
            )}
          </div>
        );
      }
    }

    return sections;
  };

  // warning message if recording is detected
  const recordingWarning = isRecording ? (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        zIndex: 10000,
        textAlign: "center",
      }}
    >
      Screen recording detected!
      <br />
      Please respect our content protection policy.
    </div>
  ) : null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {createProtectedGrid()}
      {recordingWarning}
    </div>
  );
};

export default ContentProtection;
