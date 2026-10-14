import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Mail, MessageCircle, Clock, MapPin, CheckCircle2, Send,
  ShieldCheck, Sparkles, AlertCircle, HelpCircle, ArrowRight
} from "lucide-react";
import { businessInfo, categories } from "@/lib/store";

export const Route = createFileRoute("/consult")({
  head: () => ({
    meta: [
      { title: "Consult an Expert & Product Enquiry — M.K. Enterprises" },
      { name: "description", content: "Submit an enquiry or consult our wellness and pharmaceutical experts at M.K. Enterprises. Get personalized product guidance and bulk inquiry support." },
      { property: "og:title", content: "Consult an Expert & Product Enquiry — M.K. Enterprises" },
      { property: "og:description", content: "Connect with our wellness specialists for tailored product guidance and quick inquiries." },
    ],
  }),
  component: ConsultPage,
});

const PHONE = businessInfo.phone;
const EMAIL = businessInfo.email;
const WA = businessInfo.wa;

function ConsultPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    category: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.message.trim()) {
      setError("Please fill in your name, mobile number, and enquiry message.");
      return;
    }
    setError("");
    setSubmitting(true);
    // Simulate network submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", mobile: "", category: "", message: "" });
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="bg-background min-h-[calc(100vh-200px)]">
      {/* Hero Banner */}
      <section className="bg-brand-gradient py-14 text-center text-primary-foreground px-4">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Expert Guidance & Support
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Consult an Expert & Enquiry
          </h1>
          <p className="mt-3 text-base opacity-90 md:text-lg">
            Have questions about our wellness formulations, dosages, or bulk orders? Speak directly with our dedicated specialists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Quick Contact Info */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">
                Get in Touch
                <span className="mt-2 block h-1 w-12 rounded bg-accent" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Whether you need assistance choosing the right Ayurvedic remedy, exploring our health supplements, or requesting bulk pricing, our team is ready to assist you.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-accent"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Call Us Directly</p>
                  <p className="mt-1 text-base font-bold text-foreground">{PHONE}</p>
                  <p className="text-xs text-muted-foreground">Mon – Sat, 9:30 AM to 6:30 PM IST</p>
                </div>
              </a>

              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-success"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp Chat</p>
                  <p className="mt-1 text-base font-bold text-foreground">Instant Consultation</p>
                  <p className="text-xs text-muted-foreground">Quick answers on {PHONE}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-accent"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Support</p>
                  <p className="mt-1 text-sm font-bold text-foreground break-all">{EMAIL}</p>
                  <p className="text-xs text-muted-foreground">Expect a reply within 24 business hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Registered Office</p>
                  <p className="mt-1 text-sm font-semibold text-foreground leading-snug">{businessInfo.address}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Ambikapur, Surguja, Chhattisgarh - 497001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Working Hours</p>
                  <p className="mt-1 text-sm font-bold text-foreground">Monday – Saturday</p>
                  <p className="text-xs text-muted-foreground">9:30 AM – 6:30 PM (Sunday Closed)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border bg-card p-6 shadow-lift md:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold text-foreground">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Thank you, <span className="font-semibold text-foreground">{form.name}</span>. Our healthcare specialist has received your inquiry and will reach out to you via <span className="font-semibold text-foreground">{form.mobile}</span> shortly.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="rounded-xl border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={WA}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-success px-6 py-2.5 text-sm font-bold text-success-foreground transition hover:brightness-105"
                    >
                      <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-foreground">
                      Send an Enquiry
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill out the form below and we will contact you with expert recommendations.
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Your Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    {/* Email & Mobile */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Mobile Number <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
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
                          placeholder="rahul@example.com"
                          className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                    </div>

                    {/* Category / Concern */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Category / Area of Concern
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Select a category or topic</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.name}>{c.name}</option>
                        ))}
                        <option value="Bulk Order / Dealership">Bulk Order / Dealership Enquiry</option>
                        <option value="Product Dosage & Advice">Product Dosage & Usage Advice</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Your Message / Enquiry Details <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Please describe your requirements, health symptoms, or questions about our products..."
                        className="mt-1.5 w-full rounded-xl border bg-background p-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-bold text-accent-foreground shadow-lift transition hover:scale-[1.01] hover:brightness-105 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                          Submitting Enquiry...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground">
                      By submitting this form, you consent to our team contacting you regarding your enquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
