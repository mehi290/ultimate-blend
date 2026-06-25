import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/site/Sidebar";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

export const BLOG_POSTS = [
  {
    slug: "aftercare-tips-knotless-braids",
    title: "5 Essential Aftercare Tips for Knotless Braids",
    excerpt: "Learn how to wash, sleep with, and oil your knotless braids to extend their lifespan, protect your scalp, and keep them looking fresh for weeks.",
    date: "June 25, 2026",
    readTime: "4 min read",
    image: "/Small Knotless Braids.mp4", // Using existing video assets for visual richness
    isVideo: true,
    content: `
      <p>Knotless braids have taken the beauty world by storm, offering a lightweight, tension-free, and natural-looking alternative to traditional box braids. Because the braid starts with your own hair rather than a knot of extensions, it causes far less stress on your scalp. However, to keep them looking flawless and to maintain healthy natural hair underneath, proper aftercare is absolutely crucial.</p>
      
      <p>Here are 5 essential aftercare tips to ensure your knotless braids last 4 to 8 weeks and protect your natural hair.</p>

      <h3>1. Protect Your Hair While Sleeping</h3>
      <p>Friction from cotton pillowcases is the number one cause of frizz and dryness. Always wrap your braids in a <strong>silk or satin bonnet</strong> or scarf before going to bed. Alternatively, sleep on a silk or satin pillowcase. This keeps your roots smooth and prevents extensions from snagging or pulling while you toss and turn.</p>

      <h3>2. Keep Your Scalp Clean and Moisturized</h3>
      <p>A healthy scalp is the key to healthy hair. Apply a lightweight oil (like jojoba, argan, or tea tree oil) directly to your parts 2 to 3 times a week. Avoid heavy greases that clog pores. If you experience itching, apply a witch hazel spray or tea tree scalp treatment with a cotton pad to clean the scalp between washes.</p>

      <h3>3. Wash Your Braids Gently</h3>
      <p>Yes, you can wash your braids! We recommend washing them every 2 to 3 weeks. Focus the shampoo on your scalp, letting the suds run down the length of the braids. Avoid vigorous scrubbing to prevent frizz. Squeeze out excess water with a microfiber towel and <strong>dry them completely</strong> (using a hooded dryer or blow dryer on low heat) to avoid damp scalp issues.</p>

      <h3>4. Don't Leave Them in Too Long</h3>
      <p>As tempting as it is to stretch your style, you should never leave knotless braids in for more than 8 weeks. Over time, your new growth will begin to lock or matte at the roots, leading to potential breakage during the takedown process. Schedule a professional removal or styling update in time.</p>

      <h3>5. Avoid Tight Updos Initially</h3>
      <p>Although knotless braids are immediately flexible compared to traditional braids, your scalp is still adjusting to the weight of the extensions. Avoid pulling them into high, tight buns or ponytails during the first few days. Give your edges a break to prevent traction alopecia.</p>

      <p><em>Ready to get your next protective style? Ultimate Blend Ladies Beauty Salon offers expert knotless braiding in Dubai. <a href="/booking" class="text-[#9F3F5C] underline font-bold">Book your appointment online today!</a></em></p>
    `
  },
  {
    slug: "maintain-boho-braids-dubai",
    title: "How to Maintain and Style Boho Braids in Dubai's Heat",
    excerpt: "Bohemian braids are stunning, but the curly wisps need special care in humid climates. Discover our pro styling secrets to keep them tangle-free.",
    date: "June 24, 2026",
    readTime: "5 min read",
    image: "/boho braids.mp4",
    isVideo: true,
    content: `
      <p>Boho braids (or bohemian braids) combine structured box or knotless braids with loose, wavy curly tendrils that pop out along the length. It gives a gorgeous, vacation-ready goddess vibe. However, in Dubai's hot and humid climate, those loose curly strands can easily tangle, frizz, or matte if not cared for correctly.</p>

      <p>Whether you choose premium human hair curls (recommended for longevity) or synthetic curls, here are the pro styling secrets to keep your boho braids looking stunning in Dubai.</p>

      <h3>1. Know the Difference: Human vs. Synthetic Curls</h3>
      <p>If you got <strong>human hair boho braids</strong>, the loose curls will behave like natural curls—they require moisture and can be styled with heat. If you got <strong>synthetic curls</strong>, they are highly prone to tangling and cannot handle heat. Always know which type you have, as it dictates your care routine.</p>

      <h3>2. Detangle the Curls Daily</h3>
      <p>Separate the loose curls from the braids every single day. Use your fingers to gently detangle the curly wisps. If you have human hair curls, apply a small amount of lightweight leave-in conditioner or curl cream mixed with water. For synthetic curls, use a silicone serum or synthetic braid spray to add slippage and prevent matting.</p>

      <h3>3. Trim Frizzy Ends</h3>
      <p>Even with perfect care, synthetic ends will eventually start to frizz due to weather and rubbing against clothing. Keep a pair of hair shears handy and gently snip off any matting or single-strand knots at the ends of the curls. This immediately refreshes the style and keeps it looking clean.</p>

      <h3>4. Sleep Smart</h3>
      <p>Just like knotless braids, boho braids must be protected at night. Put your braids into two loose jumbo twists and tuck them into a satin bonnet. This keeps the loose curls structured and prevents them from friction-tangling while you sleep.</p>

      <h3>5. Limit Saltwater and Chlorine Exposure</h3>
      <p>If you're heading to a Dubai beach club or pool, protect your boho braids. Tie them up in a bun and avoid getting them wet with chlorinated or saltwater, which dries out human hair curls and causes synthetic hair to matte instantly. If they do get wet, rinse them immediately with fresh water and apply detangling spray.</p>

      <p><em>Looking for the perfect boho style in Dubai? Ultimate Blend Ladies Salon specializes in professional goddess boho braids. <a href="/booking" class="text-[#9F3F5C] underline font-bold">Secure your booking online</a> or contact us on WhatsApp.</em></p>
    `
  },
  {
    slug: "guide-home-salon-services-dubai",
    title: "The Ultimate Guide to Home Salon Services in Dubai",
    excerpt: "Skip the traffic and get top-tier ladies hairdressing, braiding, lash extensions, and nails done in the comfort of your own home.",
    date: "June 23, 2026",
    readTime: "4 min read",
    image: "/home service knotless.mp4",
    isVideo: true,
    content: `
      <p>Dubai is a city of convenience, and home beauty services have quickly become a staple for busy professionals, moms, and anyone looking for a private, comfortable pampering session. Why deal with Deira traffic, parking, and salon waiting rooms when you can have a certified, experienced stylist come directly to your doorstep?</p>

      <p>Here is your ultimate guide on how to prepare for and get the most out of your home salon service in Dubai.</p>

      <h3>1. Why Choose Home Services?</h3>
      <p>The primary benefit is <strong>convenience and comfort</strong>. You can relax in your own space, watch your favorite show, or work while getting your hair braided, nails polished, or lashes applied. It is also perfect for groups, bridal preparations, or hosting pampering sessions with friends.</p>

      <h3>2. How to Prepare Your Space</h3>
      <p>To help your stylist deliver a flawless service, set up a comfortable spot with:
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Good lighting:</strong> Essential for precise braids, lashes, and nail art. Set up near a window or bright room light.</li>
        <li><strong>A comfortable chair:</strong> If you are getting braids (which take 3 to 6 hours), choose a chair with good back support.</li>
        <li><strong>Access to power:</strong> Near an outlet in case your stylist needs to plug in a blow dryer, nail lamp, or charging device.</li>
      </ul>
      </p>

      <h3>3. Ensure Hair is Prep‑Ready</h3>
      <p>Unless you booked a wash and blow-dry package alongside your braiding service, we recommend washing and detangling your hair before the stylist arrives. Having clean, dry, blow-stretched hair ensures your braiding session starts immediately and results in the neatest partings.</p>

      <h3>4. Confirm What's Included</h3>
      <p>When booking, make sure to clarify details. At Ultimate Blend, our home braiding services include premium hair extensions in your selected color and length, and our nail artists bring all tools, UV lamps, and polishes with them. You don't need to provide anything but the space!</p>

      <h3>5. Choose a Professional, Insured Salon</h3>
      <p>Ensure you are booking through a registered, trusted salon rather than random freelance platforms. Ultimate Blend Ladies Beauty Salon is a licensed salon in Dubai, and all our home stylists are certified professionals trained in our physical salon, ensuring you get the same top-notch quality at home.</p>

      <p><em>Ready to pamper yourself at home? We cover most residential districts in Dubai. <a href="/booking" class="text-[#9F3F5C] underline font-bold">Select 'Home Service' on our booking page</a> and we will bring the salon experience to you.</em></p>
    `
  }
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title="Beauty & Hair Braiding Blog | Ultimate Blend Ladies Beauty Salon Dubai"
        description="Read our latest articles, hair braiding care guides, and beauty tips from the pro stylists at Ultimate Blend Ladies Beauty Salon Dubai."
      />
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0 bg-[#FAF6F8]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="font-editorial text-4xl md:text-5xl text-[#9F3F5C] mb-4 text-center">
            Ultimate Blend Beauty Blog
          </h1>
          <p className="text-center text-gray-500 font-sans max-w-xl mx-auto mb-16 text-sm md:text-base">
            Expert hair braiding care tips, home salon guides, and beauty trends directly from our professional stylists in Dubai.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug}
                className="bg-white border border-pink-100/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-neutral-900">
                  {post.isVideo ? (
                    <video 
                      src={post.image}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-editorial text-xl text-[#8F3E59] leading-snug mb-3 hover:text-[#9F3F5C]">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-[#9F3F5C] hover:text-[#8E3852] underline uppercase tracking-wider"
                  >
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Blog;
