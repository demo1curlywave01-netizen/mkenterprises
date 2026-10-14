import { Heart } from "lucide-react";
import { inr, useStore, type Product } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { add, wishlist, toggleWish } = useStore();
  const off = Math.round((1 - p.price / p.mrp) * 100);
  const wished = wishlist.includes(p.id);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1">
        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
          {off}% OFF
        </span>
      </div>
      <button
        aria-label="Add to wishlist"
        onClick={() => toggleWish(p.id)}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-card shadow-card"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold">{p.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">{inr(p.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{inr(p.mrp)}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">Incl. of all taxes</p>
        <button
          onClick={() => add(p.id)}
          className="mt-auto rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
