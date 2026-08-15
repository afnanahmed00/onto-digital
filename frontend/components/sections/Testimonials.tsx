"use client";

import { useState } from "react";

const testimonials = [
  {
    image: "/images/testimonials/pf1.png",
    name: "Dianne Russell",
    role: "CEO",
    company: "Velora",
    review:
      "Onto.digital delivered beyond our expectations. Their attention to detail and technical expertise is second to none.",
  },
  {
    image: "/images/testimonials/pf2.png",
    name: "Jacob Jones",
    role: "CTO",
    company: "Cloudix",
    review:
      "Professional, responsive and results-driven. They truly care about your success.",
  },
  {
    image: "/images/testimonials/pf3.png",
    name: "Courtney Henry",
    role: "Founder",
    company: "Nexlify",
    review:
      "A true creative partner. They turned our vague ideas into a product our users genuinely love.",
  },
  {
    image: "/images/testimonials/pf4.png",
    name: "Wade Warren",
    role: "Head of Product",
    company: "Brightly",
    review:
      "Fast, reliable and thoughtful at every step. Our launch wouldn't have gone as smoothly without them.",
  },
];

const CLONE_COUNT = 2;

export default function Testimonials() {
  const total = testimonials.length;
  const slides = [
    ...testimonials.slice(-CLONE_COUNT),
    ...testimonials,
    ...testimonials.slice(0, CLONE_COUNT),
  ];

  const [index, setIndex] = useState(CLONE_COUNT);
  const [animate, setAnimate] = useState(true);

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (index >= total + CLONE_COUNT) {
      setAnimate(false);
      setIndex(index - total);
    } else if (index < CLONE_COUNT) {
      setAnimate(false);
      setIndex(index + total);
    }
  };

  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:py-14 xl:px-16">

        {/* Left Content */}
        <div className="flex w-full max-w-[20rem] shrink-0 flex-col justify-start text-left">
          <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
            TESTIMONIALS
          </span>

          <h2 className="mt-2 font-[var(--font-heading)] text-[2.2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
            WHAT OUR <span className="text-[#51FF73]">CLIENTS</span> SAY
          </h2>

          <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.8] text-[#A7A7A7] lg:text-[1rem]">
            We build lasting partnerships through results, communication and
            trust.
          </p>

          <button className="group mt-5 flex items-center gap-4 font-[var(--font-heading)] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#51FF73]">
            VIEW ALL TESTIMONIALS
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>

        {/* Slider */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 hidden justify-end gap-3 lg:flex">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#262626] text-[#A7A7A7] transition-colors duration-300 hover:border-[#51FF73] hover:text-[#51FF73]"
            >
              ←
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#51FF73] text-[#51FF73] transition-colors duration-300 hover:bg-[#51FF73] hover:text-black"
            >
              →
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex [--slide-width:100%] sm:[--slide-width:50%] ${
                animate ? "transition-transform duration-500 ease-out" : ""
              }`}
              style={{
                transform: `translateX(calc(-${index} * var(--slide-width)))`,
              }}
            >
              {slides.map((item, i) => (
                <div key={`${item.name}-${i}`} className="w-full shrink-0 px-2 sm:w-1/2">
                  <article className="group flex h-full flex-col rounded-[20px] border border-[#262626] bg-[#050505] p-6 transition-colors duration-300 hover:border-[#51FF73] lg:p-7">
                    <span className="font-[var(--font-heading)] text-[2.5rem] font-bold leading-none text-[#51FF73]">
                      ❝
                    </span>

                    <p className="mt-4 flex-1 text-[0.95rem] leading-[1.8] text-[#D4D4D4]">
                      {item.review}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-[var(--font-heading)] text-[0.95rem] font-medium text-white">
                          {item.name}
                        </h3>
                        <p className="text-[0.8rem] text-[#A7A7A7]">
                          {item.role}, {item.company}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3 lg:hidden">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#262626] text-[#A7A7A7] transition-colors duration-300 hover:border-[#51FF73] hover:text-[#51FF73]"
            >
              ←
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#51FF73] text-[#51FF73] transition-colors duration-300 hover:bg-[#51FF73] hover:text-black"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
