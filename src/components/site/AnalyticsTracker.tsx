import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Helper to send events to GA4
const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
};

export const AnalyticsTracker = () => {
  const location = useLocation();

  // 1 & 2. Track page views correctly for all routes in SPA
  useEffect(() => {
    const url = location.pathname + location.search;
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-D7YWM3MPSE", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // 3 & 4. Create a booking conversion event: book_appointment
    // Fire this event ONLY when the user successfully reaches /booking/confirm
    if (location.pathname === "/booking/confirm") {
      trackEvent("book_appointment", {
        page_path: url,
        currency: "AED",
        value: location.state?.booking?.price || 0,
        transaction_id: location.state?.booking?.id || undefined,
        service_name: location.state?.serviceName || undefined
      });
    }
  }, [location]);

  // 5 & 6. Global listeners to capture WhatsApp and Phone Call link/button clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest anchor or button elements
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";

        // 5. WhatsApp Link Clicked
        if (
          href.includes("wa.me") || 
          href.includes("api.whatsapp.com") || 
          anchor.classList.contains("whatsapp") || 
          anchor.id?.includes("whatsapp")
        ) {
          trackEvent("whatsapp_click", {
            click_text: anchor.innerText?.trim() || anchor.ariaLabel || "WhatsApp Link",
            click_url: href,
          });
          return;
        }

        // 6. Phone Call Link Clicked (tel:)
        if (href.startsWith("tel:")) {
          trackEvent("phone_call_click", {
            phone_number: href.replace("tel:", "").trim(),
            click_text: anchor.innerText?.trim() || anchor.ariaLabel || "Phone Link",
          });
          return;
        }
      }

      if (button) {
        const text = (button.innerText || "").toLowerCase();
        const id = (button.id || "").toLowerCase();
        const className = (button.className || "").toLowerCase();

        // 5. WhatsApp Button Clicked
        if (
          text.includes("whatsapp") || 
          id.includes("whatsapp") || 
          className.includes("whatsapp")
        ) {
          trackEvent("whatsapp_click", {
            click_text: button.innerText?.trim() || button.ariaLabel || "WhatsApp Button",
          });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
};
