/**
 * Mohan Gym — WhatsApp Helper Utility
 * 
 * Confirmed WhatsApp details:
 * Display: +91 94868 82451
 * WhatsApp URL number: 919486882451
 * Base URL: https://wa.me/919486882451
 */

export const WHATSAPP_NUMBER = "919486882451";
export const WHATSAPP_DISPLAY = "+91 94868 82451";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const GYM_EMAIL = "mohangymchml@gmail.com";

export const GENERAL_ENQUIRY_MESSAGE = "Hi Mohan Gym! I'm interested in joining Mohan Gym. Could you please share the membership details?";

export const CONTACT_ENQUIRY_MESSAGE = "Hi Mohan Gym! I'd like to get in touch regarding gym facilities and membership details.";

import { INITIAL_PLANS } from "../services/seedData.js";

/**
 * Known plan defaults linked directly to INITIAL_PLANS as single source of truth
 */
const seedBasic = INITIAL_PLANS?.find((p) => p.id === "plan-basic") || INITIAL_PLANS?.[0] || {
  id: "plan-basic",
  name: "Basic Plan",
  duration: "3 Months",
  price: 799
};
const seedPremium = INITIAL_PLANS?.find((p) => p.id === "plan-premium") || INITIAL_PLANS?.[1] || {
  id: "plan-premium",
  name: "Premium Plan",
  duration: "6 Months",
  price: 1499
};
const seedPlatinum = INITIAL_PLANS?.find((p) => p.id === "plan-platinum") || INITIAL_PLANS?.[2] || {
  id: "plan-platinum",
  name: "Platinum Plan",
  duration: "1 Year",
  price: 2799
};

export const PLAN_DEFAULTS = {
  basic: {
    id: seedBasic.id || "plan-basic",
    name: seedBasic.name || "Basic Plan",
    duration: seedBasic.duration || "3 Months",
    price: seedBasic.price || 799
  },
  premium: {
    id: seedPremium.id || "plan-premium",
    name: seedPremium.name || "Premium Plan",
    duration: seedPremium.duration || "6 Months",
    price: seedPremium.price || 1499
  },
  platinum: {
    id: seedPlatinum.id || "plan-platinum",
    name: seedPlatinum.name || "Platinum Plan",
    duration: seedPlatinum.duration || "1 Year",
    price: seedPlatinum.price || 2799
  }
};

/**
 * Format a price number or string into ₹X format matching displayed prices
 *
 * @param {number|string} price
 * @returns {string} Formatted price with rupee symbol
 */
export function formatPlanPrice(price) {
  if (price === null || price === undefined || price === "") return "";
  const numeric = typeof price === "number" ? price : Number(String(price).replace(/[^0-9.]/g, ""));
  if (!isNaN(numeric) && numeric > 0) {
    return `₹${numeric}`;
  }
  const str = String(price).trim();
  return str.startsWith("₹") ? str : `₹${str}`;
}

/**
 * Normalize plan duration display matching displayed plan duration (e.g. "3 Months")
 *
 * @param {string|number} duration
 * @returns {string}
 */
export function formatPlanDuration(duration = "") {
  if (!duration) return "";
  if (typeof duration === "number") return `${duration} Months`;
  return String(duration).trim();
}

/**
 * Normalize plan name (e.g. "basic" -> "Basic Plan", preserving exact single-source names)
 *
 * @param {string} name
 * @returns {string}
 */
export function formatPlanName(name = "") {
  if (!name) return "";
  const trimmed = String(name).trim();
  const lower = trimmed.toLowerCase();
  if (lower === "basic" || lower === "plan-basic") return PLAN_DEFAULTS.basic.name;
  if (lower === "premium" || lower === "plan-premium") return PLAN_DEFAULTS.premium.name;
  if (lower === "platinum" || lower === "plan-platinum") return PLAN_DEFAULTS.platinum.name;
  return trimmed;
}

/**
 * Generate a personalized membership enquiry message string for the selected plan.
 *
 * Format:
 * Hi Mohan Gym! 👋
 * 
 * I'm interested in the {Plan Name}.
 * 
 * Plan: {Plan Name}
 * Duration: {Duration}
 * Price: ₹{Price}
 * 
 * Please share more details about joining and the available facilities.
 * 
 * Thank you!
 *
 * @param {object|string} plan - Plan object or tier string
 * @returns {string} Formatted WhatsApp message
 */
