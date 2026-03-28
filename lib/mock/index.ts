import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type {
  Cart,
  CartItem,
  Collection,
  Menu,
  Page,
  Product,
} from "lib/shopify/types";
import {
  products as allProducts,
  collections as allCollections,
  pages as allPages,
  menus,
  collectionProducts,
} from "./data";
import { HIDDEN_PRODUCT_TAG, TAGS } from "lib/constants";

type CartStore = {
  id: string;
  lines: CartItem[];
};

function getCartFromCookie(): CartStore {
  try {
    const raw = require("next/headers")
      .cookies()
      .get("cart")?.value;
    if (raw) return JSON.parse(raw);
  } catch {}
  return { id: `cart_${Date.now()}`, lines: [] };
}

async function setCartCookie(cart: CartStore) {
  (await cookies()).set("cart", JSON.stringify(cart), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
}

function cartStoreToCart(store: CartStore): Cart {
  const totalAmount = store.lines.reduce((sum, line) => {
    return sum + parseFloat(line.cost.totalAmount.amount) * line.quantity;
  }, 0);

  return {
    id: store.id,
    checkoutUrl: "/",
    cost: {
      subtotalAmount: { amount: totalAmount.toFixed(2), currencyCode: "USD" },
      totalAmount: { amount: totalAmount.toFixed(2), currencyCode: "USD" },
      totalTaxAmount: { amount: "0.00", currencyCode: "USD" },
    },
    lines: store.lines,
    totalQuantity: store.lines.reduce((sum, l) => sum + l.quantity, 0),
  };
}

export async function createCart(): Promise<Cart> {
  const store: CartStore = { id: `cart_${Date.now()}`, lines: [] };
  await setCartCookie(store);
  return cartStoreToCart(store);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const store = getCartFromCookie();

  for (const line of lines) {
    const variant = allProducts
      .flatMap((p) => p.variants.map((v) => ({ variant: v, product: p })))
      .find((x) => x.variant.id === line.merchandiseId);

    if (!variant) continue;

    const existing = store.lines.find(
      (l) => l.merchandise.id === line.merchandiseId
    );

    if (existing) {
      existing.quantity += line.quantity;
      existing.cost.totalAmount.amount = (
        parseFloat(variant.variant.price.amount) * existing.quantity
      ).toFixed(2);
    } else {
      store.lines.push({
        id: `line_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        quantity: line.quantity,
        cost: {
          totalAmount: {
            amount: variant.variant.price.amount,
            currencyCode: "USD",
          },
        },
        merchandise: {
          id: variant.variant.id,
          title: variant.variant.title,
          selectedOptions: variant.variant.selectedOptions,
          product: {
            id: variant.product.id,
            handle: variant.product.handle,
            title: variant.product.title,
            featuredImage: variant.product.featuredImage,
          },
        },
      });
    }
  }

  await setCartCookie(store);
  return cartStoreToCart(store);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const store = getCartFromCookie();
  store.lines = store.lines.filter((l) => !lineIds.includes(l.id!));
  await setCartCookie(store);
  return cartStoreToCart(store);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const store = getCartFromCookie();

  for (const update of lines) {
    const line = store.lines.find((l) => l.id === update.id);
    if (line) {
      line.quantity = update.quantity;
      const variant = allProducts
        .flatMap((p) => p.variants)
        .find((v) => v.id === update.merchandiseId);
      if (variant) {
        line.cost.totalAmount.amount = (
          parseFloat(variant.price.amount) * update.quantity
        ).toFixed(2);
      }
    }
  }

  store.lines = store.lines.filter((l) => l.quantity > 0);
  await setCartCookie(store);
  return cartStoreToCart(store);
}

export async function getCart(): Promise<Cart | undefined> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cart");
  if (!cartCookie?.value) return undefined;

  try {
    const store: CartStore = JSON.parse(cartCookie.value);
    if (!store.lines || store.lines.length === 0) return undefined;
    return cartStoreToCart(store);
  } catch {
    return undefined;
  }
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  return allCollections.find((c) => c.handle === handle);
}

export async function getCollectionProducts({
  collection,
  sortKey,
  reverse,
}: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const productIds = collectionProducts[collection] ?? [];
  let items = allProducts.filter((p) => productIds.includes(p.id));

  if (sortKey === "PRICE") {
    items.sort((a, b) => {
      const pa = parseFloat(a.priceRange.minVariantPrice.amount);
      const pb = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? pb - pa : pa - pb;
    });
  } else if (sortKey === "CREATED_AT") {
    if (reverse) items.reverse();
  }

  return items;
}

export async function getCollections(): Promise<Collection[]> {
  return allCollections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  return menus[handle] ?? [];
}

export async function getPage(handle: string): Promise<Page> {
  const page = allPages.find((p) => p.handle === handle);
  if (!page) {
    return {
      id: "not-found",
      title: "Not Found",
      handle,
      body: "<p>Page not found.</p>",
      bodySummary: "Page not found",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  return page;
}

export async function getPages(): Promise<Page[]> {
  return allPages;
}

export async function getProduct(
  handle: string
): Promise<Product | undefined> {
  return allProducts.find((p) => p.handle === handle);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  return allProducts.filter((p) => p.id !== productId).slice(0, 4);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  let items = allProducts.filter(
    (p) => !p.tags.includes(HIDDEN_PRODUCT_TAG)
  );

  if (query) {
    const q = query.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (sortKey === "PRICE") {
    items.sort((a, b) => {
      const pa = parseFloat(a.priceRange.minVariantPrice.amount);
      const pb = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? pb - pa : pa - pb;
    });
  } else if (sortKey === "CREATED_AT") {
    if (reverse) items.reverse();
  }

  return items;
}

export async function revalidate(
  req: NextRequest
): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
