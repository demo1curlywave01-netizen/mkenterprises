import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, MessageCircle, Phone, ArrowLeft,
  Truck, CheckCircle2, ShoppingBag, Sparkles
} from "lucide-react";
import { businessInfo, inr, products, useStore } from "@/lib/store";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "WhatsApp Ordering — M.K. Enterprises" },
      { name: "description", content: "Place and confirm your order directly on WhatsApp with M.K. Enterprises." },
      { property: "og:title", content: "WhatsApp Ordering — M.K. Enterprises" },
      { property: "og:description", content: "Direct WhatsApp orders at +91 91117 22209." },
    ],
  }),
  component: PaymentPage,
});

export function PaymentPage() {
  const { cart } = useStore();

  const items = cart
    .map((c) => {
      const p = products.find((x) => x.id === c.id);
      return p ? { product: p, qty: c.qty } : null;
    })
    .filter(Boolean) as { product: (typeof products)[0]; qty: number }[];

  const subtotal = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);

  const orderListText = items
    .map((it, idx) => `${idx + 1}. ${it.product.name} (Qty: ${it.qty}) - ${inr(it.product.price * it.qty)}`)
    .join("%0A");

  const waOrderUrl = `${businessInfo.wa}?text=Hello%20M.K.%20Enterprises!%20I%20would%20like%20to%20place%20my%20order:%0A%0A${orderListText || "I%20want%20to%20order%20products"}%0A%0ATotal%20Amount:%20${inr(subtotal)}%0A%0APlease%20confirm%20my%20order%20for%20delivery.`;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {/* Header Banner */}
      <section className="bg-brand-gradient px-4 py-10 sm:py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-success backdrop-blur">
            <MessageCircle className="h-3.5 w-3.5" /> Direct WhatsApp Order
          </span>
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Order via WhatsApp
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base opacity-85">
            Instant booking and confirmation on WhatsApp (+91 91117 22209)
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-3 sm:px-6 py-8 sm:py-12">
        <div className="overflow-hidden rounded-3xl border bg-card p-6 sm:p-10 shadow-lift">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-foreground">
              Direct Orders on WhatsApp: 9111722209
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground leading-relaxed">
              We take all orders directly on WhatsApp for fastest confirmation, personalized dosage guidance, and Pan-India doorstep delivery.
            </p>
          </div>

          {/* Amount Due & Action Card */}
          <div className="mt-8 rounded-2xl border bg-primary/5 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Order Value</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">{inr(subtotal)}</p>
                <p className="text-xs text-muted-foreground">Free Delivery Across India • 100% Genuine Ayurvedic Products</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <ShieldCheck className="h-5 w-5" /> 100% Genuine & Trusted Products
              </div>
            </div>

            <div className="pt-5 space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click below to send your cart list directly to our official WhatsApp support number <b>+91 91117 22209</b>. Our team will immediately reply to confirm your delivery address and dispatch your order.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={waOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-6 py-4 text-base font-extrabold text-white shadow-lift transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="h-5 w-5 fill-white" /> Order on WhatsApp (9111722209)
                </a>
                <a
                  href={`tel:${businessInfo.phoneRaw}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4" /> Call: {businessInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              <span>100% Genuine Herbal & Ayurvedic</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent shrink-0" />
              <span>Safe Pan-India Doorstep Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-success shrink-0" />
              <span>Instant WhatsApp Confirmation</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Go to Checkout
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Continue Shopping
            </Link>
            <Link
              to="/consult"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-sm transition hover:scale-105"
            >
              Need Help? Consult an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
