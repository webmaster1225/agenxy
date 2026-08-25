"use client";

import { FormEvent, useEffect, useState } from "react";
import { faqs } from "@/lib/data";
import { LogoMarquee } from "@/components/LogoMarquee";

const steps = [
  { num: "{01}", title: "Send Us A Message" },
  { num: "{02}", title: "Share your vision and requirements" },
  { num: "{03}", title: "We'lll evaluate within 24-48 hours whether your project is the right fit" },
];

const budgets = ["$5k-$10k", "$10k-$25k", "$25k+"];

const heroWords = [
  { text: "Create", weight: "font-semibold" as const },
  { text: "Design", weight: "font-semibold" as const },
  { text: "Build", weight: "font-bold" as const },
];

function RotatingHeroWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroWords.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-[100.8px]">
      {heroWords.map((word, i) => (
        <h1
          key={word.text}
          aria-hidden={i !== index}
          className={`absolute inset-0 font-display text-[72px] leading-[100.8px] tracking-[-0.2px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${word.weight} ${
            i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {word.text}
        </h1>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState(budgets[0]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-ink text-snow">
      {/* Hero */}
      <section className="px-10 pb-10 pt-8">
        <p className="font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-[#f55733]">
          Get In Touch
        </p>
        <div className="mt-8 max-w-[680px] lg:ml-[400px]">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-6">
            <h2 className="font-display text-[72px] font-semibold leading-[72px] tracking-[-5.76px]">
              Let&apos;s{" "}
            </h2>
            <RotatingHeroWord />
          </div>
          <h2 className="font-display text-[72px] font-semibold leading-[72px] tracking-[-5.76px] text-[#9ea1a3]">
            Incredible Work{" "}
          </h2>
          <h2 className="font-display text-[72px] font-semibold leading-[72px] tracking-[-5.76px] text-[#9ea1a3]">
            Together
          </h2>
        </div>
      </section>

      {/* Yalla Habebe + contact info */}
      <section className="px-10 py-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="pt-1">
            <p className="font-display text-[16px] leading-[19.2px]">Yalla Habebe</p>
            <p className="font-display text-[14px] font-medium leading-[16.8px] text-[#5c6063]">Founder</p>
          </div>
          <div>
            <h2 className="max-w-[768px] font-display text-[40px] font-semibold leading-[56px] tracking-[-2.4px]">
              &quot; We&apos;re always open to new collaborations and would love to hear about your projects. Please
              reach out through any of the channels below if you&apos;re interested in working together.
            </h2>
            <p className="mt-6 font-sans text-[16px] leading-[19.2px]">Élan Studio</p>
            <div className="mt-10">
              <p className="font-display text-[16px] font-medium leading-[20.8px] tracking-[0.8px] text-[#f55733]">
                {"{Mail to}"}
              </p>
              <a
                href="mailto:hello@agenxy.com"
                className="mt-1 block font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-snow hover:text-[#f55733]"
              >
                hello@agenxy.com
              </a>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-display text-[20px] leading-[26px] tracking-[-1px] text-[#f55733]">Address</p>
                <p className="mt-2 font-display text-[18px] leading-[25.3px] tracking-[-0.72px]">
                  3000 NE 2nd Ave
                  <br />
                  Miami, FL 33137
                </p>
              </div>
              <div>
                <p className="font-display text-[20px] leading-[26px] tracking-[-1px] text-[#f55733]">Office Hours</p>
                <p className="mt-2 font-display text-[18px] leading-[25.3px] tracking-[-0.72px]">9AM to 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps + form */}
      <section className="px-10 py-36">
        <form onSubmit={onSubmit} className="flex flex-col gap-[20px]">
          {/* Row 1 — {01} + Subject / Phone */}
          <div className="grid items-start gap-10 lg:grid-cols-[300px_minmax(0,920px)] lg:justify-between">
            <div>
              <p className="font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-[#f55733]">
                {steps[0].num}
              </p>
              <p className="mt-5 font-display text-[20px] font-medium leading-[26px] tracking-[0.8px]">
                {steps[0].title}
              </p>
            </div>
            <div className="grid gap-[10px] md:grid-cols-2">
              <Field label="{Subject}*" name="subject" />
              <Field label="{Phone Number}" name="phone" placeholder="+1 XXX XXX XXX" />
            </div>
          </div>

          {/* Row 2 — {02} + Name / Email */}
          <div className="grid items-start gap-10 lg:grid-cols-[300px_minmax(0,920px)] lg:justify-between">
            <div>
              <p className="font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-[#f55733]">
                {steps[1].num}
              </p>
              <p className="mt-5 font-display text-[20px] leading-[26px] tracking-[0.8px]">{steps[1].title}</p>
            </div>
            <div className="grid gap-[10px] md:grid-cols-2">
              <Field label="{Name}*" name="name" />
              <Field label="{Email}*" name="email" type="email" />
            </div>
          </div>

          {/* Row 3 — {03} + Budget / Message */}
          <div className="grid items-start gap-10 lg:grid-cols-[300px_minmax(0,920px)] lg:justify-between">
            <div>
              <p className="font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-[#f55733]">
                {steps[2].num}
              </p>
              <p className="mt-5 max-w-[300px] font-display text-[20px] leading-[26px] tracking-[0.8px]">
                {steps[2].title}
              </p>
            </div>
            <div className="space-y-[10px]">
              <div>
                <p className="font-display text-[16px] font-medium leading-[19.2px] text-[#fafafa]">{"{Budgets}*"}</p>
                <div className="mt-3 flex flex-wrap gap-[10px]">
                  {budgets.map((option) => (
                    <label
                      key={option}
                      className={`flex min-h-[62px] cursor-pointer items-center gap-4 border px-4 py-4 transition-colors ${
                        budget === option ? "border-[#555] bg-[#111]" : "border-[#333] hover:border-[#444]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option}
                        checked={budget === option}
                        onChange={() => setBudget(option)}
                        className="sr-only"
                      />
                      <span
                        className={`h-5 w-5 shrink-0 border ${
                          budget === option ? "border-snow bg-snow" : "border-[#555] bg-transparent"
                        }`}
                      />
                      <span className="font-sans text-[20px] font-semibold leading-6">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="font-display text-[16px] font-medium leading-[19.2px] text-[#fafafa]">
                  {"{Message}*"}
                </span>
                <div className="relative mt-3 border border-[#333]">
                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="Describe Your Projects and Needs"
                    className="min-h-[180px] w-full resize-y bg-transparent p-4 pb-16 text-snow placeholder:text-[#666] outline-none"
                  />
                  <button
                    type="submit"
                    aria-label={sent ? "Message sent" : "Submit message"}
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-[#555] text-[24px] leading-none text-snow transition-colors hover:border-snow"
                  >
                    {sent ? "✓" : "+"}
                  </button>
                </div>
              </label>
            </div>
          </div>
        </form>
      </section>

      <LogoMarquee />

      {/* FAQs */}
      <section className="px-5 py-36 md:px-5">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <div className="pt-2">
            <p className="font-display text-[24px] font-medium leading-[31.2px] tracking-[0.8px] text-[#f55733]">
              {"{FAQs}"}
            </p>
            <p className="mt-5 font-display text-[20px] leading-[26px] tracking-[0.8px]">
              Everything you are wondering
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={faq.q} className="border-t border-[#333] last:border-b">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between py-8 text-left"
                >
                  <span className="font-display text-[24px] font-medium leading-[31.2px] text-[#d5d7de]">{faq.q}</span>
                  <span className="ml-4 shrink-0 font-display text-[24px] text-[#d5d7de]">{open === i ? "–" : "+"}</span>
                </button>
                {open === i && (
                  <p className="max-w-2xl pb-8 font-sans text-[16px] leading-[22px] text-[#9ea1a3]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block min-h-[109px]">
      <span className="font-display text-[16px] font-medium leading-[19.2px] text-[#fafafa]">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={label.includes("*")}
        className="mt-3 min-h-[77px] w-full rounded-[4px] border border-[#333] bg-transparent px-4 py-4 text-snow placeholder:text-[#666] outline-none focus:border-[#555]"
      />
    </label>
  );
}
