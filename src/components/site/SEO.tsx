import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo-config";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
  robots?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage = OG_IMAGE,
  schema,
  robots = "index, follow, max-image-preview:large",
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", robots);

    const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

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
    updateOgTag("og:type", "website");
    updateOgTag("og:site_name", SITE_NAME);
    updateOgTag("og:locale", "en_US");
    updateOgTag("og:image:width", "1200");
    updateOgTag("og:image:height", "630");
    updateOgTag("og:image:alt", `${SITE_NAME} preview`);

    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag("twitter:title", title);
    updateTwitterTag("twitter:description", description);
    updateTwitterTag("twitter:image", ogImage);
    updateTwitterTag("twitter:image:alt", `${SITE_NAME} preview`);

    const staticSchema = document.getElementById("static-schema");
    if (staticSchema) {
      staticSchema.remove();
    }

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
      const schemaScript = document.getElementById("seo-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [title, description, canonical, ogImage, schema, robots, location.pathname]);

  return null;
};
