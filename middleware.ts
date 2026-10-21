export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals, if any)
     * - assets, images, etc. (static files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    '/((?!api|_next|static|assets|public|.*\\..*|ULTIMATE_LOGO-removebg-preview.png|og-image-v2.png|BingSiteAuth.xml).*)',
  ],
};

const SITE_URL = "https://www.ultimateblendladiessalon.com";
const OG_IMAGE = `${SITE_URL}/og-image-v2.png`;
const SITE_NAME = "Ultimate Blend Ladies Beauty Salon";

const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": SITE_NAME,
  "url": `${SITE_URL}/`,
  "image": OG_IMAGE,
  "telephone": "+971556173486",
  "priceRange": "$$",
  "subjectOf": {
    "@type": "VideoObject",
    "name": "Ultimate Blend Ladies Beauty Salon Showcase",
    "description": "Experience premium hair braiding, nails, makeup, and facial services in Deira, Dubai.",
    "thumbnailUrl": "https://www.ultimateblendladiessalon.com/og-image-v2.png",
    "uploadDate": "2026-06-25T12:00:00+04:00",
    "contentUrl": "https://www.ultimateblendladiessalon.com/final%20hero%20ultimate%20compressed%20final.mp4"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2725",
    "longitude": "55.3125"
  },
  "hasMap": "https://maps.google.com/?q=City+Stay+Premium+Hotel+Building+-+Shop+4+-+4th+St+-+Naif+-+Deira+-+Dubai",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "City Stay Premium Hotel Building - Shop 4 - 4th St - Naif - Deira - Dubai",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "23:30"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/ultimateblendladiessalon/",
    "https://www.tiktok.com/@ultimateblendsalon1",
    "https://www.facebook.com/p/Ultimate-blend-Ladies-Beauty-Salon-Dubai-100046602049825/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Bons Arte"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had my old braids removed, my hair washed, blow-dryed and re-braided. I have very thick, long hair. But the stylists made sure enough people were working on my hair at once that the process was the fastest I've had since moving to Dubai!! All of the staff were very welcoming and kind, I'm super happy with my braids and the service!! I will be back very soon."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Tonia Chris"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had an amazing experience at Ultimate Blend Salon! The atmosphere was warm and welcoming, and my knotless braids came out absolutely beautiful. A special shout out to Chioma she was so gentle, patient, and incredibly skilled."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Shereen Chambers"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had my hair braided by Ennie and I couldn't be happier! I booked a house call, and she arrived on time, was super friendly, and made me feel so comfortable. She worked quickly but with so much attention to detail, my braids look amazing and neat!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Tolu Sky"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had a great time making my hair, the customer service is top-notch and my hair was so beautiful. Great service at fair price."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ojogri Akpevwe Avemaria"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I really loved my experience here. From the ambience to the customer service. The best I've had in Dubai. I hope to come again soon."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Deborah Mustafa"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had an amazing time at the salon. I went to make nails there and they give me the best customer service i've ever experienced since i came to dubai."
    }
  ]
};

