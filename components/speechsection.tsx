import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { guestMessages, themeColors } from "@/constants";
import Image from "next/image";

const SpeechSection = () => {
  // Function to trigger the speech form in action bar
  const handleWriteSpeech = () => {
    if (typeof window !== "undefined" && (window as any).openSpeechForm) {
      (window as any).openSpeechForm();
    }
  };

  return (
    <div
      style={{ backgroundColor: themeColors.background }}
      className="min-h-screen flex w-full items-center justify-center py-20 px-4 mt-[-100px] mb-10"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Flower Speech Decoration */}
          <div className="items-center justify-center flex -top-24 w-full h-40 -m-10 ml-1">
            <Image
              src="/icons/flowerspeech.svg"
              alt="flower speech"
              width={100}
              height={100}
              className="opacity-90"
            />
          </div>

          <h2
            style={{ color: themeColors.yellow }}
            className="font-script text-4xl mb-4 tracking-wider relative z-10"
          >
            Ucapan
          </h2>
          <div
            style={{ backgroundColor: themeColors.accent }}
            className="w-32 h-1 mx-auto rounded-full"
          />
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {guestMessages.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ backgroundColor: themeColors.container }}
                  className="backdrop-blur-sm p-6 rounded-xl shadow-lg h-full flex flex-col"
                >
                  <div className="flex-1">
                    <p
                      style={{ color: themeColors.text.primary }}
                      className="font-serif italic mb-4"
                    >
                      "{item.message}"
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#92B4CD]/20">
                    {item.author && (
                      <p
                        style={{ color: themeColors.text.secondary }}
                        className="font-serif text-right"
                      >
                        - {item.author}
                      </p>
                    )}
                    {item.hashtag && (
                      <p
                        style={{ color: themeColors.text.secondary }}
                        className="font-serif text-right"
                      >
                        {item.hashtag}
                      </p>
                    )}
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleWriteSpeech}
            style={{ backgroundColor: themeColors.primary }}
            className="text-white px-8 py-3 rounded-full font-serif hover:bg-[#40916C] transition-colors"
          >
            Tulis Ucapan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeechSection;
