// define types for better type safety
export type ContactContent = {
  name: string;
  title?: string;
  number?: string;
  whatsappLink?: string;
  phoneLink?: string;
};

export type LocationContent = {
  name: string;
  googleMapsLink?: string;
  wazeLink?: string;
};

export type RSVPContent = {
  name: string;
  type: "rsvp";
};

export type SpeechContent = {
  name: string;
  type: "speech";
};

export type ActionBarItem = {
  label: string;
  imgUrl: string;
  content?: (ContactContent | LocationContent | RSVPContent | SpeechContent)[];
};

export type Message = {
  message: string;
  author?: string;
  hashtag?: string;
};

// Wedding Information
export const weddingInfo = {
  brideAndGroom: {
    groom: "Hisham",
    bride: "Fatin",
    hashtag: "#HishamDanFatin",
  },
  venue: {
    name: "DEWAN ABC",
    address: {
      line1: "Bandar ABC,",
      line2: "1234 Bandar ABC, Negeri ABC",
    },
    fullAddress: "Dewan ABC, Bandar ABC, 1234 Bandar ABC, Negeri ABC",
  },
  date: {
    full: "Sabtu, 01 Februari 2025",
    day: "01",
    month: "02",
    year: "2025",
    time: {
      start: "11:00 pagi",
      end: "4:00 petang",
    },
  },
  schedule: [
    { time: "11:00 pagi", event: "Kehadiran Tetamu" },
    { time: "12:30 tengah hari", event: "Ketibaan Pengantin" },
    { time: "1:00 petang", event: "Makan Beradab" },
    { time: "4:00 petang", event: "Majlis Berakhir" },
  ],
  calendar: {
    title: "Walimatul Urus - Hisham & Fatin",
    description:
      "Walimatul Urus Hisham & Fatin\nDewan ABC, Bandar ABC, 1234 Bandar ABC, Negeri ABC",
    startTime: "2025-02-01T11:00:00",
    endTime: "2025-02-01T16:00:00",
  },
};

// Guest Messages
export const guestMessages: Message[] = [
  {
    message:
      "Ya Allah Ya Rahman Ya Rahim, berkatilah majlis perkahwinan ini. Limpahkanlah baraqah dan rahmatMu kepada kedua mempelai ini. Kurniakanlah mereka kelak zuriat yang soleh dan solehah. Kekalkanlah jodoh mereka hingga ke jannah.",
    hashtag: "#HishamDanFatin",
  },
  {
    message:
      "Selamat Pengantin Baru Fatin & Hisham. Semoga ikatan ini kekal hingga ke Jannah. Insyaallah . Congratulations ✨",
    author: "Ain & Aiman",
  },
  {
    message: "Selamat pengantin baru Fatin & Hisham 😊",
    author: "Adan",
  },
  {
    message:
      "selamat pengantin baru Fatin & Hisham.. semoga bahagia sampai syurga ❤️",
    author: "kak fatin aina",
  },
  {
    message: "congrats both of you Fatin & Hisham love u",
    author: "syikin",
  },
];

// Action Bar Items
export const actionBar: ActionBarItem[] = [
  {
    label: "Hubungi",
    imgUrl: "/icons/lovecall.svg",
    content: [
      {
        name: "Siti Shahida bt. Abdullah",
        title: "Ibu pengantin lelaki",
        number: "+60193275524",
        whatsappLink: "https://wa.link/c1pe8d",
        phoneLink: "tel:+60193275524",
      },
      {
        name: "Siti Shahida bt. Abdullah",
        title: "Ibu pengantin perempuan",
        number: "+60193275524",
        whatsappLink: "https://wa.link/c1pe8d",
        phoneLink: "tel:+60193275524",
      },
    ],
  },
  {
    label: "Lokasi",
    imgUrl: "/icons/lovelocation.svg",
    content: [
      {
        name: weddingInfo.venue.fullAddress,
        googleMapsLink: "https://www.google.com/maps",
        wazeLink: "https://www.waze.com/en-GB/live-map/",
      },
    ],
  },
  {
    label: "RSVP",
    imgUrl: "/icons/lovecalendar.svg",
    content: [
      {
        name: "RSVP Form",
        type: "rsvp",
      },
    ],
  },
  {
    label: "Ucapan",
    imgUrl: "/icons/lovespeech.svg",
    content: [
      {
        name: "Speech Form",
        type: "speech",
      },
    ],
  },
];

// Theme Colors
export const themeColors = {
  background: "#1B4332", // dark green
  primary: "#2D6A4F", // medium green
  secondary: "#40916C", // light green
  accent: "#95D5B2", // very light green
  container: "#ffffff",
  yellow: "#FFD700", // golden yellow for titles
  actionBar: {
    background: "#2D6A4F", // solid medium green
    text: "#FFFFFF", // white text
    hover: "#40916C", // light green for hover
    active: "#1B4332", // dark green for active state
    border: "#95D5B2", // light green for borders
  },
  text: {
    primary: "#2D6A4F",
    secondary: "#40916C",
    light: "#95D5B2",
  },
};