const FAQ_ITEMS = [
  {
    question: "Do you provide the hair extensions for boho, knotless, and Fulani braids?",
    answer: "Yes, we provide high quality human hair extensions in a variety of colors and lengths, for specialized styles like human hair boho braids."
  },
  {
    question: "How long do braids normally take to install?",
    answer: "Depending on the thickness, and length of the style (e.g., standard knotless vs. Fulani cornrows), installation generally takes between 3 to 6 hours. Our focus is always on precision, neat parting, and hair health."
  },
  {
    question: "How do I book a home service appointment in Dubai?",
    answer: "You can seamlessly book home services online on our website or by messaging on WhatsApp. Simply choose the 'Home Service' option of your preferred service, share your address, and our professional stylists will bring the salon experience to your doorstep."
  },
  {
    question: "Is there a minimum spend or travel fee for home services?",
    answer: "Our home services are available across most major residential districts in Dubai. Transport fee depends on your exact location."
  },
  {
    question: "Do you require a booking prior or accept walk-ins?",
    answer: "While we do accommodate walk-ins at our physical Dubai salon, we recommend prior booking to avoid waiting."
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer: "We understand plans change! We kindly ask that you modify or cancel your booking at least 6 hours in advance so we can open up the slot to other clients on our waitlist."
  },
  {
    question: "What is the best hair braiding salon in Dubai?",
    answer: "Ultimate Blend Ladies Beauty Salon is one of the top-rated hair braiding salons in Dubai. Our expert stylists specialize in knotless braids, boho braids, box braids, Fulani twists, cornrows, and more. We offer both salon visits in Deira and professional home services across Dubai."
  },
  {
    question: "How much do knotless braids cost in Dubai?",
    answer: "Prices for knotless braids at Ultimate Blend Ladies Beauty Salon vary by size (small, medium, or big), length, and hair density. Since the pricing varies, you can select your style on our booking page to view the details or message us on WhatsApp for a custom quote."
  },
  {
    question: "How much do boho braids cost in Dubai?",
    answer: "Boho braids at Ultimate Blend Ladies Beauty Salon are available in small, medium, and big sizes using either premium human hair or synthetic hair. Prices vary based on your chosen size, length, and hair type. Contact us on WhatsApp or book online for a personalized quote."
  },
  {
    question: "How long do boho braids last?",
    answer: "Boho braids typically last 4 to 8 weeks with proper care. To extend their lifespan, we recommend sleeping with a silk bonnet, moisturizing your scalp regularly, and avoiding excessive water exposure. Our stylists provide detailed aftercare tips at every appointment."
  },
  {
    question: "Can I get hair braiding done at home in Dubai?",
    answer: "Yes! Ultimate Blend Ladies Beauty Salon offers professional home braiding services across Dubai. Our experienced stylists come to your location with all the tools and premium hair extensions needed. Simply choose the 'Home Service' option when booking online or message us on WhatsApp with your address."
  },
  {
    question: "What types of braids do you offer in Dubai?",
    answer: "We offer a wide range of braiding styles including knotless braids, box braids, boho braids, goddess boho braids, Fulani twist braids, stitch braids, cornrows, extension cornrows, French curls, boho French curls, crochet braids, dreadlocks, and finger waves. All styles are available in small, medium, and big sizes."
  },
  {
    question: "What are the opening hours of Ultimate Blend salon?",
    answer: "Ultimate Blend Ladies Beauty Salon is open 7 days a week, Monday through Sunday, from 9:00 AM to 11:30 PM. We are located at City Stay Premium Hotel Building, Shop 4, 4th Street, Naif, Deira, Dubai."
  },
  {
    question: "Do you offer eyelash extensions at home in Dubai?",
    answer: "Yes, we offer professional eyelash extension services at home across Dubai. Choose from classic, hybrid, volume, or mega eyelash extensions. Our certified lash artists bring everything needed to your doorstep. Book online or contact us on WhatsApp."
  }
];

function buildFAQPageSchema() {
  const salonSchema = { ...BASE_SCHEMA };
  delete (salonSchema as any)["@context"];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      salonSchema
    ]
  };
}

const BOHO_BRAIDS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://www.ultimateblendladiessalon.com/blog/boho-braids-dubai#article",
      "headline": "Boho Braids in Dubai: Styles, Knotless Options, Aftercare and Where to Get Them in 2026",
      "description": "Discover stunning boho braids in Dubai. Explore knotless styles, curl care, and 2026 trends. Book your appointment at Ultimate Blend Ladies Salon today!",
      "image": "https://www.ultimateblendladiessalon.com/images/blog/boho-braids-dubai-featured.webp",
      "datePublished": "2026-10-18T09:00:00+04:00",
      "dateModified": "2026-10-20T09:00:00+04:00",
      "mainEntityOfPage": "https://www.ultimateblendladiessalon.com/blog/boho-braids-dubai",
      "author": {
        "@type": "BeautySalon",
        "name": SITE_NAME,
        "url": `${SITE_URL}/`
      },
      "publisher": {
        "@type": "BeautySalon",
        "name": SITE_NAME,
        "url": `${SITE_URL}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/ULTIMATE_LOGO-removebg-preview.png`
        }
      },
      "articleSection": "Hair Braiding & Beauty Guides",
      "keywords": [
        "boho braids Dubai",
        "boho knotless braids",
        "goddess braids",
        "mermaid braids",
        "African braiding Dubai",
        "hair braiding salon Dubai",
        "braids near me",
        "knotless braids Dubai",
        "human hair boho braids"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much do boho braids cost in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prices depend on your desired braid size, length, and whether you choose human hair or synthetic curls; contact us on WhatsApp for an instant, personalized quote."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to install boho braids?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Installation typically takes between 4 to 7 hours depending on your chosen braid thickness, length, and curl density."
          }
        },
        {
          "@type": "Question",
          "name": "Are boho knotless braids better than box braids?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, knotless boho braids offer far less scalp tension, lay completely flat against the head, and feel weightless compared to traditional box braids."
          }
        },
        {
          "@type": "Question",
          "name": "Can I wash my boho braids?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can gently cleanse your scalp with diluted shampoo or clarifying mousse every 2 to 3 weeks, being careful not to rub the loose curls to prevent frizz."
          }
        },
        {
          "@type": "Question",
          "name": "Do boho braids work in Dubai weather?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely, they are an ideal protective style for Dubai's sunshine and humidity when paired with high-quality curls, a light mousse, and a satin bonnet at night."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I get boho braids near me in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can get flawless boho braids at Ultimate Blend Ladies Beauty Salon, open daily until 11:30 PM with experienced braiding stylists and ladies-only comfort."
          }
        }
      ]
    },
    {
      ...BASE_SCHEMA,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "City Stay Premium Hotel Building, Shop 4, 4th Street, Naif, Deira, Dubai, UAE",
        "addressLocality": "Deira",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "areaServed": {
        "@type": "City",
        "name": "Dubai"
      }
    }
  ]
};

