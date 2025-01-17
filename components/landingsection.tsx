import Image from "next/image";
import React from "react";

const LandingSection = () => {
  return (
    <div className="bg-main-2 min-h-screen flex w-full items-center justify-center flex-col">
      {/* <Image
        src="/icons/weddinghome.png"
        alt="halamanutama"
        width={300}
        height={300}
        className="items-center justify-center flex"
      /> */}
      <p className="text-center text-white font-bold text-xl">WALIMATUL URUS</p>
      <h1 className="text-center text-white font-bold text-3xl mt-11 mb-11">
        Hisham <br />
        & <br />
        Fatin
      </h1>
      <p className="text-center text-white font-bold text-xl">SABTU 01.05.25</p>
      <p className="text-center text-white font-bold text-xl">
        Dewan ABC, Negeri ABC
      </p>
    </div>
  );
};

export default LandingSection;
