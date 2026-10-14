import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft, ChevronRight, ShieldCheck, BadgeCheck, Package, Award, RotateCcw, Headphones, Truck, Lock,
  Sparkles, Home as HomeIcon, Gift, Briefcase, HeartPulse, ShoppingBasket, MessageCircle,
} from "lucide-react";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import { categories, concerns, focusProducts, inr, products, useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M.K. Enterprises — Shop Quality Products Online" },
      { name: "description", content: "Shop bestsellers, new arrivals and combos from M.K. Enterprises. Fast shipping, easy returns and direct WhatsApp ordering across India." },
      { property: "og:title", content: "M.K. Enterprises — Shop Quality Products Online" },
      { property: "og:description", content: "Bestsellers, new arrivals and combos with fast shipping across India." },
    ],
  }),
  component: Index,
});

const slides = [
  { img: banner1, title: "Quality you can trust", sub: "Explore our bestselling range — now up to 25% off.", cta: "Shop Bestsellers", href: "/collections/category-1" },
  { img: banner2, title: "Festive Combos are here", sub: "Thoughtfully curated gift hampers for every occasion.", cta: "Explore Combos", href: "/combos" },
];
const concernIcons = [ShoppingBasket, HomeIcon, Sparkles, Gift, Briefcase, HeartPulse];

function Section({ title, children, viewAll }: { title: string; children: React.ReactNode; viewAll?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold md:text-3xl">{title}<span className="mt-2 block h-1 w-12 rounded bg-accent" /></h2>
        {viewAll && <Link to="/collections/$slug" params={{ slug: "category-1" }} className="text-sm font-semibold text-primary hover:text-accent">View All →</Link>}
      </div>
      {children}
    </section>
  );
}

function Index() {
  const [i, setI] = useState(0);
  const { add } = useStore();
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const best = products.filter((p) => p.bestseller).slice(0, 8);
  const fresh = products.filter((p) => p.isNew).slice(0, 8);
  const hero = products[0]!;
  const trust = [[ShieldCheck, "Quality Assured"], [BadgeCheck, "Certified Products"], [Package, "Secure Packaging"], [Award, "Premium Quality"], [Truck, "Pan-India Delivery"]] as const;

  return (
    <>
      {/* Slider */}
      <section className="relative overflow-hidden">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, idx) => (
            <div key={idx} className="relative min-w-full">
              <img src={s.img} alt={s.title} width={1600} height={640} className="h-[280px] sm:h-[400px] md:h-[520px] w-full object-cover" />
              <div className="absolute inset-0 flex items-center bg-gradient-to-r from-navy/80 via-navy/30 to-transparent">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 text-primary-foreground">
                  <h1 className="max-w-lg text-2xl font-extrabold sm:text-4xl md:text-5xl leading-tight">{s.title}</h1>
                  <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm md:text-base opacity-90">{s.sub}</p>
                  <Link to={s.href} className="mt-4 sm:mt-6 inline-block rounded-xl bg-accent px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-bold text-accent-foreground shadow-lift transition hover:scale-105">{s.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button aria-label="Previous" onClick={() => setI((i - 1 + slides.length) % slides.length)} className="absolute left-2 sm:left-3 top-1/2 grid h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-foreground"><ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /></button>
        <button aria-label="Next" onClick={() => setI((i + 1) % slides.length)} className="absolute right-2 sm:right-3 top-1/2 grid h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-foreground"><ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" /></button>
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:gap-2">
          {slides.map((_, d) => <button key={d} aria-label={`Slide ${d + 1}`} onClick={() => setI(d)} className={`h-1.5 sm:h-2 rounded-full transition-all ${d === i ? "w-6 sm:w-8 bg-accent" : "w-1.5 sm:w-2 bg-card"}`} />)}
        </div>
      </section>

      {/* Promo banners */}
      <section className="mx-auto grid max-w-7xl gap-3 sm:gap-4 px-3 sm:px-4 pt-6 sm:pt-8 md:grid-cols-2">
        <div className="rounded-2xl bg-brand-gradient p-5 sm:p-6 text-primary-foreground"><p className="text-xs sm:text-sm opacity-80">Limited offer</p><p className="text-xl sm:text-2xl font-extrabold">Flat 15% off on ₹499+</p><p className="mt-1 text-xs sm:text-sm">Use code <b>MK15</b></p></div>
        <div className="rounded-2xl bg-accent p-5 sm:p-6 text-accent-foreground"><p className="text-xs sm:text-sm opacity-90">Business buyers</p><p className="text-xl sm:text-2xl font-extrabold">Bulk orders, better prices</p><Link to="/consult" className="mt-1 inline-block text-xs sm:text-sm font-semibold underline">Send an inquiry →</Link></div>
      </section>

      <Section title="Shop by Need">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {concerns.map((c, idx) => {
            const Icon = concernIcons[idx]!;
            return (
              <Link key={c} to="/collections/$slug" params={{ slug: categories[idx % 5]!.slug }} className="group flex flex-col items-center gap-2 sm:gap-3 rounded-2xl border bg-card p-3 sm:p-5 text-center shadow-card transition hover:-translate-y-1 hover:border-accent">
                <span className="grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full bg-secondary text-primary transition group-hover:bg-accent group-hover:text-accent-foreground"><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></span>
                <span className="text-xs font-semibold sm:text-sm leading-tight">{c}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="Focus Products" viewAll>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{focusProducts.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <Section title="Bestsellers" viewAll>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{best.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <Section title="Shop by Category">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c, idx) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-2xl">
              <img src={products[idx * 4]!.image} alt={c.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3 sm:p-4 text-xs sm:text-base font-bold text-primary-foreground leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Trust strip */}
      <div className="overflow-hidden border-y bg-secondary py-3 sm:py-4">
        <div className="flex w-max animate-marquee gap-8 sm:gap-12">
          {[...trust, ...trust, ...trust, ...trust].map(([Icon, t], k) => (
            <span key={k} className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-semibold text-primary"><Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />{t}</span>
          ))}
        </div>
      </div>

      {/* Hero product promo */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6">
        <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-brand-gradient p-6 sm:p-8 md:grid-cols-2 md:p-12 text-primary-foreground">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent">Featured product</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">{hero.name}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base opacity-85">Our most-loved product, trusted by thousands of happy customers.</p>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold">{inr(hero.price)} <span className="text-sm sm:text-base line-through opacity-60">{inr(hero.mrp)}</span></p>
            <button onClick={() => add(hero.id)} className="mt-5 sm:mt-6 rounded-xl bg-accent px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-bold text-accent-foreground shadow-lift transition hover:scale-105">Shop Now</button>
          </div>
          <img src={hero.image} alt={hero.name} loading="lazy" className="mx-auto w-48 sm:w-64 md:w-72 rounded-3xl shadow-lift" />
        </div>
      </section>

      <Section title="New Arrivals" viewAll>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{fresh.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-3 sm:px-4 pb-14">
        {([[RotateCcw, "Easy Returns", "7-day return policy"], [Headphones, "24/7 Support", "We're always here"], [Truck, "Fast Shipping", "Pan-India delivery"], [MessageCircle, "WhatsApp Orders", "Direct on 9111722209"]] as const).map(([Icon, t, s]) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card">
            <span className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></span>
            <div><p className="text-sm sm:text-base font-bold">{t}</p><p className="text-xs text-muted-foreground">{s}</p></div>
          </div>
        ))}
      </section>
    </>
  );
}
