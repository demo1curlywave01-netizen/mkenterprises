import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const imgs = import.meta.glob("@/assets/products/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const img = (k: string) => Object.entries(imgs).find(([p]) => p.endsWith(`/${k}.jpg`))?.[1] ?? "";

export type Product = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  bestseller?: boolean;
  isNew?: boolean;
  focus?: boolean;
};

export const categories = [
  { slug: "category-1", name: "Pain & Joint Care" },
  { slug: "category-2", name: "Vitamins & Immunity" },
  { slug: "category-3", name: "Digestive & Liver Care" },
  { slug: "category-4", name: "Hair & Skin Care" },
  { slug: "category-5", name: "Urinary & Wellness" },
];

export const businessInfo = {
  name: "M.K. ENTERPRISES",
  tagline: "Partners in Growth & Innovation",
  phone: "+91 91117 22209",
  phoneRaw: "9111722209",
  email: "enterprisesmk313@gmail.com",
  wa: "https://wa.me/919111722209",
  address: "Ward No. 7, Rajmohini Agri College Road, Azeerma, Ambikapur, Surguja (C.G.) 497001",
};

export const concerns = [
  "Daily Essentials",
  "Home Care",
  "Personal Care",
  "Gifting",
  "Office Supplies",
  "Wellness",
];

// [id, name, mrp, category index, bestseller, new, focus]
const raw: [string, string, number, number, boolean?, boolean?, boolean?][] = [
  // 8 Official Focus Products
  ["argoides-200", "Argoides Syrup 200ml", 350, 4, true, false, true],
  ["argoides-450", "Argoides Syrup 450ml", 590, 4, true, false, true],
  ["glutamil-cap", "Glutamil Capsules (1 Strip)", 432, 1, true, false, true],
  ["mahodadhi", "Mahodadhi Syrup 450ml", 790, 0, true, false, true],
  ["ten-days-syrup", "10 Days Syrup 200ml", 330, 2, true, true, true],
  ["mahaveni-oil", "Mahaveni Pain Oil", 250, 0, true, false, true],
  ["kiyo-pet", "Kiyo Pet Bottle", 590, 3, true, false, true],
  ["kenko-gold", "Kenco Gold Capsules Bottle", 600, 1, true, false, true],

  // Additional Catalog Products
  ["g-mom-syrup", "G-Mom Syrup 200ml", 350, 4, true, true],
  ["kneejoy", "Kneejoy", 499, 0, true],
  ["dynatac", "DYNATAC", 240, 0, false, true],
  ["jumbo-plus", "Jumbo Plus", 750, 1, true],
  ["platigo-g", "Platigo-G+ Tablets (10x1x10)", 311, 1],
  ["multiliv", "Multiliv Syrup 200ml", 206, 2, true],
  ["pile-tone", "Pile-Tone Syrup 200ml", 183, 2, false, true],
  ["kia-plus-syrup", "Kia Plus Syrup", 206, 2],
  ["kia-plus-tablet", "Kia Plus Tablet", 284, 2, true],
  ["glutamil-syrup", "Glutamil Syrup", 170, 2, false, true],
  ["aargo-face-wash", "Aargo Face Wash", 199, 3, true],
  ["aargo-hair-serum", "Aargo Hair Serum", 349, 3, false, true],
  ["urocitra", "Urocitra Tablets (10x1x10)", 275, 4, true],
];

export const products: Product[] = raw.map(([id, name, mrp, ci, bestseller, isNew, focus]) => ({
  id,
  name,
  mrp,
  price: Math.round(mrp * 0.85),
  image: img(id),
  category: categories[ci]!.slug,
  bestseller: !!bestseller,
  isNew: !!isNew,
  focus: !!focus,
}));

export const focusProducts: Product[] = products.filter((p) => p.focus);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type CartItem = { id: string; qty: number };
type Store = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("mk-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("mk-wish") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("mk-cart", JSON.stringify(cart));
    localStorage.setItem("mk-wish", JSON.stringify(wishlist));
  }, [cart, wishlist, ready]);

  const add = (id: string) => {
    setCart((c) => {
      const f = c.find((x) => x.id === id);
      return f ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { id, qty: 1 }];
    });
    setCartOpen(true);
  };
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty } : x))));
  const toggleWish = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <Ctx.Provider value={{ cart, wishlist, cartOpen, setCartOpen, add, setQty, toggleWish }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
