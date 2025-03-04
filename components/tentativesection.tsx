import React from "react";
import { motion } from "framer-motion";
import { weddingInfo, themeColors } from "@/constants";
import Image from "next/image";

const TimelineItem = ({ time, event }: { time: string; event: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex gap-8 items-center relative"
  >
    <div className="w-32 text-right">
      <span
        style={{ color: themeColors.text.secondary }}
        className="font-serif"
      >
        {time}
      </span>
    </div>
    <div className="relative">
      <div
        style={{ backgroundColor: themeColors.accent }}
        className="w-4 h-4 rounded-full absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        style={{ backgroundColor: themeColors.accent }}
        className="w-0.5 h-full absolute left-0 top-0 -translate-x-1/2"
      />
    </div>
    <div
      style={{ backgroundColor: themeColors.container }}
      className="flex-1 backdrop-blur-sm p-4 rounded-xl shadow-sm"
    >
      <p style={{ color: themeColors.text.primary }} className="font-serif">
        {event}
      </p>
    </div>
  </motion.div>
);

const TentativeSection = () => {
  return (
    <div className="min-h-screen flex w-full items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Islamic pattern backgrounds - positioned at back with z-index */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Islamic pattern background as middle layer - full opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] bg-repeat" />

        {/* No gradient overlay */}
      </div>

      <div className="max-w-4xl w-full relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
          style={{ zIndex: 10 }}
        >
          <h2
            style={{ color: themeColors.yellow, opacity: 1 }}
            className="font-script text-4xl mb-4 tracking-wider"
          >
            Aturcara Majlis
          </h2>
          <div
            style={{ backgroundColor: themeColors.accent }}
            className="w-32 h-1 mx-auto rounded-full"
          />
        </motion.div>

        <div className="space-y-12">
          {weddingInfo.schedule.map((item, index) => (
            <TimelineItem key={index} time={item.time} event={item.event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TentativeSection;
