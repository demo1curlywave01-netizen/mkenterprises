import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard, ShieldCheck, Clock, MessageCircle, Phone, ArrowLeft,
  Sparkles, CheckCircle2, Lock, AlertCircle, ShoppingBag, Truck
} from "lucide-react";
import { businessInfo, inr, products, useStore } from "@/lib/store";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment — M.K. Enterprises" },
      { name: "description", content: "Payment options and gateway status at M.K. Enterprises." },
      { property: "og:title", content: "Payment — M.K. Enterprises" },
      { property: "og:description", content: "Payments are coming soon at M.K. Enterprises." },
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

  const waOrderUrl = `${businessInfo.wa}?text=Hello%20M.K.%20Enterprises!%20I%20would%20like%20to%20complete%20my%20order%20payment:%0A%0A${orderListText}%0A%0ATotal%20Amount:%20${inr(subtotal)}%0A%0APlease%20provide%20payment%20details%20(UPI%20QR%20/%20Bank%20Transfer%20/%20COD).`;

  const paymentMethods = [
    {
      name: "UPI / QR Code",
      desc: "Google Pay, PhonePe, Paytm, BHIM & all UPI apps",
      status: "Gateway Launching Soon",
      icon: "⚡",
    },
    {
      name: "Debit & Credit Cards",
      desc: "Visa, MasterCard, RuPay, Maestro",
      status: "Integration in Progress",
      icon: "💳",
    },
    {
      name: "Net Banking",
      desc: "SBI, HDFC, ICICI, Axis and 50+ Indian banks",
      status: "Integration in Progress",
      icon: "🏦",
    },
    {
      name: "Cash on Delivery (COD)",
      desc: "Pay in cash when order arrives at your doorstep",
      status: "Available via Support",
      icon: "📦",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {/* Header Banner */}
      <section className="bg-brand-gradient px-4 py-10 sm:py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">
            <Lock className="h-3.5 w-3.5" /> Secure Checkout Step 3
          </span>
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Order Payment
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base opacity-85">
            Safe, encrypted payment processing for your Ayurvedic & wellness order
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-3 sm:px-6 py-8 sm:py-12">
        {/* Coming Soon Notice Card */}
        <div className="overflow-hidden rounded-3xl border-2 border-accent/40 bg-card p-6 sm:p-10 shadow-lift">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-accent">
              <Sparkles className="h-4 w-4" /> Gateway Status
            </span>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl md:text-5xl">
              Payments are Coming Soon
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              We are actively integrating our automated 256-bit secure payment gateway for seamless instant payments with instant order confirmation.
            </p>
          </div>

          {/* Supported Methods Preview */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((m) => (
              <div
                key={m.name}
                className="flex items-start gap-3.5 rounded-2xl border bg-secondary/30 p-4 transition hover:border-accent/50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-xl shadow-xs">
                  {m.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-foreground">{m.name}</p>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                      {m.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Due & Instant Payment Option */}
          <div className="mt-8 rounded-2xl border bg-primary/5 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Payable Amount</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">{inr(subtotal)}</p>
                <p className="text-xs text-muted-foreground">Including all taxes & Free Pan-India Delivery</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <ShieldCheck className="h-5 w-5" /> Verified Govt. Registered Enterprise
              </div>
            </div>

            <div className="pt-5">
              <h3 className="text-sm font-bold text-foreground">
                How to complete your order today:
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Connect directly with our billing support team via WhatsApp or phone. We will share our official UPI QR code / bank transfer details, or confirm your order for <b>Cash on Delivery (COD)</b>.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-success px-5 py-3.5 text-sm font-bold text-success-foreground shadow-sm transition hover:brightness-105 active:scale-[0.99]"
                >
                  <MessageCircle className="h-5 w-5" /> Pay / Order via WhatsApp
                </a>
                <a
                  href={`tel:${businessInfo.phoneRaw}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99]"
                >
                  <Phone className="h-5 w-5" /> Call for Payment ({businessInfo.phone})
                </a>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t pt-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4 text-accent" /> 100% Genuine Products
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Truck className="h-4 w-4 text-accent" /> Free Safe Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Lock className="h-4 w-4 text-accent" /> Direct Partner Support
            </span>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Checkout
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
