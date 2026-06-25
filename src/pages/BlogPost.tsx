import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/site/Sidebar";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";
import { BLOG_POSTS } from "./Blog";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-svh bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-editorial text-[#9F3F5C] mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The requested blog post does not exist or has been removed.</p>
        <Link to="/blog" className="px-6 py-3 bg-[#9F3F5C] text-white font-semibold rounded hover:bg-[#8E3852]">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title={`${post.title} | Ultimate Blend Ladies Beauty Salon Dubai`}
        description={post.excerpt}
      />
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0 bg-[#FAF6F8]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <Link 
            to="/blog" 
            className="text-xs font-semibold text-[#9F3F5C] hover:text-[#8E3852] uppercase tracking-wider mb-8 inline-flex items-center gap-1"
          >
            ← Back to Blog
          </Link>
          
          <h1 className="font-editorial text-3xl md:text-5xl text-[#9F3F5C] leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-8 pb-6 border-b border-pink-200/30">
            <span>Published: {post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-neutral-900 mb-12">
            {post.isVideo ? (
              <video 
                src={post.image}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div 
            className="prose prose-pink max-w-none text-[#4A4A4A] space-y-6 leading-relaxed text-sm md:text-base 
              prose-headings:font-editorial prose-headings:text-[#8F3E59] prose-headings:mt-8 prose-headings:mb-4
              prose-h3:text-xl prose-strong:text-[#9F3F5C]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-pink-200/30 text-center">
            <h3 className="font-editorial text-2xl text-[#8F3E59] mb-4">Want beautiful braids styled at home?</h3>
            <p className="text-xs text-gray-600 mb-6">Skip the wait and book our premium salon or home services in Dubai.</p>
            <button
              onClick={() => navigate("/booking")}
              className="px-8 py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-display text-xs font-bold tracking-[0.1em] uppercase transition-all duration-200"
            >
              Book an Appointment
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default BlogPost;
