"use client";
import HomeLayout from "@/app/(root)/(home)/layout";
import Actionbar from "@/components/actionbar";
import DetailSection from "@/components/detailsection";
import LandingSection from "@/components/landingsection";
import SpeechSection from "@/components/speechsection";
import TentativeSection from "@/components/tentativesection";
import React, { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showActionBar, setShowActionBar] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowActionBar(true);
  };

  return (
    <>
      <div className="relative w-full">
        {/* blurred background that's always visible */}
        <div className="fixed inset-0 bg-main-2 backdrop-blur-xl" />

        {/* content container with transition */}
        <div
          className={`relative w-full transition-all duration-700 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative">
            <LandingSection />
            <DetailSection />
            <TentativeSection />
            <SpeechSection />
          </div>
        </div>

        {/* button container with transition */}
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-700 ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <button
            onClick={handleOpen}
            className="px-8 py-3 text-white  font-semibold font-serif text-3xl"
          >
            Buka
          </button>
        </div>
      </div>
      {showActionBar && <Actionbar />}
    </>
  );
};

export default Home;
