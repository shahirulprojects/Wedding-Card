"use client";
import HomeLayout from "@/app/(root)/(home)/layout";
import Actionbar from "@/components/actionbar";
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
      <HomeLayout>
        <div className="relative h-screen w-full overflow-hidden">
          {/* blurred background that's always visible */}
          <div className="absolute inset-0 bg-main-2 backdrop-blur-xl" />

          {/* content container with transition */}
          <div
            className={`relative h-full w-full transition-all duration-700 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-white text-black font-bold h-screen w-full flex items-center justify-center">
              Perkahwinan Hisham Dan Fatin
            </div>
          </div>

          {/* button container with transition */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <button
              onClick={handleOpen}
              className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold 
                       hover:bg-opacity-90 transition-colors duration-300
                       shadow-lg text-lg"
            >
              Buka
            </button>
          </div>
        </div>
      </HomeLayout>
      {showActionBar && <Actionbar />}
    </>
  );
};

export default Home;
