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
import { CircleCheck, Minus, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    openRSVPForm: () => void;
    openSpeechForm: () => void;
  }
}

const Actionbar = () => {
  // state to manage copy feedback and forms
  const [copySuccess, setCopySuccess] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showRSVPNoConfirmation, setShowRSVPNoConfirmation] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [speechName, setSpeechName] = useState("");
  const [speech, setSpeech] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isCheckingStorage, setIsCheckingStorage] = useState(false);

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

  // Function to check storage limit
  const checkStorageLimit = async (): Promise<boolean> => {
    setIsCheckingStorage(true);
    try {
      const response = await fetch("/api/storage");
      if (!response.ok) {
        throw new Error("Failed to check storage status");
      }

      const data = await response.json();

      if (data.isLimitReached) {
        toast({
          title: "Had Simpanan Tercapai",
          description: `Maaf, had simpanan 500MB telah tercapai. (${data.formattedUsage})`,
          variant: "destructive",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Storage check error:", error);
      return false;
    } finally {
      setIsCheckingStorage(false);
    }
  };

  // handle RSVP form submission
  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check storage limit before submitting
    const isLimitReached = await checkStorageLimit();
    if (isLimitReached) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, guestCount }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      toast({
        title: "Terima kasih!",
        description: "Terima kasih atas pengesahan kehadiran anda.",
      });

      triggerConfetti();

      // Reset form
      setName("");
      setGuestCount(1);
      setShowRSVPForm(false);
      setOpenPopoverIndex(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle RSVP decline confirmation
  const handleRSVPDecline = () => {
    toast({
      title: "Terima kasih!",
      description: "Kami telah merekodkan keputusan anda.",
    });
    setShowRSVPNoConfirmation(false);
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

  // handle image upload with base64 conversion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Error",
        description:
          "Sila pilih fail gambar yang sah (PNG, JPG, GIF, WEBP sahaja)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "Error",
        description: "Saiz gambar terlalu besar. Had maksimum adalah 5MB",
        variant: "destructive",
      });
      return;
    }

    setImage(file);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // handle speech form submission
  const handleSpeechSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check storage limit before submitting
    const isLimitReached = await checkStorageLimit();
    if (isLimitReached) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/speeches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: speechName,
          speech,
          imageUrl: imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit speech");
      }

      // First revalidate the page
      await fetch("/api/revalidate?path=/");

      // Immediately refresh speeches
      if (typeof window !== "undefined" && (window as any).refreshSpeeches) {
        await (window as any).refreshSpeeches();
      }

      // Then show success message and trigger confetti
      toast({
        title: "Terima kasih!",
        description: "Terima kasih atas ucapan anda.",
      });
      triggerConfetti();

      // Reset form
      setSpeechName("");
      setSpeech("");
      setImage(null);
      setImageBase64(null);
      setOpenPopoverIndex(null);

      // Wait a short moment for the DOM to update
      setTimeout(() => {
        // Scroll to speeches section
        const speechesSection = document.getElementById("speeches-section");
        if (speechesSection) {
          speechesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // reduced timeout since we're not waiting for revalidation
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to open speech form
  const openSpeechForm = async () => {
    // Check storage limit first
    const isLimitReached = await checkStorageLimit();
    if (isLimitReached) return;

    const speechIndex = actionBar.findIndex(
      (item) => item.label.toLowerCase() === "ucapan"
    );
    if (speechIndex !== -1) {
      setOpenPopoverIndex(speechIndex);
    }
  };

  // Make the functions available globally
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.openRSVPForm = async () => {
        // Check storage limit first
        const isLimitReached = await checkStorageLimit();
        if (isLimitReached) return;

        const rsvpIndex = actionBar.findIndex(
          (item) => item.label.toLowerCase() === "rsvp"
        );
        if (rsvpIndex !== -1) {
          setOpenPopoverIndex(rsvpIndex);
          setShowRSVPForm(true);
        }
      };
      window.openSpeechForm = openSpeechForm;
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: themeColors.actionBar.background }}
      className="fixed bottom-0 left-0 right-0 shadow-lg z-[1000]"
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
                  width: isSpeechContent(item.content[0]) ? "380px" : undefined,
                }}
                className="mb-[30px] rounded-2xl shadow-xl border-2"
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
                                      width={70}
                                      height={70}
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
                                      width={70}
                                      height={70}
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
                        {!showRSVPForm && !showRSVPNoConfirmation ? (
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
                                onClick={() => setShowRSVPNoConfirmation(true)}
                              >
                                Tidak
                              </Button>
                            </div>
                          </>
                        ) : showRSVPNoConfirmation ? (
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowRSVPNoConfirmation(false)}
                              >
                                <ArrowLeft className="h-4 w-4" />
                              </Button>
                              <span
                                style={{ color: themeColors.text.secondary }}
                              >
                                Kembali
                              </span>
                            </div>
                            <p
                              style={{ color: themeColors.text.secondary }}
                              className="text-center mb-2"
                            >
                              Adakah anda pasti tidak dapat hadir ke majlis ini?
                            </p>
                            <div className="flex justify-center gap-4">
                              <Button
                                style={{ backgroundColor: themeColors.primary }}
                                className="text-white hover:bg-opacity-90"
                                onClick={handleRSVPDecline}
                              >
                                Ya, saya pasti
                              </Button>
                              <Button
                                variant="outline"
                                style={{
                                  borderColor: themeColors.primary,
                                  color: themeColors.primary,
                                }}
                                className="p-4"
                                onClick={() => setShowRSVPNoConfirmation(false)}
                              >
                                Tidak, saya akan <br />
                                fikir semula
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <form
                            onSubmit={handleRSVPSubmit}
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
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <span>Menghantar...</span>
                                </div>
                              ) : (
                                "Hantar"
                              )}
                            </Button>
                          </form>
                        )}
                      </div>
                    )}

                    {/* Speech content */}
                    {isSpeechContent(contentItem) && (
                      <form
                        onSubmit={handleSpeechSubmit}
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
                          className="min-h-[100px] max-h-[200px] border-2"
                          style={{ borderColor: themeColors.actionBar.border }}
                        />
                        <div className="relative h-[38px]">
                          <Input
                            type="file"
                            accept="image/png,image/jpeg,image/gif,image/webp"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center gap-2 absolute inset-0"
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
                            <span className="truncate">
                              {image
                                ? image.name
                                : "Gambar kenangan manis bersama pengantin"}
                            </span>
                          </Button>
                        </div>
                        <Button
                          style={{ backgroundColor: themeColors.primary }}
                          className="text-white hover:bg-opacity-90"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Menghantar...</span>
                            </div>
                          ) : (
                            "Hantar"
                          )}
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