const BOHO_BRAIDS_PRERENDER_HTML = `<article class="prerendered-article" style="max-width:960px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,sans-serif;color:#333;line-height:1.65;">
  <nav aria-label="Breadcrumb" style="font-size:13px;margin-bottom:16px;">
    <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span style="color:#9F3F5C;font-weight:600;">Boho Braids in Dubai</span>
  </nav>
  <header style="margin-bottom:32px;text-align:center;">
    <h1 style="font-size:34px;color:#9F3F5C;margin-bottom:12px;line-height:1.2;">Boho Braids in Dubai: Styles, Knotless Options, Aftercare and Where to Get Them in 2026</h1>
    <p style="font-size:14px;color:#666;">Published: October 18, 2026 | Author: Ultimate Blend Ladies Beauty Salon | Reading time: 9 min read</p>
    <img src="/images/blog/boho-braids-dubai-featured.webp" alt="Model with luxury boho knotless braids and wavy honey curls in a modern salon setting in Dubai" width="1200" height="675" loading="lazy" style="max-width:100%;height:auto;border-radius:16px;margin-top:20px;box-shadow:0 10px 25px rgba(0,0,0,0.1);" />
  </header>
  
  <section style="margin-bottom:28px;">
    <p>When it comes to effortlessly glamorous protective styling, boho braids Dubai appointments consistently top the wishlist for women across the city. Whether you are stepping into a high-powered corporate meeting on Monday morning, soaking up the afternoon sunshine at a glamorous weekend brunch, packing your bags for a holiday getaway, attending a sunset wedding, or unwinding on a luxury yacht along the sparkling coastline, boho braids adapt to every single moment with grace and confidence.</p>
    <p>Often searched and requested under names like bohemian box braids, gypsy braids, undone goddess curls, or messy textured plaits, this beloved hairstyle blends the durability of classic protective braiding with the free-spirited romance of flowing, wavy tendrils. Instead of stiff, uniform plaits that can feel heavy in the desert warmth, boho braids offer airy softness, bouncy movement, and a face-framing silhouette that turns heads wherever you walk.</p>
    <p>Finding the right style and maintaining those gorgeous curly tendrils requires specialized local expertise. In this comprehensive 2026 guide, we unpack everything you need to know: what makes boho braids truly unique, why they have become Dubai’s definitive hair trend, the essential differences between knotless and traditional box bases, how to choose between human hair and synthetic curls, detailed appointment preparation, proven weather-care secrets, 8 head-turning styles for 2026, and exactly where to book your next transformation at a premier <strong>hair braiding salon Dubai</strong>.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">What Are Boho Braids?</h2>
    <p>Boho braids—short for bohemian braids—are a creative protective hairstyle where individual plaits are intentionally infused with loose, wispy curls along the length of each braid and through the ends. Rather than tucking every loose strand neatly into a tight plait, the stylist leaves soft curls unfurling at intervals, producing an ethereal, textured, and “perfectly undone” aesthetic.</p>
    <p>The magic of modern <strong>boho knotless braids</strong> lies in this delicate harmony between structure and freedom. Here are the core features that define the look:</p>
    <ul>
      <li><strong>Braided Base:</strong> Neat, geometric sectioning—usually square, diamond, or triangle—anchors the hairstyle securely while safeguarding your natural hair.</li>
      <li><strong>Loose Curls:</strong> Soft curls (ranging from deep wave to loose body waves) emerge organically at multiple points along each braid shaft.</li>
      <li><strong>Natural Volume:</strong> The loose curly pieces create three-dimensional fullness without adding unnecessary weight to your scalp.</li>
      <li><strong>Soft Finish:</strong> Unlike strictly uniform braids, boho braids soften facial features and look breathtaking whether worn completely down or swept into an effortless high bun.</li>
    </ul>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Why Boho Braids in Dubai Are Trending</h2>
    <p>Look around any trendy café, beach club, or rooftop lounge in Dubai, and you will immediately notice the prevalence of bohemian braids. Their skyrocketing popularity is not a passing fad; it is the ultimate response to the unique lifestyle and climatic demands of living in the UAE.</p>
    <p>Women in Dubai juggle demanding careers, fitness routines, international travel, and vibrant social calendars. Boho braids cut morning styling time down to zero minutes—just shake, mist, and go. High outdoor temperatures and sudden humidity can instantly ruin straight blowouts or silky silk presses. Braiding your hair into boho patterns seals your natural strands safely away from heat and moisture fluctuations. The dynamic texture and wispy ends catch the Arabian golden-hour sunlight like no other style, making them a runaway favorite for fashion influencers and photography enthusiasts seeking authentic <strong>African braiding Dubai</strong> artistry.</p>
    
    <div style="background:#FAF0F4;border:2px solid rgba(159,63,92,0.25);padding:24px;border-radius:14px;margin:30px 0;text-align:center;">
      <h3 style="color:#9F3F5C;margin-top:0;font-size:22px;">Dreaming of Weightless Boho Braids in Dubai?</h3>
      <p style="color:#555;margin-bottom:20px;">Experience pain-free precision, luxury virgin hair curls, and relaxing ladies-only pampering open daily until 11:30 PM.</p>
      <a href="https://wa.me/971556173486?text=Hi%2C%20I%20would%20like%20to%20book%20boho%20braids" style="background:#9F3F5C;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin-right:12px;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Book on WhatsApp</a>
      <a href="tel:+971556173486" style="border:1px solid #9F3F5C;color:#9F3F5C;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Call Us: +971 55 617 3486</a>
    </div>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Boho Knotless Braids vs Regular Boho Box Braids</h2>
    <p>Before booking your session, one of the most critical decisions you will make is choosing your base installation method: knotless or traditional box braids. While both look visually appealing, their comfort, scalp impact, and longevity differ significantly.</p>
    <p>For the majority of modern clients seeking <strong>knotless braids Dubai</strong> services, knotless is the undisputed champion. By starting each braid with your natural hair and feeding in extension fibers gradually, there is zero heavy knot pressing against the scalp, eliminating that dreaded post-braid headache.</p>
    <table border="1" cellpadding="10" style="border-collapse:collapse;width:100%;margin:20px 0;border:1px solid #eee;font-size:14px;">
      <thead>
        <tr style="background:#9F3F5C;color:#fff;text-align:left;">
          <th>Feature</th>
          <th style="background:#8E3852;">Boho Knotless Braids</th>
          <th>Regular Boho Box Braids</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Roots & Parting</strong></td><td style="color:#9F3F5C;font-weight:500;">Flat, seamless feed-in; mimics natural hair growth directly from scalp</td><td>Visible small knot anchor at the scalp base</td></tr>
        <tr><td><strong>Scalp Comfort</strong></td><td style="color:#9F3F5C;font-weight:500;">Zero tension; can be styled into high updos or buns immediately on Day 1</td><td>Tightness and scalp tenderness lasting 2 to 4 days after install</td></tr>
        <tr><td><strong>Weight & Feel</strong></td><td style="color:#9F3F5C;font-weight:500;">Remarkably lightweight, airy, and gentle on sensitive edges</td><td>Slightly heavier, especially when styled waist-length</td></tr>
        <tr><td><strong>Overall Appearance</strong></td><td style="color:#9F3F5C;font-weight:500;">Ultra-natural, flexible, flowing, and contemporary</td><td>Classic, structured, traditional braided look</td></tr>
        <tr><td><strong>Installation Time</strong></td><td style="color:#9F3F5C;font-weight:500;">4.5 to 7 hours (requires precise feed-in technique)</td><td>3.5 to 5 hours (faster initial anchoring)</td></tr>
      </tbody>
    </table>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Boho Braids With Human Hair Curls: Is It Worth It?</h2>
    <p>If there is one question every client asks before sitting in the salon chair, it is: <em>"Should I choose human hair or synthetic curls for my boho braids?"</em></p>
    <p>While synthetic curls keep the upfront price tag lower, opting for <strong>human hair boho braids</strong> makes an enormous difference in daily ease and total lifespan. 100% virgin human hair curls resist matting, can be washed and conditioned with water, last 6 to 8 weeks, and feel soft against your skin. Synthetic curls are budget-friendly for short wear (2 to 3 weeks) but friction-lock easily in warm weather. For Dubai's climate and lasting beauty, investing in human hair curls pays for itself in ease of maintenance and longevity.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Boho, Goddess and Mermaid Braids: What Is the Difference?</h2>
    <h3 style="font-size:20px;color:#8F3E59;">Boho Braids</h3>
    <p>Boho braids feature curly tendrils placed intermittently down each individual braid, with curls peeking out randomly from the shaft and at the ends for a breezy, effortless look.</p>
    <h3 style="font-size:20px;color:#8F3E59;">Goddess Braids</h3>
    <p><strong>goddess braids</strong> feature thicker, sculpted plaits or cornrows adorned with defined curls along the crown and accented with gold accessories and metallic cuffs for a regal finish.</p>
    <h3 style="font-size:20px;color:#8F3E59;">Mermaid Braids</h3>
    <p><strong>mermaid braids</strong> transition from neat braiding near the roots into massive, cascading ocean-wave curls from the mid-shaft all the way down to the waist or hips.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">What Happens at Your Braiding Appointment</h2>
    <p>Knowing what to expect during your salon visit guarantees a seamless, relaxing experience:</p>
    <ol>
      <li><strong>Pre-Braid Consultation:</strong> Assessing natural hair density, scalp sensitivity, and confirming curl patterns.</li>
      <li><strong>Extension Selection:</strong> Choosing colour matching and separating curl bundles.</li>
      <li><strong>Precision Installation:</strong> Stylists work systematically to create crisp partings without pulling delicate baby hairs.</li>
      <li><strong>Finishing & Mousse Set:</strong> Setting braids with lightweight mousse and soothing scalp mist.</li>
    </ol>
    <p><strong>Preparation Tip:</strong> Always arrive with your hair thoroughly washed, deep conditioned, detangled, and blow-dried without heavy oils or butters on the scalp.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Choosing Your Size and Length</h2>
    <p>Braid sizes and lengths available:</p>
    <ul>
      <li><strong>Small:</strong> Fine partings, maximum curl density, lasts 6 to 8 weeks.</li>
      <li><strong>Medium:</strong> The most popular sweet spot; ideal fullness, lasts 4 to 6 weeks.</li>
      <li><strong>Large:</strong> Chunkier parts, faster 3.5 to 4-hour install, bold statement finish.</li>
      <li><strong>Jumbo:</strong> Quick 2 to 3-hour install, great for weekend getaways.</li>
      <li><strong>Lengths:</strong> Shoulder Length (Bob), Mid-Back (versatile daily classic), and Waist Length (signature high-glamour look).</li>
    </ul>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">How to Maintain Boho Braids in Dubai Heat</h2>
    <p>Follow these 6 proven stylist secrets:</p>
    <h3 style="font-size:18px;color:#8F3E59;">1. Sleep in an XL Satin Bonnet or Silk Scarf</h3>
    <p>Tuck your braids into two loose jumbo twists inside a satin bonnet to prevent friction-induced frizz overnight.</p>
    <h3 style="font-size:18px;color:#8F3E59;">2. Separate and Finger Detangle Curls Daily</h3>
    <p>Spend 60 seconds every morning gently separating loose curls with your fingertips.</p>
    <h3 style="font-size:18px;color:#8F3E59;">3. Apply a Light Curl Foaming Mousse</h3>
    <p>Smooth two pumps of alcohol-free mousse over the lengths 2 to 3 times weekly to redefine waves.</p>
    <h3 style="font-size:18px;color:#8F3E59;">4. Gentle Scalp Care and Hydration</h3>
    <p>Mist parts with rose water or tea tree scalp spray to keep roots fresh and clean.</p>
    <h3 style="font-size:18px;color:#8F3E59;">5. Avoid Heavy Greases and Dense Oils</h3>
    <p>Use lightweight jojoba or argan oil sparingly instead of pore-clogging heavy pomades.</p>
    <h3 style="font-size:18px;color:#8F3E59;">6. Reduce Friction from Clothing and Hand-Tugging</h3>
    <p>Drape braids forward over your shoulders while driving or sitting to minimize backrest rubbing.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">How Long Do Boho Braids Last?</h2>
    <p>On average, boho braids last between 3 to 6 weeks. While the braided base can comfortably last up to 8 weeks, loose curly extensions typically need refreshing or a mid-wear salon touch-up around the 4-week mark.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Boho Braid Styles to Try in 2026</h2>
    <h3 style="font-size:18px;color:#8F3E59;">1. Knotless Boho Braids</h3><p>Tension-free with seamless roots and bouncy waves.</p>
    <h3 style="font-size:18px;color:#8F3E59;">2. Waist-Length Flowing Bohemian Braids</h3><p>Cascading drama for holidays and celebrations.</p>
    <h3 style="font-size:18px;color:#8F3E59;">3. Chic Boho Bob Braids</h3><p>Shoulder-grazing cut that keeps your neck cool in summer.</p>
    <h3 style="font-size:18px;color:#8F3E59;">4. Mermaid Boho Braids</h3><p>Rich waves unfurling from mid-shaft to hips.</p>
    <h3 style="font-size:18px;color:#8F3E59;">5. Goddess Boho Crown Braids</h3><p>Feed-in cornrows transitioning into free curls with gold accents.</p>
    <h3 style="font-size:18px;color:#8F3E59;">6. Deep Wave Curly Accent Braids</h3><p>Maximum fullness and volume for fine natural hair.</p>
    <h3 style="font-size:18px;color:#8F3E59;">7. Rich Chocolate Brown Boho Braids</h3><p>Warm sun-kissed brunette palette complementing warm undertones.</p>
    <h3 style="font-size:18px;color:#8F3E59;">8. Honey Blonde Highlighted Boho Braids</h3><p>Caramel and honey highlights for multi-dimensional brilliance.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Where to Get Boho Braids in Dubai</h2>
    <p>When you are searching for authentic, gentle, and long-lasting <strong>braids near me</strong> in Dubai, <a href="/" style="color:#9F3F5C;font-weight:600;text-decoration:underline;">Ultimate Blend Ladies Beauty Salon</a> is your premier beauty destination.</p>
    <p>Our salon is open daily until 11:30 PM, accommodating busy work and social schedules. We feature master African braiders specialized in knotless techniques, hair health, and ladies-only comfort in a serene, private environment. Book directly on WhatsApp for an effortless experience.</p>
    <p>Whether you want waist-length goddess curls or neat shoulder-length bob plaits, our team customizes every detail to suit your face shape and aesthetic. You can also explore our full suite of hairdressing, nail care, and skincare services on our <a href="/services" style="color:#9F3F5C;font-weight:600;text-decoration:underline;">hair braiding and salon services</a> page, or book a consultation in one seamless salon visit.</p>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Final Thoughts on Getting Boho Braids in Dubai</h2>
    <p>Boho braids capture everything modern protective styling should be: effortless, romantic, lightweight, and versatile enough to accompany you from busy work weeks to weekend escapes across Dubai. By selecting knotless foundations, investing in virgin human hair curls, and following a simple nightly satin routine, your boho braids Dubai style will remain breathtaking for weeks on end.</p>
    
    <div style="background:#FAF0F4;border:2px solid rgba(159,63,92,0.25);padding:24px;border-radius:14px;margin:30px 0;text-align:center;">
      <h3 style="color:#9F3F5C;margin-top:0;font-size:22px;">Book Your Boho Braids Today</h3>
      <p style="color:#555;margin-bottom:20px;">Message us on WhatsApp for a custom quote, style consultation, or instant booking confirmation.</p>
      <a href="https://wa.me/971556173486?text=Hi%2C%20I%20would%20like%20to%20book%20boho%20braids" style="background:#9F3F5C;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin-right:12px;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Book on WhatsApp</a>
      <a href="tel:+971556173486" style="border:1px solid #9F3F5C;color:#9F3F5C;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Call Us: +971 55 617 3486</a>
    </div>
  </section>

  <section style="margin-bottom:28px;">
    <h2 style="font-size:26px;color:#9F3F5C;margin-bottom:14px;">Frequently Asked Questions</h2>
    <dl>
      <dt style="font-weight:bold;margin-top:12px;">How much do boho braids cost in Dubai?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">Prices depend on your desired braid size, length, and whether you choose human hair or synthetic curls; contact us on WhatsApp for an instant, personalized quote.</dd>
      <dt style="font-weight:bold;margin-top:12px;">How long does it take to install boho braids?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">Installation typically takes between 4 to 7 hours depending on your chosen braid thickness, length, and curl density.</dd>
      <dt style="font-weight:bold;margin-top:12px;">Are boho knotless braids better than box braids?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">Yes, knotless boho braids offer far less scalp tension, lay completely flat against the head, and feel weightless compared to traditional box braids.</dd>
      <dt style="font-weight:bold;margin-top:12px;">Can I wash my boho braids?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">You can gently cleanse your scalp with diluted shampoo or clarifying mousse every 2 to 3 weeks, being careful not to rub the loose curls to prevent frizz.</dd>
      <dt style="font-weight:bold;margin-top:12px;">Do boho braids work in Dubai weather?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">Absolutely, they are an ideal protective style for Dubai's sunshine and humidity when paired with high-quality curls, a light mousse, and a satin bonnet at night.</dd>
      <dt style="font-weight:bold;margin-top:12px;">Where can I get boho braids near me in Dubai?</dt>
      <dd style="margin-left:0;color:#555;margin-bottom:10px;">You can get flawless boho braids at Ultimate Blend Ladies Beauty Salon, open daily until 11:30 PM with experienced braiding stylists and ladies-only comfort.</dd>
    </dl>
  </section>

  <section style="margin-top:36px;padding:24px;background:#fdf8fa;border:1px solid #f0e0e8;border-radius:14px;">
    <h3 style="font-size:22px;color:#9F3F5C;margin-top:0;">Visit Ultimate Blend Ladies Beauty Salon</h3>
    <p><strong>Address:</strong> City Stay Premium Hotel Building, Shop 4, 4th Street, Naif, Deira, Dubai, UAE</p>
    <p><strong>Hours:</strong> Open daily 9:00 AM – 11:30 PM (opening time: [OPENING TIME])</p>
    <p><strong>Telephone:</strong> <a href="tel:+971556173486" style="color:#9F3F5C;font-weight:bold;">+971 55 617 3486</a></p>
    <p><a href="https://maps.google.com/?q=City+Stay+Premium+Hotel+Building+-+Shop+4+-+4th+St+-+Naif+-+Deira+-+Dubai" target="_blank" rel="noopener noreferrer" style="color:#9F3F5C;font-weight:600;">Get Directions on Google Maps &rarr;</a></p>
  </section>
</article>`;

