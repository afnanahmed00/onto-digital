"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  badge: string;
  heading: React.ReactNode;
  description: string;
  faqs: FAQItem[];
};

export default function FAQ({
  badge,
  heading,
  description,
  faqs,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-5 py-[50px] sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-10">

        <div className="grid gap-10 lg:grid-cols-[38%_60%]">

          {/* Left */}

          <div className="lg:sticky lg:top-28 lg:self-start">

            <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
              {badge}
            </span>

            <h2 className="mt-2 text-[2.2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
              {heading}
            </h2>

            <p className="mt-5 max-w-md text-[0.95rem] leading-[1.9] text-[var(--text-body)]">
              {description}
            </p>

          </div>

          {/* Right */}

          <div className="space-y-4">

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[20px] border border-[var(--border-card)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--primary)]"
                >

                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : index)
                    }
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >

                    <h3 className="text-[0.95rem] font-medium uppercase leading-[1.5] text-white lg:text-[1rem]">
                      {faq.question}
                    </h3>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-card)] text-[var(--primary)]">

                      {isOpen ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}

                    </div>

                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >

                    <div className="overflow-hidden">

                      <p className="px-6 pb-6 text-[0.9rem] leading-[1.9] text-[var(--text-body)]">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}