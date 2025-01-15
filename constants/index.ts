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

export type ActionBarItem = {
  label: string;
  imgUrl: string;
  content?: (ContactContent | LocationContent)[];
};

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
        name: "123, Jalan ABC, Taman ABC, Daerah ABC, Negeri ABC",
        googleMapsLink: "https://www.google.com/maps",
        wazeLink: "https://www.waze.com/en-GB/live-map/",
      },
    ],
  },
  {
    label: "RSVP",
    imgUrl: "/icons/lovecalendar.svg",
  },
  {
    label: "Ucapan",
    imgUrl: "/icons/lovespeech.svg",
  },
];
