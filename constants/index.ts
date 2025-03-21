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
    name: "Dewan Serbaguna",
    address: {
      line1: "Feldajaya Utara",
      line2: "Perak",
    },
    fullAddress: "Dewan Serbaguna, Feldajaya Utara, Perak",
  },
  date: {
    date: "31.05.2025 (Sabtu)",
    datefull: "31 Mei 2025 (Sabtu) bersamaan 4 Zulhijjah 1446H",
    day: "31",
    month: "05",
    year: "2025",
    time: {
      start: "11:00 pagi",
      end: "4:00 petang",
    },
  },
  contact: {
    contact1: {
      name: "Aman",
      number: "010-4038185",
    },
    contact2: {
      name: "Shida",
      number: "019-3275524",
    },
    contact3: {
      name: "Fikri",
      number: "013-2582717",
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

export const loveJourney = [
  {
    title: "PERTUNANGAN",
    date: "7 Julai 2024",
    imgUrl: [
      // "/icons/tunang1.jpeg",
      "/icons/tunang2.jpeg",
      "/icons/tunang3.jpg",
      // "/icons/tunang4.jpg",
    ],
    descriptions: [
      "Rombongan pihak lelaki bergerak ke Kuantan, Pahang pada 6 Julai 2024 dan bermalam di homestay.",
      "Majlis pertunangan berlangsung pada 7 Julai 2024 di rumah pihak perempuan.",
    ],
  },
  {
    title: "PENYESUAIAN PAKAIAN PERKAHWINAN",
    date: "15 Februari 2025",
    imgUrl: [
      // "/icons/tunang1.jpeg",
      "/icons/fitting1.jpeg",
      "/icons/fitting2.jpeg",
      // "/icons/tunang4.jpg",
    ],
    descriptions: [
      "Pihak perempuan bertolak dari Pahang ke Kuala Lumpur pada 14 Februari 2025 untuk bermalam.",
      "Keesokan harinya, mereka bertolak dari Kuala Lumpur ke MySanding Bridal di Slim River untuk penyesuaian pakaian perkahwinan.",
    ],
  },
  {
    title: "PERNIKAHAN",
    date: "To be continued...",
    imgUrl: ["/icons/ayahcartoon.jpg", "/icons/ibucartoon.jpg"],
    description: "",
  },
  {
    title: "PERKAHWINAN",
    date: "To be continued...",
    imgUrl: ["/icons/atukcartoon.jpg"],
    description: "",
  },
];

// Theme Colors
export const themeColors = {
  primary: "#2e1f12", // dark brown
  secondary: "#bf852e", // warm brown
  background: "#F5F7FA", // very light gray
  container: "#FFFFFF", // white

  text: {
    primary: "#2e1f12", // dark brown
    secondary: "#5B7BA3", // soft blue
    third: "#ffff", // white
    fourth: "#bf852e", // warm brown
  },
  actionBar: {
    background: "#2e1f12", // dark brown
    text: "#FFFFFF", // white
    border: "#6B8DBF", // light blue
  },
};
