"use client";
import {
  actionBar,
  ContactContent,
  LocationContent,
  RSVPContent,
  SpeechContent,
} from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleCheck, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Actionbar = () => {
  // state to manage copy feedback and forms
  const [copySuccess, setCopySuccess] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [speechName, setSpeechName] = useState("");
  const [speech, setSpeech] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const { toast } = useToast();

  // helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
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

  // helper function to check if item is RSVP content
  const isRSVPContent = (item: any): item is RSVPContent => {
    return item.type === "rsvp";
  };

  // helper function to check if item is Speech content
  const isSpeechContent = (item: any): item is SpeechContent => {
    return item.type === "speech";
  };

  // handle RSVP form submission
  const handleRSVPSubmit = (response: "yes" | "no") => {
    toast({
      title: "Terima kasih!",
      description:
        response === "yes"
          ? "Terima kasih atas pengesahan kehadiran anda."
          : "Terima kasih atas maklum balas anda.",
    });
    setShowRSVPForm(false);
    setName("");
    setGuestCount(1);
    setOpenPopoverIndex(null);
  };

  // handle speech form submission
  const handleSpeechSubmit = () => {
    toast({
      title: "Terima kasih!",
      description: "Terima kasih atas ucapan anda.",
    });
    setSpeechName("");
    setSpeech("");
    setImage(null);
    setOpenPopoverIndex(null);
  };

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="bg-main-1 border-t border-gray-300 fixed bottom-0 left-0 right-0 shadow-lg text-green-600">
      <div className="flex justify-around p-4">
        {actionBar.map((item, index) => (
          <Popover
            key={item.label}
            open={openPopoverIndex === index}
            onOpenChange={(open) => setOpenPopoverIndex(open ? index : null)}
          >
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
                {item.content.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* existing contact and location content handling */}
                    {!isRSVPContent(contentItem) &&
                      !isSpeechContent(contentItem) && (
                        <div className="mb-4 flex items-center justify-between gap-4">
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
                                  onClick={() =>
                                    copyToClipboard(contentItem.name)
                                  }
                                  className="flex-shrink-0"
                                >
                                  {copySuccess ? (
                                    // show CircleCheck icon when copy is successful
                                    <CircleCheck className="text-white fill-green-500" />
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
                              {"wazeLink" in contentItem &&
                                contentItem.wazeLink && (
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
                      )}

                    {/* RSVP content */}
                    {isRSVPContent(contentItem) && (
                      <div className="flex flex-col gap-4">
                        {!showRSVPForm ? (
                          <>
                            <p className="text-center mb-4">
                              Adakah anda akan hadir ke majlis perkahwinan ini?
                            </p>
                            <div className="flex justify-center gap-4">
                              <Button onClick={() => setShowRSVPForm(true)}>
                                Ya
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleRSVPSubmit("no")}
                              >
                                Tidak
                              </Button>
                            </div>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleRSVPSubmit("yes");
                            }}
                            className="flex flex-col gap-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowRSVPForm(false)}
                              >
                                <ArrowLeft className="h-4 w-4" />
                              </Button>
                              <span>Kembali</span>
                            </div>
                            <Input
                              placeholder="Nama"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <div className="flex items-center gap-4">
                              <span>Jumlah tetamu:</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  setGuestCount(Math.max(1, guestCount - 1))
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{guestCount}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setGuestCount(guestCount + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button type="submit">Hantar</Button>
                          </form>
                        )}
                      </div>
                    )}

                    {/* Speech content */}
                    {isSpeechContent(contentItem) && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSpeechSubmit();
                        }}
                        className="flex flex-col gap-4"
                      >
                        <Input
                          placeholder="Nama anda"
                          value={speechName}
                          onChange={(e) => setSpeechName(e.target.value)}
                          required
                        />
                        <Textarea
                          placeholder="Tulis ucapan anda di sini"
                          value={speech}
                          onChange={(e) => setSpeech(e.target.value)}
                          required
                          className="min-h-[100px]"
                        />
                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="opacity-0 absolute inset-0 cursor-pointer"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center gap-2"
                          >
                            <Image
                              src="/icons/upload.svg"
                              alt="upload"
                              width={20}
                              height={20}
                            />
                            {image ? image.name : "Muat naik gambar"}
                          </Button>
                        </div>
                        <Button type="submit">Hantar</Button>
                      </form>
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
