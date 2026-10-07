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
  phone: "+91 93196 13876",
  phoneRaw: "9319613876",
  email: "Preetivishwakarma9408@gmail.com",
  wa: "https://wa.me/919319613876",
  gstin: "22ACBFM7860R1ZO",
  udyam: "CG-16-0013192",
  address: "Ward No. 7, Rajmohini Agri College Road, Azeerma, Ambikapur, Surguja (C.G.) 497001",
  partners: ["KRISHNAA JI", "Sandeep Upadhyay", "PREETI VISHWAKARMA"],
};

export const concerns = [
  "Daily Essentials",
  "Home Care",
  "Personal Care",
  "Gifting",
  "Office Supplies",
  "Wellness",
];

// [id, name, mrp, category index, bestseller, new]
const raw: [string, string, number, number, boolean?, boolean?][] = [
  ["mahaveni-oil", "Mahaveni Pain Oil 80ml", 299, 0, true],
  ["mahodadhi", "Mahodadhi Syrup 450ml", 450, 0, false, true],
  ["kneejoy", "Kneejoy", 499, 0, true],
  ["dynatac", "DYNATAC", 240, 0, false, true],
  ["kenko-gold", "Kenko Gold Multivitamin HPMC Capsule (30 caps)", 350, 1, true],
  ["jumbo-plus", "Jumbo Plus", 750, 1, true],
  ["glutamil-cap", "Glutamil Capsule", 170, 1, false, true],
  ["platigo-g", "Platigo-G+ Tablets (10x1x10)", 311, 1],
  ["multiliv", "Multiliv Syrup 200ml", 206, 2, true],
  ["pile-tone", "Pile-Tone Syrup 200ml", 183, 2, false, true],
  ["kia-plus-syrup", "Kia Plus Syrup", 206, 2],
  ["kia-plus-tablet", "Kia Plus Tablet", 284, 2, true],
  ["glutamil-syrup", "Glutamil Syrup", 170, 2, false, true],
  ["aargo-face-wash", "Aargo Face Wash", 199, 3, true],
  ["aargo-hair-serum", "Aargo Hair Serum", 349, 3, false, true],
  ["kiyo-pet", "Kiyo Det HPMC", 600, 3],
  ["urocitra", "Urocitra Tablets (10x1x10)", 275, 4, true],
  ["argoides-450", "Argoides Syrup 450ml", 590, 4, false, true],
  ["argoides-200", "Argoides Syrup 200ml", 350, 4],
];

export const products: Product[] = raw.map(([id, name, mrp, ci, bestseller, isNew]) => ({
  id,
  name,
  mrp,
  price: Math.round(mrp * 0.85),
  image: img(id),
  category: categories[ci]!.slug,
  bestseller: !!bestseller,
  isNew: !!isNew,
}));

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
