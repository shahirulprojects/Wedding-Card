"use client";
import {
  actionBar,
  ContactContent,
  LocationContent,
  RSVPContent,
  SpeechContent,
  themeColors,
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
import confetti from "canvas-confetti";

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
      variant: "default",
    });
    setShowRSVPForm(false);
    setName("");
    setGuestCount(1);
    setOpenPopoverIndex(null);
  };

  // Function to trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // handle speech form submission with confetti
  const handleSpeechSubmit = () => {
    toast({
      title: "Terima kasih!",
      description: "Terima kasih atas ucapan anda.",
    });
    triggerConfetti();
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

  // Function to open speech form
  const openSpeechForm = () => {
    const speechIndex = actionBar.findIndex(
      (item) => item.label.toLowerCase() === "ucapan"
    );
    if (speechIndex !== -1) {
      setOpenPopoverIndex(speechIndex);
    }
  };

  // Expose the function globally
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).openSpeechForm = openSpeechForm;
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: themeColors.actionBar.background }}
      className="fixed bottom-0 left-0 right-0 shadow-lg"
    >
      <div className="flex justify-around items-center p-4 max-w-7xl mx-auto">
        {actionBar.map((item, index) => (
          <Popover
            key={item.label}
            open={openPopoverIndex === index}
            onOpenChange={(open) => setOpenPopoverIndex(open ? index : null)}
          >
            <PopoverTrigger>
              <div
                className="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-110 cursor-pointer group"
                data-action={item.label.toLowerCase()}
                id={`action-${item.label.toLowerCase()}`}
              >
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Image
                    src={item.imgUrl}
                    alt={item.label}
                    width={25}
                    height={25}
                    className="opacity-90 invert"
                  />
                </div>
                <span
                  style={{ color: themeColors.actionBar.text }}
                  className="text-sm font-serif"
                >
                  {item.label}
                </span>
              </div>
            </PopoverTrigger>

            {item.content && (
              <PopoverContent
                style={{
                  backgroundColor: themeColors.container,
                  borderColor: themeColors.actionBar.border,
                }}
                className="mb-[30px] w-full max-w-sm rounded-2xl shadow-xl border-2"
              >
                <h1
                  style={{ color: themeColors.text.primary }}
                  className="text-center font-script text-2xl mb-6"
                >
                  {item.label}
                </h1>
                {item.content.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {/* Contact and Location content */}
                    {!isRSVPContent(contentItem) &&
                      !isSpeechContent(contentItem) && (
                        <div className="mb-4 flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <div className="flex flex-col mb-2">
                            <div
                              className={`${
                                "googleMapsLink" in contentItem
                                  ? "flex items-center gap-2"
                                  : "flex flex-col"
                              }`}
                            >
                              {"googleMapsLink" in contentItem && (
                                <button
                                  onClick={() =>
                                    copyToClipboard(contentItem.name)
                                  }
                                  className="flex-shrink-0 hover:scale-110 transition-transform"
                                >
                                  {copySuccess ? (
                                    <CircleCheck className="text-green-500" />
                                  ) : (
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
                                  <p
                                    key={i}
                                    style={{ color: themeColors.text.primary }}
                                    className="font-medium"
                                  >
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                            {"title" in contentItem && contentItem.title && (
                              <p
                                style={{ color: themeColors.text.secondary }}
                                className="text-sm italic"
                              >
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
                                    className="hover:scale-110 transition-transform"
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
                                    className="hover:scale-110 transition-transform"
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
                            <div className="flex gap-4">
                              {"googleMapsLink" in contentItem &&
                                contentItem.googleMapsLink && (
                                  <a
                                    href={contentItem.googleMapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
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
                                    className="hover:scale-110 transition-transform"
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
                            <p
                              style={{ color: themeColors.text.secondary }}
                              className="text-center mb-2"
                            >
                              Adakah anda dapat hadir ke{" "}
                              <br className="md:hidden" />
                              majlis perkahwinan ini?
                            </p>
                            <div className="flex justify-center gap-4">
                              <Button
                                style={{ backgroundColor: themeColors.primary }}
                                className="text-white hover:bg-opacity-90"
                                onClick={() => setShowRSVPForm(true)}
                              >
                                Ya
                              </Button>
                              <Button
                                variant="outline"
                                style={{
                                  borderColor: themeColors.primary,
                                  color: themeColors.primary,
                                }}
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
                              <span
                                style={{ color: themeColors.text.secondary }}
                              >
                                Kembali
                              </span>
                            </div>
                            <Input
                              placeholder="Nama"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="border-2"
                              style={{
                                borderColor: themeColors.actionBar.border,
                              }}
                            />
                            <div className="flex items-center gap-4">
                              <span
                                style={{ color: themeColors.text.secondary }}
                              >
                                Jumlah tetamu:
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                style={{
                                  borderColor: themeColors.actionBar.border,
                                }}
                                onClick={() =>
                                  setGuestCount(Math.max(1, guestCount - 1))
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span style={{ color: themeColors.text.primary }}>
                                {guestCount}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                style={{
                                  borderColor: themeColors.actionBar.border,
                                }}
                                onClick={() => setGuestCount(guestCount + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              style={{ backgroundColor: themeColors.primary }}
                              className="text-white hover:bg-opacity-90"
                              type="submit"
                            >
                              Hantar
                            </Button>
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
                          className="border-2"
                          style={{ borderColor: themeColors.actionBar.border }}
                        />
                        <Textarea
                          placeholder="Tulis ucapan anda di sini"
                          value={speech}
                          onChange={(e) => setSpeech(e.target.value)}
                          required
                          className="min-h-[100px] border-2"
                          style={{ borderColor: themeColors.actionBar.border }}
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
                            style={{
                              borderColor: themeColors.actionBar.border,
                            }}
                          >
                            <Image
                              src="/icons/upload.svg"
                              alt="upload"
                              width={20}
                              height={20}
                            />
                            {image
                              ? image.name
                              : "Gambar kenangan manis bersama pengantin"}
                          </Button>
                        </div>
                        <Button
                          style={{ backgroundColor: themeColors.primary }}
                          className="text-white hover:bg-opacity-90"
                          type="submit"
                        >
                          Hantar
                        </Button>
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
