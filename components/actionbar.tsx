"use client";
import { actionBar, ContactContent, LocationContent } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleCheck } from "lucide-react";

const Actionbar = () => {
  // state to manage copy feedback
  const [copySuccess, setCopySuccess] = useState(false);

  // helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true); // feedback message
      setTimeout(() => setCopySuccess(false), 2000); // clear message after 2 seconds
    });
  };

  // helper function to check if item has location links
  const hasLocationLinks = (item: LocationContent) => {
    return "googleMapsLink" in item || "wazeLink" in item;
  };

  // helper function to check if item has contact links
  const hasContactLinks = (item: ContactContent) => {
    return "whatsappLink" in item || "phoneLink" in item;
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
                      {/* Name and copy button container */}
                      <div
                        className={`${
                          "googleMapsLink" in contentItem
                            ? "flex items-center gap-2"
                            : "flex flex-col"
                        }`}
                      >
                        {/* Copy button only for LocationContent */}
                        {"googleMapsLink" in contentItem && (
                          <button
                            onClick={() => copyToClipboard(contentItem.name)}
                            className="flex-shrink-0"
                          >
                            {copySuccess ? (
                              // show CircleCheck icon when copy is successful
                              <CircleCheck className="text-green-500" />
                            ) : (
                              // show copy icon when not copied
                              <Image
                                src="/icons/copy.svg"
                                alt="copy"
                                width={20}
                                height={20}
                              />
                            )}
                          </button>
                        )}
                        <div className="flex flex-col">
                          {contentItem.name.split("\n").map((line, i) => (
                            <p key={i} className="font-medium">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
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
                              width={40}
                              height={40}
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
