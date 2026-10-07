import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, Package, Gift, ArrowLeft, MessageCircle, Phone,
  ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2
} from "lucide-react";
import { businessInfo } from "@/lib/store";

export const Route = createFileRoute("/combos")({
  head: () => ({
    meta: [
      { title: "Combos — M.K. Enterprises" },
      { name: "description", content: "Curated value combos, health bundles and gift hampers from M.K. Enterprises." },
      { property: "og:title", content: "Combos — M.K. Enterprises" },
      { property: "og:description", content: "Combos are coming soon at M.K. Enterprises." },
    ],
  }),
  component: CombosPage,
});

function CombosPage() {
  const waComboUrl = `${businessInfo.wa}?text=Hello%20M.K.%20Enterprises!%20I%20am%20interested%20in%20your%20upcoming%20Combos%20and%20Gift%20Hampers.%20Please%20let%20me%20know%20when%20they%20are%20available.`;

  const upcomingCombos = [
    {
      title: "Joint & Mobility Care Combo",
      desc: "Synergistic blend of Mahaveni Pain Oil, Kneejoy & DYNATAC for joint relief & bone flexibility.",
      badge: "Save up to 30%",
      icon: "🦵",
    },
    {
      title: "Immunity & Vitality Booster Pack",
      desc: "Complete daily vitality kit featuring Kenko Gold Multivitamins, Jumbo Plus & Platigo-G.",
      badge: "Best Value",
      icon: "🛡️",
    },
    {
      title: "Digestive & Liver Health Kit",
      desc: "Herbal digestive wellness pairing of Multiliv Syrup, Kia Plus & Pile-Tone natural formulations.",
      badge: "Family Favorite",
      icon: "🌿",
    },
    {
      title: "Festive Wellness Gift Hamper",
      desc: "Premium gift box curated with ayurvedic daily essentials, perfect for gifting to loved ones.",
      badge: "Festive Special",
      icon: "🎁",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {/* Header Banner */}
      <section className="bg-brand-gradient px-4 py-10 sm:py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">
            <Gift className="h-3.5 w-3.5" /> Curated Bundles & Packs
          </span>
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Value Combos & Hampers
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base opacity-85">
            Hand-picked Ayurvedic & wellness pairings designed to give you better results at greater value
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-8 sm:py-12">
        <div className="overflow-hidden rounded-3xl border-2 border-accent/40 bg-card p-6 sm:p-12 shadow-lift">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-accent">
              <Sparkles className="h-4 w-4" /> Feature Update
            </span>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl md:text-5xl">
              Combos are Coming Soon
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              We are curating custom health bundles, festive gift packs, and family wellness combos with exclusive combination discounts. Stay tuned as we launch these special packs soon!
            </p>
          </div>

          {/* Upcoming Combos Preview */}
          <div className="mt-10">
            <h3 className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Sneak Peek of Upcoming Combos
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {upcomingCombos.map((combo) => (
                <div
                  key={combo.title}
                  className="flex items-start gap-4 rounded-2xl border bg-secondary/30 p-5 transition hover:border-accent/50 hover:bg-secondary/50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card text-2xl shadow-xs">
                    {combo.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm sm:text-base font-bold text-foreground truncate">{combo.title}</p>
                      <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                        {combo.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {combo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Order / Inquire Box */}
          <div className="mt-10 rounded-2xl border bg-primary/5 p-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-foreground">
                Want a custom combo or bulk corporate gifting?
              </h4>
              <p className="text-xs text-muted-foreground">
                Our specialists can prepare tailor-made combo packages for your clinic, office, or family needs.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href={waComboUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-success px-5 py-3 text-xs sm:text-sm font-bold text-success-foreground shadow-sm transition hover:brightness-105"
              >
                <MessageCircle className="h-4 w-4" /> Inquire via WhatsApp
              </a>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs sm:text-sm font-bold text-accent-foreground shadow-sm transition hover:brightness-105"
              >
                Consult an Expert
              </Link>
            </div>
          </div>

          {/* Navigation Action */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 border-t pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              to="/collections/$slug"
              params={{ slug: "category-1" }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-accent"
            >
              Shop All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
