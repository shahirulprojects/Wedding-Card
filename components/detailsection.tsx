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
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Islamic pattern backgrounds - positioned at back with z-index */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Islamic pattern background as middle layer - full opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/islamic-pattern.svg')] bg-repeat opacity-30" />

        {/* No gradient overlay */}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full relative bg-[url('/icons/brownflowerbg2.png')] bg-no-repeat bg-cover p-11 rounded-3xl "
        style={{ backgroundColor: themeColors.primary, zIndex: 10 }}
      >
        <Image
          src="/icons/weddinglogobrown.png"
          alt="Website Logo"
          width={150}
          height={150}
          className="mx-auto mt-[-35px]"
        />
        <div className="text-center mb-4 relative" style={{ zIndex: 10 }}>
          <h2
            style={{ color: themeColors.text.third }}
            className="font-extrabold text-4xl mb-2"
          >
            AMAN SHAH <br />
            BIN IDRIS <br />
            & <br />
            SITI SHAHIDA <br />
            BINTI ABDULLAH
          </h2>
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl m-6"
          >
            Dengan segala hormatnya mempersilakan <br />
            <span
              style={{ color: themeColors.text.third }}
              className="font-serif italic text-xl"
            >
              Tan Sri/Puan Sri/ Dato' Seri/ Datin Seri/
              <br />
              Dato'/Datin/Tuan/Puan/Cik
              <br />
            </span>{" "}
            <br />
            ke Majlis Perkahwinan Putera Sulung
            <br /> kami yang dikasihi
          </p>

          <h1
            style={{ color: themeColors.text.fourth }}
            className="font-script text-4xl"
          >
            Shahirul Hisham <br />
            bin Aman Shah
          </h1>
          <p style={{ color: themeColors.text.third }} className="m-4 text-xl">
            dengan pilihan hatinya
          </p>
          <h1
            style={{ color: themeColors.text.fourth }}
            className="font-script text-4xl"
          >
            Ummu Fatin Hidayah <br />
            binti Khatib Zur
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
          style={{ zIndex: 10 }}
        >
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl mb-4 text-center"
          >
            pada <br />
            <span className="font-bold">
              31 Mei 2025 (Sabtu) <br />
              bersamaan 4 Zulhijjah 1146H
            </span>{" "}
            <br />
            bertempat di
            <br />
            <span className="font-bold">
              Dewan Serbaguna Feldajaya Utara,
              <br />
              Trolak, Perak
            </span>
          </p>
        </motion.div>

        <div
          style={{ backgroundColor: themeColors.secondary }}
          className="w-1/2 h-1 flex mx-auto rounded-xl relative z-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
          style={{ zIndex: 10 }}
        >
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl m-4 text-center font-bold"
          >
            ATURCARA MAJLIS <br />
            Jamuan Makan
            <br />
            <span className="font-normal">11.00 pagi-4.00 petang</span>
          </p>
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl m-4 text-center font-bold"
          >
            Ketibaan Pengantin
            <br />
            <span className="font-normal">12.00 tengah hari</span>
          </p>
        </motion.div>
        <div
          style={{ backgroundColor: themeColors.secondary }}
          className="w-1/2 h-1 flex mx-auto rounded-xl relative z-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
          style={{ zIndex: 10 }}
        >
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl m-4 text-center font-bold"
          >
            UNTUK DIHUBUNGI
          </p>
          <p
            style={{ color: themeColors.text.third }}
            className="font-serif text-xl m-4 text-center font-bold"
          >
            Aman: 010-403 <span className="tracking-wider">8185</span>
            <br />
            Shahida: 019-327 <span className="tracking-wider">5524</span>
            <br />
            Fikri: 013-258 <span className="tracking-wider">2717</span>
          </p>
        </motion.div>

        {/* Flower decorations container - positioned absolutely */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full flex justify-between overflow-hidden"
          style={{ zIndex: 5 }}
        >
          {/* Left flower */}
          <div>
            <Image
              src="/icons/brownflowerbg1left.png"
              alt="Decorative flower left"
              width={300}
              height={200}
              className="h-auto object-contain"
              style={{
                maxHeight: "180px",
                objectPosition: "bottom left",
              }}
            />
          </div>

          {/* Right flower - flipped horizontally */}
          <div className="flex justify-end">
            <Image
              src="/icons/brownflowerbg1right.png"
              alt="Decorative flower right"
              width={300}
              height={200}
              className="h-auto object-contain"
              style={{
                maxHeight: "180px",
                objectPosition: "bottom right",
              }}
            />
          </div>
        </div>
      </motion.div>

      <div
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8 relative"
        style={{ zIndex: 20 }}
      >
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          viewport={{ once: true }}
          onClick={handleAddToCalendar}
          style={{
            position: "relative",
          }}
          className="text-white font-bold px-8 py-3 rounded-full font-serif flex bg-yellow-400 hover:bg-yellow-500 transition-colors"
        >
          Simpan Tarikh
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          viewport={{ once: true }}
          onClick={handleRSVP}
          style={{
            position: "relative",
          }}
          className="text-white font-bold px-8 py-3 rounded-full font-serif flex bg-yellow-400 hover:bg-yellow-500 transition-colors"
        >
          RSVP
        </motion.button>
      </div>
    </div>
  );
};

export default DetailSection;
