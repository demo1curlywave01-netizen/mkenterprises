import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, ArrowLeft, Trash2, Sparkles } from "lucide-react";
import { products, useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — M.K. Enterprises" },
      { name: "description", content: "View and manage your saved products at M.K. Enterprises." },
      { property: "og:title", content: "My Wishlist — M.K. Enterprises" },
      { property: "og:description", content: "Saved products at M.K. Enterprises." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWish, add } = useStore();
  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishedProducts.forEach((p) => add(p.id));
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {/* Header Banner */}
      <section className="bg-brand-gradient px-4 py-12 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">
            <Heart className="h-3.5 w-3.5 fill-current" /> Saved Items
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm opacity-85 md:text-base">
            {wishedProducts.length === 1
              ? "1 saved product"
              : `${wishedProducts.length} saved products`}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        {wishedProducts.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border bg-card p-8 text-center shadow-card md:p-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground">
              <Heart className="h-10 w-10 stroke-[1.5]" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-foreground">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't saved any items yet. Browse our Ayurvedic health remedies and premium wellness collections to save your favorites!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground shadow-sm transition hover:scale-105"
              >
                <ShoppingBag className="h-4 w-4" /> Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Top Toolbar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-sm transition hover:brightness-105"
                >
                  <ShoppingBag className="h-4 w-4" /> Add All to Cart
                </button>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              {wishedProducts.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
