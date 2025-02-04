import React from "react";
import { motion } from "framer-motion";
import { weddingInfo, themeColors } from "@/constants";
import Image from "next/image";

type CalendarOption = {
  name: string;
  url?: string;
  action?: () => void;
};

const DetailSection = () => {
  const handleAddToCalendar = () => {
    // Format date and time for calendar
    const startDate = new Date(weddingInfo.calendar.startTime);
    const endDate = new Date(weddingInfo.calendar.endTime);

    // Create calendar event URL for Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      weddingInfo.calendar.title
    )}&dates=${startDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}/${endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}&details=${encodeURIComponent(
      weddingInfo.calendar.description
    )}&location=${encodeURIComponent(weddingInfo.venue.fullAddress)}`;

    // Create calendar event for iOS/macOS Calendar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}
DTEND:${endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}
SUMMARY:${weddingInfo.calendar.title}
DESCRIPTION:${weddingInfo.calendar.description}
LOCATION:${weddingInfo.venue.fullAddress}
END:VEVENT
END:VCALENDAR`;

    // Create options for calendar selection
    const options: CalendarOption[] = [
      { name: "Google Calendar", url: googleCalendarUrl },
      {
        name: "Apple Calendar",
        action: () => {
          const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute("download", "wedding-invitation.ics");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
    ];

    // Show calendar options
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (
        userAgent.includes("iphone") ||
        userAgent.includes("ipad") ||
        userAgent.includes("macintosh")
      ) {
        // For iOS/macOS devices, directly trigger Apple Calendar download
        const appleOption = options[1];
        if (appleOption && appleOption.action) {
          appleOption.action();
        }
      } else {
        // For other devices, open Google Calendar
        const googleOption = options[0];
        if (googleOption && googleOption.url) {
          window.open(googleOption.url, "_blank");
        }
      }
    }
  };

  // Function to trigger the RSVP form in action bar
  const handleRSVP = () => {
    if (typeof window !== "undefined" && (window as any).openRSVPForm) {
      (window as any).openRSVPForm();
    }
  };

  return (
    <div
      style={{ backgroundColor: themeColors.background }}
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 relative overflow-hidden"
    >
      {/* Corner Flowers
      <div className="absolute top-10 right-0 w-32 h-32">
        <Image
          src="\icons\flowercorner.svg"
          alt="corner flower"
          width={60}
          height={60}
        />
      </div>
      <div className="absolute top-10 left-0 w-32 h-32 transform -scale-x-100">
        <Image
          src="\icons\flowercorner.svg"
          alt="corner flower"
          width={60}
          height={60}
        />
      </div> */}
      {/* <div className="absolute bottom-0 right-0 w-32 h-32 transform rotate-90">
        <Image
          src="\icons\flowercorner.svg"
          alt="corner flower"
          width={60}
          height={60}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 transform -rotate-90 -scale-x-100">
        <Image
          src="\icons\flowercorner.svg"
          alt="corner flower"
          width={60}
          height={60}
        />
      </div> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-12">
          <h2
            style={{ color: themeColors.yellow }}
            className="font-script text-4xl mb-2"
          >
            Walimatul Urus
          </h2>
          <p style={{ color: themeColors.text.primary }} className="font-serif">
            Dengan penuh kesyukuran, kami mempersilakan
          </p>
          <p
            style={{ color: themeColors.text.primary }}
            className="font-serif italic"
          >
            Dato' | Datin | Tuan | Puan | Encik | Cik
          </p>
          <p style={{ color: themeColors.text.primary }} className="font-serif">
            seisi keluarga hadir ke majlis perkahwinan anakanda kami
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          style={{ backgroundColor: themeColors.container }}
          className="backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8"
        >
          <h3
            style={{ color: themeColors.text.primary }}
            className="font-serif text-xl mb-4 text-center"
          >
            TEMPAT
          </h3>
          <div className="text-center space-y-2">
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif text-lg"
            >
              {weddingInfo.venue.name}
            </p>
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif"
            >
              {weddingInfo.venue.address.line1}
            </p>
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif"
            >
              {weddingInfo.venue.address.line2}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          style={{ backgroundColor: themeColors.container }}
          className="backdrop-blur-sm p-8 rounded-2xl shadow-lg"
        >
          <h3
            style={{ color: themeColors.text.primary }}
            className="font-serif text-xl mb-4 text-center"
          >
            TARIKH
          </h3>
          <div className="text-center space-y-2">
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif text-lg"
            >
              {weddingInfo.date.full}
            </p>
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif"
            >
              MASA
            </p>
            <p
              style={{ color: themeColors.text.secondary }}
              className="font-serif"
            >
              {weddingInfo.date.time.start} - {weddingInfo.date.time.end}
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={handleAddToCalendar}
            style={{ backgroundColor: themeColors.primary }}
            className="text-white px-8 py-3 rounded-full font-serif hover:bg-[#40916C] transition-colors"
          >
            Simpan Tarikh
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={handleRSVP}
            style={{ backgroundColor: themeColors.primary }}
            className="text-white px-8 py-3 rounded-full font-serif hover:bg-[#40916C] transition-colors"
          >
            RSVP
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailSection;
