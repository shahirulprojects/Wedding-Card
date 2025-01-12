"use client";
import { actionBarContent } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

const Actionbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <div className="bg-main-1 border-t border-gray-300 fixed bottom-0 left-0 right-0 shadow-lg text-green-600">
      <div className="flex justify-around p-4">
        {actionBarContent.map((item) => {
          return (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center gap-2"
              onClick={handleOpen}
            >
              <Image
                src={item.imgUrl}
                alt={item.label}
                width={25}
                height={25}
              />
              <p>{item.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Actionbar;
