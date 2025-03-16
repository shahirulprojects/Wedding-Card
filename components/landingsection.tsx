import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { themeColors, weddingInfo } from "@/constants";

const LandingSection = () => {
  return (
    <div className="min-h-screen flex w-full items-center justify-center flex-col relative overflow-hidden">
      {/* Islamic pattern backgrounds - positioned at back with z-index */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Islamic pattern background as middle layer - full opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] bg-repeat opacity-30" />

        {/* No gradient overlay */}
      </div>

      {/* main content frame - higher z-index to appear above patterns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundColor: themeColors.container, zIndex: 10 }}
        className="  rounded-3xl shadow-lg  mx-4 relative"
      >
        {/* decorative ornament */}
        {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/ornaments/top-ornament.png"
            alt="ornament"
            width={120}
            height={60}
            className="opacity-80"
          />
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center flex-col flex justify-center items-center px-20 bg-[url('/icons/whiteflowerbg.png')] bg-no-repeat bg-center bg-cover"
        >
          <Image
            src="/icons/weddinglogowhite.png"
            alt="weddinglogowhite"
            width={120}
            height={60}
          />
          <h3
            style={{ color: themeColors.text.fourth }}
            className="text-xl mb-6 tracking-wider font-bold"
          >
            WALIMATUL URUS
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-8"
          >
            <h1
              style={{ color: themeColors.text.primary }}
              className="font-script text-6xl mb-4"
            >
              {weddingInfo.brideAndGroom.groom}
            </h1>
            <span
              style={{ color: themeColors.text.primary }}
              className="font-serif text-2xl"
            >
              &
            </span>
            <h1
              style={{ color: themeColors.text.primary }}
              className="font-script text-6xl mt-4"
            >
              {weddingInfo.brideAndGroom.bride}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col py-4 space-y-0"
          >
            <p
              style={{ color: themeColors.text.fourth }}
              className="text-lg font-extrabold mb-0 leading-tight"
            >
              {weddingInfo.date.date}
            </p>
            <p
              style={{ color: themeColors.text.fourth }}
              className="text-lg mb-0 leading-tight"
            >
              {weddingInfo.venue.name}
            </p>
            <p
              style={{ color: themeColors.text.fourth }}
              className="text-lg mb-0 leading-tight"
            >
              {weddingInfo.venue.address.line1}
            </p>
          </motion.div>
        </motion.div>

        {/* decorative ornament bottom */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-180">
          <Image
            src="/ornaments/top-ornament.png"
            alt="ornament"
            width={120}
            height={60}
            className="opacity-80"
          />
        </div> */}
      </motion.div>
    </div>
  );
};

export default LandingSection;
