import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Phone, Mail, Facebook, Instagram, MessageCircle, Search, User, Heart, ShoppingBag,
  Menu, X, ChevronDown, Home, Minus, Plus, Trash2, MapPin, ShieldCheck,
} from "lucide-react";
import logo from "@/assets/mk-logo.png";
import { businessInfo, categories, inr, products, useStore } from "@/lib/store";

const PHONE = businessInfo.phone;
const EMAIL = businessInfo.email;
const WA = businessInfo.wa;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
      <img src={logo} alt="M.K. Enterprises logo" className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-sm shrink-0" />
      <span className="leading-tight">
        <span className="block text-base sm:text-lg font-extrabold tracking-tight text-primary">M.K. ENTERPRISES</span>
        <span className="hidden sm:block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Partners in Growth & Innovation</span>
      </span>
    </Link>
  );
}

function Header() {
  const { cart, wishlist, setCartOpen } = useStore();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const count = cart.reduce((a, b) => a + b.qty, 0);
  const results = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  const nav = (
    <>
      <Link to="/" className="hover:text-accent">Home</Link>
      <div className="group relative">
        <button className="flex items-center gap-1 hover:text-accent">All Products <ChevronDown className="h-4 w-4" /></button>
        <div className="invisible absolute left-0 top-full z-40 w-56 rounded-xl border bg-popover p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100">
          {categories.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">{c.name}</Link>
          ))}
          <a href="/bulk-inquiry" className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent hover:bg-secondary">Bulk Inquiry</a>
        </div>
      </div>
      <Link to="/combos" className="hover:text-accent">Combos</Link>
      <Link to="/consult" className="hover:text-accent">Consult an Expert</Link>
      <Link to="/consult" className="hover:text-accent">Bulk Inquiry</Link>
    </>
  );

  return (
    <>
      <div className="bg-navy text-xs text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="hidden items-center gap-4 md:flex">
            <a href={`tel:${businessInfo.phoneRaw}`} className="flex items-center gap-1 hover:text-accent transition">
              <Phone className="h-3.5 w-3.5" />{PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1 hover:text-accent transition">
              <Mail className="h-3.5 w-3.5" />{EMAIL}
            </a>
          </div>
          <p className="flex-1 text-center font-semibold md:flex-none">
            GET 15% OFF ON ₹499+ | Use code <span className="rounded bg-accent px-1.5 py-0.5 text-accent-foreground">MK15</span>
          </p>
          <div className="hidden items-center gap-3 md:flex">
            <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={WA} aria-label="WhatsApp"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMobile(true)}><Menu /></button>
          <Logo />
          <nav className="ml-8 hidden items-center gap-6 text-sm font-semibold lg:flex">{nav}</nav>
          <div className="ml-auto flex items-center gap-4">
            <button aria-label="Search" onClick={() => setSearch(true)}><Search className="h-5 w-5" /></button>
            <a href="/login" aria-label="Login" className="hidden md:block"><User className="h-5 w-5" /></a>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden md:block">
              <Heart className="h-5 w-5" />
              <Badge n={wishlist.length} />
            </Link>
            <button aria-label="Cart" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              <Badge n={count} />
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-navy/50" onClick={() => setMobile(false)}>
          <div className="flex h-full w-72 flex-col gap-5 bg-card p-6 text-base font-semibold" onClick={(e) => e.stopPropagation()}>
            <button className="self-end" onClick={() => setMobile(false)} aria-label="Close"><X /></button>
            {nav}
          </div>
        </div>
      )}

      {search && (
        <div className="fixed inset-0 z-50 bg-navy/60 p-4" onClick={() => setSearch(false)}>
          <div className="mx-auto mt-20 max-w-2xl rounded-2xl bg-card p-4 shadow-lift" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 rounded-xl border px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full bg-transparent py-3 outline-none" />
              <button onClick={() => setSearch(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <ul className="mt-2">
              {results.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary">
                  <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1 text-sm">{p.name}</span>
                  <span className="text-sm font-bold text-primary">{inr(p.price)}</span>
                </li>
              ))}
              {q && !results.length && <li className="p-3 text-sm text-muted-foreground">No products found.</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function Badge({ n }: { n: number }) {
  if (!n) return null;
  return <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{n}</span>;
}

function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty } = useStore();
  const items = cart.map((c) => ({ ...c, p: products.find((p) => p.id === c.id)! })).filter((x) => x.p);
  const subtotal = items.reduce((a, b) => a + b.p.price * b.qty, 0);
  if (!cartOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-navy/50" onClick={() => setCartOpen(false)}>
      <aside className="ml-auto flex h-full w-full max-w-full sm:max-w-md flex-col bg-card animate-in slide-in-from-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Your Cart ({items.length})</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-1 hover:text-primary"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {!items.length && <p className="py-12 text-center text-muted-foreground">Your cart is empty.</p>}
          {items.map(({ p, qty }) => (
            <div key={p.id} className="flex gap-3 rounded-xl border p-3">
              <img src={p.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-sm font-bold text-primary">{inr(p.price)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <button className="rounded border p-1" onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button className="rounded border p-1" onClick={() => setQty(p.id, qty + 1)} aria-label="Increase"><Plus className="h-3 w-3" /></button>
                  <button className="ml-auto text-muted-foreground hover:text-destructive" onClick={() => setQty(p.id, 0)} aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!!items.length && (
          <div className="space-y-4 border-t p-4 bg-muted/20">
            <div className="flex justify-between items-center text-base font-bold">
              <span>Subtotal</span>
              <span className="text-xl text-primary">{inr(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full rounded-2xl bg-accent py-3.5 text-center font-extrabold text-accent-foreground shadow-lift transition hover:brightness-105 active:scale-[0.99]"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-navy pb-20 text-primary-foreground lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3 text-sm opacity-90">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 p-1 backdrop-blur">
              <img src={logo} alt="M.K. Enterprises logo" className="h-full w-full object-contain" />
            </span>
            <p className="text-xl font-extrabold tracking-tight">M.K. ENTERPRISES</p>
          </div>
          <p className="text-xs text-primary-foreground/80">{businessInfo.tagline}</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /><a href={`tel:${businessInfo.phoneRaw}`} className="hover:underline">{PHONE}</a></p>
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-accent" /><a href={`mailto:${EMAIL}`} className="hover:underline break-all">{EMAIL}</a></p>
          <p className="flex items-start gap-2 text-xs leading-relaxed opacity-80"><MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />{businessInfo.address}</p>
          <div className="flex gap-3 pt-2">
            <Facebook className="h-5 w-5 hover:text-accent cursor-pointer" /><Instagram className="h-5 w-5 hover:text-accent cursor-pointer" /><a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 hover:text-success" /></a>
          </div>
        </div>
        <FooterCol title="About Us" links={[["Home", "/"], ["Shop", "/collections/category-1"], ["Consult an Expert", "/consult"], ["Wishlist", "/wishlist"]]} />
        <FooterCol title="Categories" links={categories.map((c) => [c.name, `/collections/${c.slug}`])} />
        <FooterCol title="Information" links={[["About", "/about"], ["Privacy Policy", "/privacy"], ["Refund Policy", "/refund"], ["Shipping Policy", "/shipping"], ["Terms of Service", "/terms"], ["Consult / Inquiry", "/consult"]]} />
      </div>

      {/* Official Registration & Trust Bar */}
      <div className="border-t border-primary-foreground/10 bg-black/20 px-4 py-4 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 opacity-80">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Govt. Registered Enterprise</span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono">GSTIN: {businessInfo.gstin}</span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono">UDYAM: {businessInfo.udyam}</span>
          </div>
          <p className="text-[11px]">Partners: {businessInfo.partners.join(" • ")}</p>
        </div>
      </div>

      <p className="border-t border-primary-foreground/10 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} M.K. Enterprises. All rights reserved.</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="mb-3 font-bold text-accent">{title}</p>
      <ul className="space-y-2 text-sm opacity-90">
        {links.map(([l, h]) => <li key={l}><a href={h} className="hover:text-accent">{l}</a></li>)}
      </ul>
    </div>
  );
}

function MobileBar() {
  const { cart, wishlist, setCartOpen } = useStore();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-card py-2 text-[11px] font-medium lg:hidden">
      <Link to="/" className="flex flex-col items-center gap-0.5"><Home className="h-5 w-5" />Home</Link>
      <Link to="/wishlist" className="relative flex flex-col items-center gap-0.5">
        <Heart className="h-5 w-5" />
        Wishlist ({wishlist.length})
      </Link>
      <button onClick={() => setCartOpen(true)} className="flex flex-col items-center gap-0.5"><ShoppingBag className="h-5 w-5" />Cart ({cart.reduce((a, b) => a + b.qty, 0)})</button>
    </nav>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBar />
      <CartDrawer />
      <a href={WA} aria-label="Chat on WhatsApp" className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground shadow-lift lg:bottom-6">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
