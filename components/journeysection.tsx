import { loveJourney, themeColors } from "@/constants";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CarouselContentImage,
  CarouselImage,
  CarouselItemImage,
  CarouselNextImage,
  CarouselPreviousImage,
} from "./ui/carouselimage";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// custom hook to check if image is horizontal
const useImageOrientation = (src: string) => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.onload = () => {
      // if width is greater than height, it's horizontal
      setIsHorizontal(img.width > img.height);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { isHorizontal, isLoaded };
};

interface ImageWithOrientationProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImageWithOrientation: React.FC<ImageWithOrientationProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const { isHorizontal, isLoaded } = useImageOrientation(src);

  return (
    <div
      className={`relative flex items-center justify-center w-full ${
        isHorizontal ? "h-full" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isHorizontal ? "object-contain max-h-full" : "object-contain h-full"
        }`}
      />
    </div>
  );
};

const JourneySection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Islamic pattern backgrounds - positioned at back with z-index */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Islamic pattern background as middle layer - full opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] bg-repeat opacity-30" />

        {/* No gradient overlay */}
      </div>

      <h2
        style={{ color: themeColors.text.primary, opacity: 1 }}
        className="font-script text-4xl mb-4 tracking-wider relative z-10 text-center"
      >
        Perjalanan Cinta
      </h2>
      <div
        style={{ backgroundColor: themeColors.primary }}
        className="w-32 h-1 mx-auto rounded-full"
      />
      <div className="flex justify-center items-center mt-6 slide-from-right">
        <Carousel className="w-full max-w-xl max-sm:max-w-xs">
          <CarouselContent className="-ml-1">
            {loveJourney.map((journey) => (
              <CarouselItem
                key={journey.title}
                className="pl-1 md:basis-1/2 lg:basis-full"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex-col aspect-square items-center justify-center p-6">
                      {/* Nested Carousel for Images */}
                      <CarouselImage className="w-full relative">
                        <CarouselContentImage className="-ml-1">
                          {journey.imgUrl?.map((image, index) => (
                            <CarouselItemImage
                              key={`${journey.title}-${index}`}
                              className="pl-1 md:basis-1/2 lg:basis-full"
                            >
                              <div className="p-1 h-full flex items-center justify-center">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className="flex justify-center items-center cursor-pointer transition-transform hover:scale-105 relative z-20 h-full">
                                      <ImageWithOrientation
                                        src={image}
                                        alt={journey.title}
                                        width={290}
                                        height={290}
                                        className="rounded-lg"
                                      />
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-[95vw] max-h-[95vh] p-4 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                                    <VisuallyHidden>
                                      <DialogTitle>
                                        Gambar dari {journey.title}
                                      </DialogTitle>
                                    </VisuallyHidden>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                      <img
                                        src={image}
                                        alt={journey.title}
                                        className="max-w-full max-h-[80vh] object-contain"
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </CarouselItemImage>
                          ))}
                        </CarouselContentImage>
                        <CarouselPreviousImage className="absolute left-1 top-1/2 -translate-y-1/2 z-20" />
                        <CarouselNextImage className="absolute right-1 top-1/2 -translate-y-1/2 z-20" />
                      </CarouselImage>
                      <h1 className="font-extrabold text-pink-800 mt-5">
                        {journey.title}
                      </h1>
                      <p className="font-extralight italic text-pink-800">
                        {journey.date}
                      </p>
                      <ul className="my-5 list-disc ml-5 space-y-2">
                        {journey.descriptions?.map((description, index) => (
                          <li
                            key={`experience-point-${index}`}
                            className="text-main-2 font-normal pl-1 text-sm text-justify"
                          >
                            <p className="text-main-2">{description}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute  top-1/2 -translate-y-1/2 z-20 sm:left-2 -left-3" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 z-20 sm:right-2 -right-3" />
        </Carousel>
      </div>
    </div>
  );
};

export default JourneySection;
