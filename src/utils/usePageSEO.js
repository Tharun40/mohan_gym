import { useEffect } from "react";

/**
 * Custom React hook to dynamically manage page-level SEO tags (title, canonical, meta description, and Open Graph tags)
 * for Single Page Applications (SPA).
 *
 * @param {object} options
 * @param {string} options.title - Document title
 * @param {string} options.description - Meta description
 * @param {string} options.canonicalUrl - Canonical link URL
 * @param {string} [options.ogUrl] - Open Graph URL (defaults to canonicalUrl)
 * @param {string} [options.ogTitle] - Open Graph title (defaults to title)
 * @param {string} [options.ogDescription] - Open Graph description (defaults to description)
 * @param {string} [options.ogImage] - Open Graph image URL
 */
export function usePageSEO({
  title,
  description,
  canonicalUrl,
  ogUrl,
  ogTitle,
  ogDescription,
  ogImage = "https://mohangym.netlify.app/logo.png"
}) {
  useEffect(() => {
    // 1. Document title
    if (title) {
      document.title = title;
    }

    // Helper: update or create meta tag
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper: update or create link tag
    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute(rel, rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // 2. Canonical URL
    const targetCanonical = canonicalUrl || ogUrl;
    if (targetCanonical) {
      setLink("canonical", targetCanonical);
    }

    // 3. Meta description
    if (description) {
      setMeta("name", "description", description);
    }

    // 4. Open Graph tags
    const targetOgUrl = ogUrl || canonicalUrl;
    if (targetOgUrl) {
      setMeta("property", "og:url", targetOgUrl);
      setMeta("name", "twitter:url", targetOgUrl);
    }

    const targetOgTitle = ogTitle || title;
    if (targetOgTitle) {
      setMeta("property", "og:title", targetOgTitle);
      setMeta("name", "twitter:title", targetOgTitle);
    }

    const targetOgDesc = ogDescription || description;
    if (targetOgDesc) {
      setMeta("property", "og:description", targetOgDesc);
      setMeta("name", "twitter:description", targetOgDesc);
    }

    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }
  }, [title, description, canonicalUrl, ogUrl, ogTitle, ogDescription, ogImage]);
}

