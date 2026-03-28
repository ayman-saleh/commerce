import type { Product, Collection, Page, Menu } from "lib/shopify/types";

const img = (id: string, w = 800, h = 800) => ({
  url: `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`,
  altText: "",
  width: w,
  height: h,
});

export const products: Product[] = [
  {
    id: "prod-001",
    handle: "mechanical-keyboard-75",
    availableForSale: true,
    title: "Mech 75 Keyboard",
    description: "Compact 75% mechanical keyboard with hot-swappable switches, PBT keycaps, and per-key RGB. Gasket-mounted for a soft, thocky typing feel.",
    descriptionHtml: "<p>Compact 75% mechanical keyboard with hot-swappable switches, PBT keycaps, and per-key RGB. Gasket-mounted for a soft, thocky typing feel.</p>",
    options: [
      { id: "opt-color", name: "Color", values: ["Space Black", "Lunar White"] },
    ],
    priceRange: { maxVariantPrice: { amount: "149.00", currencyCode: "USD" }, minVariantPrice: { amount: "149.00", currencyCode: "USD" } },
    variants: [
      { id: "var-001a", title: "Space Black", availableForSale: true, selectedOptions: [{ name: "Color", value: "Space Black" }], price: { amount: "149.00", currencyCode: "USD" } },
      { id: "var-001b", title: "Lunar White", availableForSale: true, selectedOptions: [{ name: "Color", value: "Lunar White" }], price: { amount: "149.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1587829741301-dc798b83add3"),
    images: [img("1587829741301-dc798b83add3"), img("1595044426077-d36d9236d54a")],
    seo: { title: "Mech 75 Keyboard", description: "Compact 75% mechanical keyboard" },
    tags: ["keyboard", "mechanical"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-002",
    handle: "studio-headphones",
    availableForSale: true,
    title: "Studio Headphones",
    description: "Over-ear noise-cancelling headphones with 40-hour battery, spatial audio, and a low-latency mode for calls. Memory foam cushions for all-day comfort.",
    descriptionHtml: "<p>Over-ear noise-cancelling headphones with 40-hour battery, spatial audio, and a low-latency mode for calls.</p>",
    options: [
      { id: "opt-color2", name: "Color", values: ["Matte Black", "Warm Grey"] },
    ],
    priceRange: { maxVariantPrice: { amount: "89.00", currencyCode: "USD" }, minVariantPrice: { amount: "89.00", currencyCode: "USD" } },
    variants: [
      { id: "var-002a", title: "Matte Black", availableForSale: true, selectedOptions: [{ name: "Color", value: "Matte Black" }], price: { amount: "89.00", currencyCode: "USD" } },
      { id: "var-002b", title: "Warm Grey", availableForSale: true, selectedOptions: [{ name: "Color", value: "Warm Grey" }], price: { amount: "89.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1505740420928-5e560c06d30e"),
    images: [img("1505740420928-5e560c06d30e"), img("1484704849700-f032a568e944")],
    seo: { title: "Studio Headphones", description: "Noise-cancelling over-ear headphones" },
    tags: ["audio", "headphones"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-003",
    handle: "usb-c-hub-7in1",
    availableForSale: true,
    title: "USB-C Hub 7-in-1",
    description: "Compact hub with HDMI 4K@60Hz, 2x USB-A 3.2, USB-C PD 100W passthrough, SD/microSD, and Gigabit Ethernet. Aluminium body, no drivers needed.",
    descriptionHtml: "<p>Compact hub with HDMI 4K@60Hz, 2x USB-A 3.2, USB-C PD 100W passthrough, SD/microSD, and Gigabit Ethernet.</p>",
    options: [],
    priceRange: { maxVariantPrice: { amount: "59.00", currencyCode: "USD" }, minVariantPrice: { amount: "59.00", currencyCode: "USD" } },
    variants: [
      { id: "var-003", title: "Default Title", availableForSale: true, selectedOptions: [{ name: "Title", value: "Default Title" }], price: { amount: "59.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1625842268584-8f3296236761"),
    images: [img("1625842268584-8f3296236761")],
    seo: { title: "USB-C Hub 7-in-1", description: "7-in-1 USB-C hub" },
    tags: ["accessories", "hub"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-004",
    handle: "webcam-4k",
    availableForSale: true,
    title: "Webcam 4K",
    description: "4K webcam with auto-focus, HDR, built-in privacy shutter, and dual noise-cancelling mics. Works with any video app, no software required.",
    descriptionHtml: "<p>4K webcam with auto-focus, HDR, built-in privacy shutter, and dual noise-cancelling mics.</p>",
    options: [],
    priceRange: { maxVariantPrice: { amount: "79.00", currencyCode: "USD" }, minVariantPrice: { amount: "79.00", currencyCode: "USD" } },
    variants: [
      { id: "var-004", title: "Default Title", availableForSale: true, selectedOptions: [{ name: "Title", value: "Default Title" }], price: { amount: "79.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1611532736597-de2d4265fba3"),
    images: [img("1611532736597-de2d4265fba3")],
    seo: { title: "Webcam 4K", description: "4K webcam with auto-focus" },
    tags: ["accessories", "webcam"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-005",
    handle: "desk-mat-xxl",
    availableForSale: true,
    title: "Desk Mat XXL",
    description: "Extended desk mat (900x400mm) with anti-slip base, stitched edges, and a smooth microweave surface. Machine washable.",
    descriptionHtml: "<p>Extended desk mat (900x400mm) with anti-slip base, stitched edges, and a smooth microweave surface.</p>",
    options: [
      { id: "opt-color5", name: "Color", values: ["Charcoal", "Navy", "Forest"] },
    ],
    priceRange: { maxVariantPrice: { amount: "39.00", currencyCode: "USD" }, minVariantPrice: { amount: "39.00", currencyCode: "USD" } },
    variants: [
      { id: "var-005a", title: "Charcoal", availableForSale: true, selectedOptions: [{ name: "Color", value: "Charcoal" }], price: { amount: "39.00", currencyCode: "USD" } },
      { id: "var-005b", title: "Navy", availableForSale: true, selectedOptions: [{ name: "Color", value: "Navy" }], price: { amount: "39.00", currencyCode: "USD" } },
      { id: "var-005c", title: "Forest", availableForSale: true, selectedOptions: [{ name: "Color", value: "Forest" }], price: { amount: "39.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1616628188550-808682f3926d"),
    images: [img("1616628188550-808682f3926d")],
    seo: { title: "Desk Mat XXL", description: "Extended desk mat" },
    tags: ["accessories", "desk"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-006",
    handle: "monitor-light-bar",
    availableForSale: true,
    title: "Monitor Light Bar",
    description: "Asymmetric LED light bar that clips to your monitor. Adjustable color temperature (2700K-6500K), no screen glare, touch controls.",
    descriptionHtml: "<p>Asymmetric LED light bar that clips to your monitor. Adjustable color temperature, no screen glare.</p>",
    options: [],
    priceRange: { maxVariantPrice: { amount: "69.00", currencyCode: "USD" }, minVariantPrice: { amount: "69.00", currencyCode: "USD" } },
    variants: [
      { id: "var-006", title: "Default Title", availableForSale: true, selectedOptions: [{ name: "Title", value: "Default Title" }], price: { amount: "69.00", currencyCode: "USD" } },
    ],
    featuredImage: img("1593062096033-9a26b09da705"),
    images: [img("1593062096033-9a26b09da705")],
    seo: { title: "Monitor Light Bar", description: "LED monitor light bar" },
    tags: ["accessories", "lighting"],
    updatedAt: new Date().toISOString(),
  },
];

export const collections: Collection[] = [
  {
    handle: "keyboards",
    title: "Keyboards",
    description: "Mechanical keyboards for developers",
    seo: { title: "Keyboards", description: "Mechanical keyboards" },
    updatedAt: new Date().toISOString(),
    path: "/search/keyboards",
  },
  {
    handle: "audio",
    title: "Audio",
    description: "Headphones and audio gear",
    seo: { title: "Audio", description: "Audio gear" },
    updatedAt: new Date().toISOString(),
    path: "/search/audio",
  },
  {
    handle: "accessories",
    title: "Accessories",
    description: "Hubs, webcams, desk accessories",
    seo: { title: "Accessories", description: "Desk accessories" },
    updatedAt: new Date().toISOString(),
    path: "/search/accessories",
  },
];

export const pages: Page[] = [
  {
    id: "page-about",
    title: "About",
    handle: "about",
    body: "<h1>About ByteGear</h1><p>We make premium peripherals for developers. Every product is designed for the people who spend 8+ hours a day at a desk writing code.</p>",
    bodySummary: "Premium peripherals for developers.",
    seo: { title: "About ByteGear", description: "Premium peripherals for developers" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page-shipping",
    title: "Shipping & Returns",
    handle: "shipping",
    body: "<h1>Shipping & Returns</h1><p>Free shipping on orders over $75. 30-day return policy, no questions asked.</p>",
    bodySummary: "Free shipping over $75. 30-day returns.",
    seo: { title: "Shipping & Returns", description: "Free shipping and returns" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const menus: Record<string, Menu[]> = {
  "next-js-frontend-header-menu": [
    { title: "All", path: "/search" },
    { title: "Keyboards", path: "/search/keyboards" },
    { title: "Audio", path: "/search/audio" },
    { title: "Accessories", path: "/search/accessories" },
  ],
  "next-js-frontend-footer-menu": [
    { title: "About", path: "/about" },
    { title: "Shipping & Returns", path: "/shipping" },
  ],
};

export const collectionProducts: Record<string, string[]> = {
  keyboards: ["prod-001"],
  audio: ["prod-002"],
  accessories: ["prod-003", "prod-004", "prod-005", "prod-006"],
  "hidden-homepage-featured-items": ["prod-001", "prod-002", "prod-003"],
  "hidden-homepage-carousel": ["prod-004", "prod-005", "prod-006"],
};
