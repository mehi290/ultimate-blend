import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage = "https://ultimate-blend-salon.vercel.app/about%20image.png",
  schema
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Update Canonical URL
    const canonicalUrl = canonical || `https://ultimate-blend-salon.vercel.app${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Update Open Graph Tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOgTag("og:title", title);
    updateOgTag("og:description", description);
    updateOgTag("og:url", canonicalUrl);
    updateOgTag("og:image", ogImage);

    // 5. Update Twitter Tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateTwitterTag("twitter:title", title);
    updateTwitterTag("twitter:description", description);
    updateTwitterTag("twitter:image", ogImage);

    // 6. Inject Schema JSON-LD
    if (schema) {
      let schemaScript = document.getElementById("seo-schema") as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "seo-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else {
      // Remove custom schema if not specified for this route
      const schemaScript = document.getElementById("seo-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [title, description, canonical, ogImage, schema, location.pathname]);

  return null;
};
