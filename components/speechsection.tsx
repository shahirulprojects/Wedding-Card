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
import { Loader2 } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSpeeches();
  }, []);

  const fetchSpeeches = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/speeches");
      if (!response.ok) throw new Error("Failed to fetch speeches");
      const data = await response.json();
      setSpeeches(data);
    } catch (error) {
      console.error("Error fetching speeches:", error);
    } finally {
      setIsLoading(false);
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
      className="mb-10 min-h-screen flex w-full items-center justify-center py-20 px-4 relative overflow-hidden"
    >
      {/* Islamic pattern backgrounds - positioned at back with z-index */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Islamic pattern background as middle layer - full opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] bg-repeat" />

        {/* Light gradient overlay for content readability without hiding patterns */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA]/50 via-[#F5F7FA]/40 to-[#F5F7FA]/50" />
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
          {/* Flower Speech Decoration */}
          <div
            className="items-center justify-center flex -top-24 w-full h-40 -m-10 ml-1 relative"
            style={{ zIndex: 10 }}
          >
            <Image
              src="/icons/flowerspeech.svg"
              alt="flower speech"
              width={100}
              height={100}
              className="opacity-90"
            />
          </div>

          <h2
            style={{ color: themeColors.yellow, opacity: 1 }}
            className="font-script text-4xl mb-4 tracking-wider relative z-10"
          >
            Ucapan
          </h2>
          <div
            style={{ backgroundColor: themeColors.accent }}
            className="w-32 h-1 mx-auto rounded-full"
          />
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-8 flex flex-col items-center gap-4"
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: themeColors.text.secondary }}
            />
            <p
              style={{ color: themeColors.text.secondary }}
              className="text-lg font-serif italic"
            >
              Memuat ucapan...
            </p>
          </motion.div>
        ) : speeches.length > 0 ? (
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
                            <div className="mb-4 h-48 w-full overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105 relative z-20">
                              <img
                                src={speech.imageUrl}
                                alt={`${speech.name}'s image`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] max-h-[95vh] p-4 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                            <VisuallyHidden>
                              <DialogTitle>
                                Gambar dari {speech.name}
                              </DialogTitle>
                            </VisuallyHidden>
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={speech.imageUrl}
                                alt={`${speech.name}'s image`}
                                className="max-w-full max-h-[80vh] object-contain"
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
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-20" />
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
          style={{
            backgroundColor: themeColors.primary,
            position: "relative",
            zIndex: 20,
          }}
          className="mt-8 mx-auto block text-white px-8 py-3 rounded-full font-serif hover:bg-[#40916C] transition-colors"
        >
          Tulis Ucapan
        </motion.button>
      </div>
    </div>
  );
};
