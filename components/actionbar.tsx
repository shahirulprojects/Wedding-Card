"use client";
import { actionBar } from "@/constants";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Actionbar = () => {
  // helper function to check if item has location links
  const hasLocationLinks = (item: any) => {
    return item.googleMapsLink || item.wazeLink;
  };

  // helper function to check if item has contact links
  const hasContactLinks = (item: any) => {
    return item.whatsappLink || item.phoneLink;
  };

  return (
    <div className="bg-main-1 border-t border-gray-300 fixed bottom-0 left-0 right-0 shadow-lg text-green-600">
      <div className="flex justify-around p-4">
        {actionBar.map((item) => (
          <Popover key={item.label}>
            <PopoverTrigger>
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={item.imgUrl}
                  alt={item.label}
                  width={25}
                  height={25}
                />
                {item.label}
              </div>
            </PopoverTrigger>

            {item.content && (
              <PopoverContent className="mb-6 ml-2 w-full">
                <h1 className="text-center font-bold mb-4 text-main-2">
                  {item.label.toUpperCase()}
                </h1>
                {item.content.map((contentItem, index) => (
                  <div
                    key={index}
                    className="mb-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex flex-col mb-2">
                      <p className="font-medium">{contentItem.name}</p>
                      {/* only show title if it exists */}
                      {"title" in contentItem && contentItem.title && (
                        <p className="text-gray-400 italic">
                          {contentItem.title}
                        </p>
                      )}
                    </div>

                    {/* Contact links */}
                    {hasContactLinks(contentItem) && (
                      <div className="flex gap-2">
                        {"whatsappLink" in contentItem &&
                          contentItem.whatsappLink && (
                            <a
                              href={contentItem.whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-600"
                            >
                              <Image
                                src="/icons/whatsapp.svg"
                                alt="WhatsApp"
                                width={30}
                                height={30}
                              />
                            </a>
                          )}
                        {"phoneLink" in contentItem &&
                          contentItem.phoneLink && (
                            <a
                              href={contentItem.phoneLink}
                              className="flex items-center gap-2 text-blue-600"
                            >
                              <Image
                                src="/icons/call.svg"
                                alt="Call"
                                width={30}
                                height={30}
                              />
                            </a>
                          )}
                      </div>
                    )}

                    {/* Location links */}
                    {hasLocationLinks(contentItem) && (
                      <div className="flex gap-4 mb-3">
                        {"googleMapsLink" in contentItem &&
                          contentItem.googleMapsLink && (
                            <a
                              href={contentItem.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 text-red-600"
                            >
                              <Image
                                src="/icons/googlemaps.svg"
                                alt="Google Maps"
                                width={30}
                                height={30}
                              />
                            </a>
                          )}
                        {"wazeLink" in contentItem && contentItem.wazeLink && (
                          <a
                            href={contentItem.wazeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-blue-600"
                          >
                            <Image
                              src="/icons/waze.svg"
                              alt="Waze"
                              width={30}
                              height={30}
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </PopoverContent>
            )}
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default Actionbar;
