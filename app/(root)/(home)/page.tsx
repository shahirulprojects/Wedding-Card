"use client";
import HomeLayout from "@/app/(root)/(home)/layout";
import Actionbar from "@/components/actionbar";
import DetailSection from "@/components/detailsection";
import LandingSection from "@/components/landingsection";
import { SpeechSection } from "@/components/speechsection";
import TentativeSection from "@/components/tentativesection";
import { themeColors } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showActionBar, setShowActionBar] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll to show/hide action bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 100); // Show after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    // Action bar will show only after scrolling
  };

  return (
    <>
      <div className="relative w-full">
        {/* Base background */}
        <div
          style={{ backgroundColor: themeColors.background }}
          className="fixed inset-0 overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1B4332]/30 to-[#1B4332] animate-gradient" />
        </div>

        {/* Door animation container */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-[100]"
              initial={false}
            >
              {/* Left door */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "-100%" : 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                style={{ backgroundColor: themeColors.primary }}
                className="absolute left-0 w-1/2 h-full shadow-2xl"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 blur-sm" />
              </motion.div>

              {/* Right door */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "100%" : 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                style={{ backgroundColor: themeColors.primary }}
                className="absolute right-0 w-1/2 h-full shadow-2xl"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 blur-sm" />
              </motion.div>

              {/* Center content */}
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h1
                    style={{ color: themeColors.yellowtoo }}
                    className="font-script text-5xl mb-4"
                  >
                    Walimatul Urus
                  </h1>
                  <p className="text-white/90 text-xl font-serif">
                    Undangan Istimewa
                  </p>
                </motion.div>

                <motion.button
                  onClick={handleOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 overflow-hidden rounded-full"
                >
                  {/* Button background */}
                  <div className="absolute inset-0 bg-yellow-500 transition-transform group-hover:scale-105" />
                  {/* Button shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 group-hover:animate-shine" />
                  {/* Button text */}
                  <span className="relative text-white font-serif text-xl tracking-wider">
                    Buka Undangan
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full"
        >
          {/* Content wrapper with Islamic pattern background */}
          <div className="relative w-full">
            {/* Content sections */}
            <div className="relative">
              <LandingSection />
              <DetailSection />
              <TentativeSection />
              <SpeechSection />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action bar with scroll-based visibility */}
      {isOpen && hasScrolled && <Actionbar />}
    </>
  );
};

export default Home;
