"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { themeColors } from "@/constants";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Speech {
  id: number;
  name: string;
  speech: string;
  imageUrl?: string;
  createdAt: string;
}

export const SpeechSection = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchSpeeches();
  }, []);

  const fetchSpeeches = async () => {
    try {
      const response = await fetch("/api/speeches");
      if (!response.ok) throw new Error("Failed to fetch speeches");
      const data = await response.json();
      setSpeeches(data);
    } catch (error) {
      console.error("Error fetching speeches:", error);
    }
  };

  // Make fetchSpeeches available globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).refreshSpeeches = fetchSpeeches;
    }
  }, []);

  // Function to trigger the speech form in action bar
  const handleWriteSpeech = () => {
    if (typeof window !== "undefined" && (window as any).openSpeechForm) {
      (window as any).openSpeechForm();
    }
  };

  return (
    <div
      id="speeches-section"
      style={{ backgroundColor: themeColors.background }}
      className="mb-10 min-h-screen flex w-full items-center justify-center py-20 px-4 relative overflow-hidden"
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

        {speeches.length > 0 ? (
          <div className="w-full max-w-4xl py-8">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 1500,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {speeches.map((speech) => (
                  <CarouselItem
                    key={speech.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      style={{ backgroundColor: themeColors.container }}
                      className="h-full rounded-lg border border-[#C49D83] p-6 flex flex-col"
                    >
                      {speech.imageUrl && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="mb-4 h-48 w-full overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105">
                              <img
                                src={speech.imageUrl}
                                alt={`${speech.name}'s image`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] max-h-[95vh] p-4 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                            <VisuallyHidden>
                              <DialogTitle>
                                Gambar dari {speech.name}
                              </DialogTitle>
                            </VisuallyHidden>
                            <div className="relative w-auto h-auto max-w-full max-h-[85vh] overflow-auto">
                              <img
                                src={speech.imageUrl}
                                alt={`${speech.name}'s image`}
                                className="block w-auto h-auto max-w-none"
                                style={{ margin: "auto" }}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <div className="flex-1">
                        <h3
                          style={{ color: themeColors.text.primary }}
                          className="mb-2 text-lg font-semibold"
                        >
                          {speech.name}
                        </h3>
                        <p
                          style={{ color: themeColors.text.secondary }}
                          className="font-serif italic"
                        >
                          "{speech.speech}"
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-8"
          >
            <p
              style={{ color: themeColors.text.secondary }}
              className="text-lg font-serif italic"
            >
              Tiada Ucapan Lagi
            </p>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          onClick={handleWriteSpeech}
          style={{ backgroundColor: themeColors.primary }}
          className="mt-8 mx-auto block text-white px-8 py-3 rounded-full font-serif hover:bg-[#40916C] transition-colors"
        >
          Tulis Ucapan
        </motion.button>
      </div>
    </div>
  );
};