const SEO_MAP: Record<string, { title: string; description: string; schema: any; ogImage?: string; prerenderHtml?: string }> = {
  "/": {
    title: "Best Beauty Salon in Dubai - if you are looking for Hair Braiding & Hairdressing Services near me or Boho Braiding & African Braiding near me - Ultimate Blend Ladies Beauty Salon is the place to be",
    description: "Welcome to Ultimate Blend Ladies Beauty Salon in Dubai. We offer premium hair braiding, hairdressing, nails, makeup, and skincare services.",
    schema: BASE_SCHEMA
  },
  "/blog": {
    title: "Beauty & Hair Braiding Blog | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Read our latest articles, hair braiding care guides, and beauty tips from the pro stylists at Ultimate Blend Ladies Beauty Salon Dubai.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Ultimate Blend Beauty Blog",
      "description": "Expert hair braiding care tips, home salon guides, and beauty trends in Dubai.",
      "publisher": BASE_SCHEMA
    }
  },
  "/blog/boho-braids-dubai": {
    title: "Boho Braids Dubai | Knotless and Goddess Braids Guide 2026",
    description: "Discover stunning boho braids in Dubai. Explore knotless styles, curl care, and 2026 trends. Book your appointment at Ultimate Blend Ladies Salon today!",
    ogImage: `${SITE_URL}/images/blog/boho-braids-dubai-featured.webp`,
    schema: BOHO_BRAIDS_SCHEMA,
    prerenderHtml: BOHO_BRAIDS_PRERENDER_HTML
  },
  "/about": {
    title: "About Us | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Learn more about Ultimate Blend Ladies Beauty Salon, our expert stylists, and our mission to provide the best beauty experience in Dubai.",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Us - Ultimate Blend Ladies Beauty Salon",
      "description": "Learn about our hairdressers and specialists in Deira, Dubai.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/services": {
    title: "Beauty Services in Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Explore our wide range of professional beauty services in Dubai, including hair braiding, makeup, nails, and signature skincare treatments.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Services | Ultimate Blend Ladies Beauty Salon",
      "description": "Premium ladies beauty services, hair styling, extensions, and nail care.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/testimonials": {
    title: "Client Reviews & Testimonials | Ultimate Blend Ladies Beauty Salon",
    description: "See what our happy clients say about our hairdressing, hair braiding, and nails services in Dubai. Read reviews and testimonials.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Reviews | Ultimate Blend Ladies Beauty Salon",
      "description": "Customer reviews and testimonials for Ultimate Blend Ladies Beauty Salon.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/ourwork": {
    title: "Gallery & Portfolio | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Browse our portfolio of gorgeous hair braids, makeup, nails, and transformations at Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Gallery | Ultimate Blend Ladies Beauty Salon",
      "description": "Photos of haircuts, hair braids, and acrylic nails created by our beauty artists.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/contactus": {
    title: "Contact & Location in Deira, Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Find our salon in Naif, Deira, Dubai. Contact us to book an appointment or get directions to Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us - Ultimate Blend Ladies Beauty Salon",
      "description": "Get in touch or visit our salon location in Naif, Deira, Dubai.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/home-service-dubai": {
    title: "Premium Home Beauty Services in Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Enjoy luxury beauty services in the comfort of your home. We offer home hairdressing, braiding, nails, and makeup across Dubai.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Home Beauty Services",
      "provider": BASE_SCHEMA,
      "areaServed": "Dubai"
    }
  },
  "/salon-near-me": {
    title: "Beauty Salon Near Me in Deira, Dubai | Ultimate Blend Ladies Salon",
    description: "Looking for a top-rated ladies beauty salon near you in Deira, Dubai? Visit Ultimate Blend Ladies Beauty Salon for professional hair and nail care.",
    schema: BASE_SCHEMA
  },
  "/faq": {
    title: "Best Hair Braiding in Deira | Ultimate Blend Ladies Salon Dubai",
    description: "Looking for the best hair braiding in Deira? Ultimate Blend Ladies Salon offers flawless knotless braids, Fulani cornrows, boho braids, and convenient premium home services across Dubai. Book your appointment online today!",
    schema: buildFAQPageSchema()
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Read the Privacy Policy of Ultimate Blend Ladies Beauty Salon to learn how we collect, use, and protect your personal information.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy | Ultimate Blend Ladies Beauty Salon"
    }
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Read the terms and conditions for booking appointments and using the services of Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions | Ultimate Blend Ladies Beauty Salon"
    }
  }
};

const buildBreadcrumbsSchema = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.ultimateblendladiessalon.com/"
    }
  ];

  let pathAccumulator = "";
  parts.forEach((part, index) => {
    pathAccumulator += `/${part}`;
    let name = part.charAt(0).toUpperCase() + part.slice(1);
    if (part === "ourwork") name = "Our Work";
    if (part === "contactus") name = "Contact Us";
    if (part === "home-service-dubai") name = "Home Services";
    if (part === "salon-near-me") name = "Salon Near Me";
    if (part === "terms-conditions") name = "Terms & Conditions";
    if (part === "privacy-policy") name = "Privacy Policy";
    if (part === "faq") name = "FAQs";
    if (part === "blog") name = "Blog";
    if (part === "boho-braids-dubai") name = "Boho Braids in Dubai";

    if (part === "services") {
      name = "Services";
    } else if (parts[index - 1] === "services") {
      name = part
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `https://www.ultimateblendladiessalon.com${pathAccumulator}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Edge cases pass-through
  if (
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/assets')
  ) {
    return;
  }

  try {
    const response = await fetch(new URL('/index.html', request.url));
    if (!response.ok) return response;

    let html = await response.text();

    // Map path to metadata config
    let configObj = SEO_MAP[pathname] || SEO_MAP["/"];

    // Handle dynamic service category routes like /services/knotless-braids
    if (!SEO_MAP[pathname] && pathname.startsWith('/services/')) {
      const categoryRaw = pathname.split('/').pop() || "";
      const category = categoryRaw
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      configObj = {
        title: `${category} Services | Ultimate Blend Ladies Beauty Salon Dubai`,
        description: `Premium ${category} services in Deira, Dubai at Ultimate Blend Ladies Beauty Salon. Professional stylists, luxury treatments, and booking.`,
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${category} Services - Ultimate Blend Ladies Beauty Salon`,
          "serviceType": category,
          "provider": BASE_SCHEMA,
          "areaServed": "Dubai",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "AED",
            "description": `Custom quotes and pricing options available for ${category} services.`
          }
        }
      };
    }

    // Rewrite standard tags in HTML
    html = html.replace(/<title>[^]*?<\/title>/, `<title>${configObj.title}</title>`);
    html = html.replace(/<meta name="description" content="[^]*?"\s*\/?>/, `<meta name="description" content="${configObj.description}" />`);
    html = html.replace(/<link rel="canonical" href="[^]*?"\s*\/?>/, `<link rel="canonical" href="${SITE_URL}${pathname}" />`);

    // OG Tags
    const ogImg = configObj.ogImage || OG_IMAGE;
    html = html.replace(/<meta property="og:title" content="[^]*?"\s*\/?>/, `<meta property="og:title" content="${configObj.title}" />`);
    html = html.replace(/<meta property="og:description" content="[^]*?"\s*\/?>/, `<meta property="og:description" content="${configObj.description}" />`);
    html = html.replace(/<meta property="og:url" content="[^]*?"\s*\/?>/, `<meta property="og:url" content="${SITE_URL}${pathname}" />`);
    html = html.replace(/<meta property="og:image" content="[^]*?"\s*\/?>/, `<meta property="og:image" content="${ogImg}" />`);

    // Twitter Tags
    html = html.replace(/<meta name="twitter:title" content="[^]*?"\s*\/?>/, `<meta name="twitter:title" content="${configObj.title}" />`);
    html = html.replace(/<meta name="twitter:description" content="[^]*?"\s*\/?>/, `<meta name="twitter:description" content="${configObj.description}" />`);
    html = html.replace(/<meta name="twitter:image" content="[^]*?"\s*\/?>/, `<meta name="twitter:image" content="${ogImg}" />`);

    // Prerender article content into #root for search engine crawlers without JavaScript
    if (configObj.prerenderHtml) {
      html = html.replace('<div id="root"></div>', `<div id="root">${configObj.prerenderHtml}</div>`);
    }

    // Combine route schema and breadcrumbs into a single @graph schema
    let finalSchema: any = configObj.schema;
    if (configObj.schema) {
      const breadcrumbs = buildBreadcrumbsSchema(pathname);
      if (configObj.schema["@graph"] && Array.isArray(configObj.schema["@graph"])) {
        finalSchema = {
          "@context": "https://schema.org",
          "@graph": [...configObj.schema["@graph"], breadcrumbs]
        };
      } else {
        const routeSchema = { ...configObj.schema };
        delete routeSchema["@context"];
        finalSchema = {
          "@context": "https://schema.org",
          "@graph": [routeSchema, breadcrumbs]
        };
      }
    }

    // Replace the static JSON-LD script block
    const schemaScriptStr = `<script id="static-schema" type="application/ld+json">${JSON.stringify(finalSchema)}</script>`;
    html = html.replace(/<script id="static-schema" type="application\/ld\+json">[^]*?<\/script>/, schemaScriptStr);

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Middleware SEO injection error:', err);
    return;
  }
}
