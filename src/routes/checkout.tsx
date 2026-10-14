import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag, ShieldCheck, ArrowLeft, Truck, CheckCircle2,
  Lock, CreditCard, User, MapPin, Phone, Mail, ArrowRight,
  MessageCircle, Sparkles
} from "lucide-react";
import { businessInfo, inr, products, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — M.K. Enterprises" },
      { name: "description", content: "Complete your order with M.K. Enterprises." },
      { property: "og:title", content: "Checkout — M.K. Enterprises" },
      { property: "og:description", content: "Secure checkout at M.K. Enterprises." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Chhattisgarh",
    pincode: "",
  });

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

  const handleOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalWaUrl = `${businessInfo.wa}?text=${encodeURIComponent(
      `Hello M.K. Enterprises! I would like to place an order:\n\n` +
      items.map((it, idx) => `${idx + 1}. ${it.product.name} (Qty: ${it.qty}) - ${inr(it.product.price * it.qty)}`).join("\n") +
      `\n\nTotal Amount: ${inr(subtotal)}` +
      `\n\nCustomer Details:` +
      `\nName: ${form.fullName || "Valued Customer"}` +
      `\nPhone: ${form.phone || ""}` +
      `\nAddress: ${form.address || ""}, ${form.city || ""}, ${form.state || ""} - ${form.pincode || ""}`
    )}`;
    window.open(finalWaUrl, "_blank");
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {/* Header Banner */}
      <section className="bg-brand-gradient px-4 py-10 sm:py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-success backdrop-blur">
            <MessageCircle className="h-3.5 w-3.5" /> Direct WhatsApp Ordering: +91 91117 22209
          </span>
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Order via WhatsApp
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base opacity-85">
            Fill your delivery details below to place your order directly with our team on WhatsApp ({businessInfo.phone})
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-3 sm:px-6 py-8 sm:py-12">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border bg-card p-8 text-center shadow-card md:p-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground">
              <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-foreground">
              Your Cart is Empty
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some of our bestselling health and Ayurvedic wellness remedies to proceed with checkout.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lift transition hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" /> Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleOrderWhatsApp} className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Delivery Address Form */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-3xl border bg-card p-5 sm:p-8 shadow-card">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Mobile Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9XXXXXXXXX"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Street Address / House No. / Landmark <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="House / Flat No., Road, Landmark, Area"
                      className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        City <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="e.g. Ambikapur"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        State <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        placeholder="Chhattisgarh"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        PIN Code <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        placeholder="497001"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Confidence Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-xs">
                  <Truck className="h-5 w-5 text-accent shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-foreground">Free Shipping</p>
                    <p className="text-muted-foreground">All across India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-xs">
                  <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-foreground">Genuine Quality</p>
                    <p className="text-muted-foreground">100% Authentic</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-xs">
                  <Lock className="h-5 w-5 text-accent shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-foreground">Secure Orders</p>
                    <p className="text-muted-foreground">Verified Merchant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Payment Button */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border bg-card p-5 sm:p-7 shadow-lift">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    Order Summary ({items.reduce((a, b) => a + b.qty, 0)} items)
                  </h3>
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                    Step 2
                  </span>
                </div>

                {/* Items List */}
                <div className="mt-4 max-h-72 divide-y overflow-y-auto pr-1">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-xl border object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {qty} × {inr(product.price)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs sm:text-sm font-bold text-primary">
                          {inr(product.price * qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals Calculation */}
                <div className="mt-4 space-y-2 border-t pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">{inr(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping & Handling</span>
                    <span className="font-bold text-success">FREE</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span className="text-xs">Included</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-lg font-extrabold text-foreground">
                    <span>Total Amount</span>
                    <span className="text-primary">{inr(subtotal)}</span>
                  </div>
                </div>

                {/* Primary WhatsApp Order Button */}
                <div className="mt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-4 text-base sm:text-lg font-extrabold text-white shadow-lift transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <MessageCircle className="h-6 w-6 fill-white" />
                    <span>Confirm Order on WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${businessInfo.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-secondary/50 px-5 py-3 text-sm font-bold text-foreground transition hover:bg-secondary"
                  >
                    <Phone className="h-4 w-4 text-accent" /> Call Support ({businessInfo.phone})
                  </a>
                </div>

                <div className="mt-5 border-t pt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Official Support: <a href={`tel:${businessInfo.phoneRaw}`} className="font-semibold text-primary hover:underline">{businessInfo.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 text-xs font-semibold">
                <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
                </Link>
                <span className="text-border">•</span>
                <Link to="/consult" className="text-accent hover:underline">
                  Need Help? Consult an Expert
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
