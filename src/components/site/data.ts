export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "our-work", label: "Our Work" },
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
        { name: "Goddess Twist Braid", image: "/goddess twist braid.mp4" },
        { name: "BLOW DRY & IRON", image: "/keratin.jpg" },
        { name: "BRAIDS", image: "/BRAIDS.mp4" },
        { name: "BOX BRAIDS", image: u("photo-1647891938250-754ad796f67a") },
        { name: "CORNROWS", image: u("photo-1595959183075-c1d09e57343d") },
        { name: "CROCHET", image: "/crochet.mp4" },
        { name: "PONYTAIL", image: u("photo-1522337360788-8b13dee7a37e") },
        { name: "BOHO BRAIDS", image: "/boho braids.mp4" },
        { name: "STITCH BRAIDS", image: u("photo-1582095133179-bfd08e2fc6b3") },
        { name: "Knotless Braids", image: "/Small Knotless Braids.mp4" },
        { name: "French Curls", image: "/French Curls.mp4" },
        { name: "Boho French Curls", image: "/boho frenchcurls.mp4" },
        { name: "Fulani Twist Braid", image: "/Fulani Twist Braid.mp4" },
        { name: "Finger Wave", image: "/Finger Wave.mp4" },
        { name: "DREADLOCKS", image: "/dread.mp4" },
        { name: "REVAMPING OF HUMAN HAIR", image: u("photo-1562322140-8baeececf3df") },
        { name: "HAIR EXTENSIONS", image: "/HAIR EXTENSIONS.mp4" },
        { name: "WIG INSTALLATIONS", image: "/Wig installations.jpeg" },
        { name: "HAIR RELAXING", image: u("photo-1560869713-7d0954430a87") },
        { name: "HAIR STYLING", image: "/hair styling.mp4" },
        { name: "HAIR TREATMENT", image: u("photo-1522337360788-8b13dee7a37e") },
        { name: "CHILDREN HAIRSTYLING", image: "/children boho  braids.mp4" },
      ],
    },
    {
      category: "Nails",
      items: [
        { name: "MANICURE", image: "/MANICURE.mp4" },
        { name: "PEDICURE", image: u("photo-1610992015732-2449b76344bc") },
      ],
    },
    {
      category: "Makeup",
      items: [
        { name: "EYE LASH EXTENSIONS", image: "/eyelash.mp4" },
        { name: "MAKE UP", image: "/make up.jpeg" },
      ],
    },
    {
      category: "Skin",
      items: [
        { name: "SIGNATURE FACIAL", image: "/signature facialis.mp4" },
      ],
    },
];

export const TESTIMONIALS = [
  {
    name: "Bons Arte",
    rating: 5,
    quote:
      "I had my old braids removed, my hair washed, blow-dryed and re-braided. I have very thick, long hair. But the stylists made sure enough people were working on my hair at once that the process was the fastest I've had since moving to Dubai!! All of the staff were very welcoming and kind, I'm super happy with my braids and the service!! I will be back very soon. Services: Shampoo & conditioning, Braids, Hairstyling",
  },
  {
    name: "Tonia Chris",
    rating: 5,
    quote:
      "I had an amazing experience at Ultimate Blend Salon! The atmosphere was warm and welcoming, and my knotless braids came out absolutely beautiful. A special shout out to Chioma  she was so gentle, patient, and incredibly skilled. I love my hair and will definitely be coming back!",
  },
  {
    name: "Shereen Chambers",
    rating: 5,
    quote:
      "I had my hair braided by Ennie and I couldn't be happier! I booked a house call, and she arrived on time, was super friendly, and made me feel so comfortable. She worked quickly but with so much attention to detail, my braids look amazing and neat! Such a professional and lovely experience from start to finish. Highly recommend her if you're looking for beautiful braids and great service.",
  },
  {
    name: "Tolu Sky",
    rating: 5,
    quote:
      "I had a great time making my hair, the customer service is top-notch and my hair was so beautiful. Great service at fair price. You'll get your money quality.",
  },
  {
    name: "Ojogri Akpevwe Avemaria",
    rating: 5,
    quote:
      "I really loved my experience here. From the ambience to the customer service. The best I've had in Dubai. I hope to come again soon.",
  },
  {
    name: "Deborah Mustafa",
    rating: 5,
    quote:
      "I had an amazing time at the salon. I went to make nails there and they give me the best customer service i've ever experienced since i came to dubai, i will highly recommend.",
  },
];

export const HERO_IMAGE = u("photo-1560869713-7d0954430a87", 1800);
export const ABOUT_IMAGE = "/about.mp4";

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