export function buildPlanEnquiryMessage(plan, addons = []) {
  if (!plan) {
    return GENERAL_ENQUIRY_MESSAGE;
  }

  // Handle string input: e.g. "basic", "premium", "platinum", "plan-basic", etc.
  if (typeof plan === "string") {
    const key = plan.toLowerCase().trim();
    if (key.includes("basic") || key === "799") {
      return buildPlanEnquiryMessage(PLAN_DEFAULTS.basic, addons);
    }
    if (key.includes("premium") || key === "1499") {
      return buildPlanEnquiryMessage(PLAN_DEFAULTS.premium, addons);
    }
    if (key.includes("platinum") || key === "2799") {
      return buildPlanEnquiryMessage(PLAN_DEFAULTS.platinum, addons);
    }
    if (!key) return GENERAL_ENQUIRY_MESSAGE;

    const cleaned = formatPlanName(plan);
    const leadText = cleaned.toLowerCase().includes("plan") || cleaned.toLowerCase().includes("membership")
      ? cleaned
      : `${cleaned} Plan`;
    return `Hi Mohan Gym! 👋\n\nI'm interested in the ${leadText}.\n\nPlease share more details about joining and the available facilities.\n\nThank you!`;
  }

  // Handle plan object
  if (typeof plan === "object") {
    const rawId = String(plan.id || "").toLowerCase();
    const rawName = String(plan.name || "").trim();
    const rawPrice = Number(plan.price) || 0;

    let defaultPlan = null;
    if (rawId.includes("basic") || rawName.toLowerCase().includes("basic") || rawPrice === 799) {
      defaultPlan = PLAN_DEFAULTS.basic;
    } else if (rawId.includes("premium") || rawName.toLowerCase().includes("premium") || rawPrice === 1499) {
      defaultPlan = PLAN_DEFAULTS.premium;
    } else if (rawId.includes("platinum") || rawName.toLowerCase().includes("platinum") || rawPrice === 2799) {
      defaultPlan = PLAN_DEFAULTS.platinum;
    }

    const planName = formatPlanName(rawName || defaultPlan?.name || "Membership");
    const duration = formatPlanDuration(plan.duration || defaultPlan?.duration || "");
    const price = formatPlanPrice(plan.price !== undefined ? plan.price : defaultPlan?.price);

    // If completely empty object
    if (!planName || (planName === "Membership" && !duration && !price)) {
      return GENERAL_ENQUIRY_MESSAGE;
    }

    const detailLines = [];
    if (planName) detailLines.push(`Plan: ${planName}`);
    if (duration) detailLines.push(`Duration: ${duration}`);
    if (price) detailLines.push(`Base Price: ${price}`);

    if (Array.isArray(addons) && addons.length > 0) {
      const addonNames = addons
        .map((a) => (typeof a === "object" ? `${a.name} (+₹${a.price})` : String(a)))
        .join(", ");
      detailLines.push(`Selected Add-ons: ${addonNames}`);
      const addonsSum = addons.reduce(
        (sum, a) => sum + (typeof a === "object" ? Number(a.price || 0) : 0),
        0
      );
      const numericPrice =
        typeof plan.price === "number"
          ? plan.price
          : Number(String(plan.price || defaultPlan?.price || 0).replace(/[^0-9.]/g, "")) || 0;
      if (addonsSum > 0 && numericPrice > 0) {
        detailLines.push(`Estimated Total: ₹${numericPrice + addonsSum}`);
      }
    }

    const detailsBlock = detailLines.length > 0 ? `\n\n${detailLines.join("\n")}` : "";
    const leadText = planName.toLowerCase().includes("plan") || planName.toLowerCase().includes("membership")
      ? planName
      : `${planName} Plan`;

    return `Hi Mohan Gym! 👋\n\nI'm interested in the ${leadText}.${detailsBlock}\n\nPlease share more details about joining and the available facilities.\n\nThank you!`;
  }

  return GENERAL_ENQUIRY_MESSAGE;
}

export const PLAN_MESSAGES = {
  basic: buildPlanEnquiryMessage(PLAN_DEFAULTS.basic),
  premium: buildPlanEnquiryMessage(PLAN_DEFAULTS.premium),
  platinum: buildPlanEnquiryMessage(PLAN_DEFAULTS.platinum)
};

/**
 * Generate a WhatsApp URL with properly encoded message.
 * URL format: https://wa.me/919486882451?text=ENCODED_MESSAGE
 *
 * @param {string} [message] - Message string to be prefilled in WhatsApp
 * @returns {string} WhatsApp direct link
 */
export function getWhatsAppUrl(message = "") {
  if (!message || !message.trim()) {
    return WHATSAPP_BASE_URL;
  }
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Generate plan-specific WhatsApp enquiry URL.
 * Matches Basic Plan (₹799/3 Months), Premium Plan (₹1499/6 Months), Platinum Plan (₹2799/1 Year).
 *
 * @param {object|string} plan - Plan object or plan ID
 * @param {Array} [addons] - Optional list of selected addons
 * @returns {string} WhatsApp URL with exact prefilled message
 */
export function getPlanWhatsAppUrl(plan, addons = []) {
  if (!plan) {
    return getWhatsAppUrl(GENERAL_ENQUIRY_MESSAGE);
  }
  const message = buildPlanEnquiryMessage(plan, addons);
  return getWhatsAppUrl(message);
}
