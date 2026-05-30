export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SERVICE_CATEGORIES: {
  category: string;
  items: { name: string; image: string }[];
}[] = [
  {
    category: "Hair",
    items: [
      { name: "HAIR CUT", image: "/hair cut.png" },
      { name: "COLOR & BALAYAGE", image: "/hair color.png" },
      {
        name: "Nanoplastic",
        image: "/nano.png",
      },
      { name: "BRIDAL MAKE UP", image: "/bridal make up.png" },
      { name: "BLOW DRY", image: "/keratin.jpg" },
      { name: "HAIR STYLING", image: "/hair style.png" },
      { name: "HAIR EXTENSION", image: "/hair extension.png" },
    ],
  },
  {
    category: "Nails",
    items: [
      { name: "MANICURE", image: "/pedi and mani.jpeg" },
      { name: "GEL EXTENSIONS", image: u("photo-1632345031435-8727f6897d53") },
      { name: "PEDICURE", image: u("photo-1610992015732-2449b76344bc") },
    ],
  },
  {
    category: "Makeup",
    items: [
      { name: "EYE LASH", image: "/eye lash.mp4" },
      { name: "EVENT MAKEUP", image: u("photo-1503236823255-94609f598e71") },
      { name: "BROW LIFT & TINTING", image: "/lashes and brows.jpg" },
    ],
  },
  {
    category: "Skin",
    items: [
      { name: "SIGNATURE FACIAL", image: u("photo-1570172619644-dfd03ed5d881") },
      { name: "ADVANCED SKINCARE", image: u("photo-1512290923902-8a9f81dc236c") },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "joseph cordray",
    rating: 5,
    quote:
      "I just wanted to express my gratitude for the staff at Ultimate Blend Ladies Salon — City Centre Doris. The staff working with Maamar who did so much for me was very genuine, warm and passionate about the work they do. I received a great hair cut, hair dye, beard shave, facial, plus manicure and pedicure.",
  },
  {
    name: "shariq khan",
    rating: 5,
    quote:
      "Great place to pamper yourself, very hard on, courteous and professional staff and climate expectations are managed above and beyond.",
  },
  {
    name: "jonas sergio",
    rating: 5,
    quote:
      "The staff has an excellent customer service and the haircut is amazing. I highly recommend this to my family and friends.",
  },
  {
    name: "kenjis0308",
    rating: 5,
    quote:
      "It was my first time to call this place and they had an opening on the same day. The stylist provided the haircut style I wanted. Highly recommend this salon.",
  },
  {
    name: "amelia rose",
    rating: 5,
    quote:
      "Every visit feels considered, from the lighting to the final touch. This is beauty as it should be — a calm, editorial experience.",
  },
  {
    name: "noah bennett",
    rating: 5,
    quote:
      "The team listens, guides and creates. I leave looking like the best version of myself every single time. Highly recommended.",
  },
];

export const TEAM = [
  {
    name: "[STYLIST NAME]",
    role: "[CREATIVE DIRECTOR]",
    image: u("photo-1580489944761-15a19d654956", 700),
  },
  {
    name: "[STYLIST NAME]",
    role: "[SENIOR COLORIST]",
    image: u("photo-1544005313-94ddf0286df2", 700),
  },
  {
    name: "[STYLIST NAME]",
    role: "[NAIL ARTIST]",
    image: u("photo-1494790108377-be9c29b29330", 700),
  },
  {
    name: "[STYLIST NAME]",
    role: "[MAKEUP ARTIST]",
    image: u("photo-1438761681033-6461ffad8d80", 700),
  },
];

export const HERO_IMAGE = u("photo-1560869713-7d0954430a87", 1800);
export const ABOUT_IMAGE = u("photo-1522337360788-8b13dee7a37e", 1200);

// 6-tile hero mosaic — beauty / hair / hands / face
export const HERO_TILES: { src: string; alt: string }[] = [
  {
    src: "/JESSICA CUDA • PHOTOGRAPHER on Instagram_ “It’s been an incredibly busy past few months of shoots to a point that I was so exhausted and I smashed my camera and lense to the ground 🤣…”.jpg",
    alt: "[PHOTO — bridal portrait]",
  },
  { src: u("photo-1604654894610-df63bc536371", 800), alt: "[PHOTO — manicured hands]" },
  { src: u("photo-1522337360788-8b13dee7a37e", 800), alt: "[PHOTO — hair texture]" },
  { src: u("photo-1632345031435-8727f6897d53", 800), alt: "[PHOTO — rings & nails]" },
  { src: u("photo-1487412947147-5cebf100ffc2", 800), alt: "[PHOTO — smile portrait]" },
  { src: u("photo-1560066984-138dadb4c035", 800), alt: "[PHOTO — hand in hair]" },
];

export const ABOUT_PORTRAIT = u("photo-1580489944761-15a19d654956", 1200);

// Flat list for the single horizontal services slider
export const SERVICES_FLAT = SERVICE_CATEGORIES.flatMap((c) =>
  c.items.map((it) => ({ ...it, category: c.category }))
);

export const SERVICE_FILTERS = ["All", ...SERVICE_CATEGORIES.map((c) => c.category)];