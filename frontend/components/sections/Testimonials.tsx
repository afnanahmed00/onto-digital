"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    image: "/images/testimonials/image.png",
    name: "MD Masood",
    role: "Founder",
    company: "Hyd Appliance Service",
    review:
      "Good work, team Onto Digital. You designed a responsive website for our appliance repair business and also provided an admin panel to easily manage and maintain the site. Really appreciate the support and work done by the team.",
  },
  {
    image: "/images/testimonials/image.png",
    name: "Talha Abdullah",
    role: "CEO",
    company: "Taswa",
    review:
     "Good work by Onto Digital. They understood our requirements and created a clean, professional website for our construction business.",
  },


  {
    image: "/images/testimonials/image.png",
    name: "Insta-R Team",
    role: "Management",
    company: "Insta-R",
    review:
      "Onto Digital has been very helpful in maintaining and updating our WordPress website. They respond quickly when we need changes and make sure everything is working properly. Good support and reliable service.",
  },

  {
    image: "/images/testimonials/image.png",
    name: "Abdul Samad",
    role: "Founder",
    company: "Built4You",
    review:
     "Great work by the Onto Digital team. The website looks professional, responsive and clearly represents our construction business.",
  },  

  {
    image: "/images/testimonials/image.png",
    name: "Imran",
    role: "CEO & Engineer",
    company: "Mi Town Builders",
    review:
      "Working with Onto Digital was a good experience. They understood our construction business and helped us present our projects and services properly online. The communication was easy and they were open to our changes.",
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
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:py-14 xl:px-10">

        {/* Left Content */}
        <Reveal className="flex w-full max-w-[20rem] shrink-0 flex-col justify-center   text-left">
          <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
            TESTIMONIALS
          </span>

          <h2 className="mt-2 text-[2.2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
            WHAT OUR <span className="text-[var(--primary)]">CLIENTS</span> SAY
          </h2>

          <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.8] text-[var(--text-body)] lg:text-[1rem]">
            We build lasting partnerships through results, communication and
            trust.
          </p>

          <button className="group mt-5 flex items-center gap-4 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[var(--primary)] active:opacity-80">
            VIEW ALL TESTIMONIALS
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1">
              ↗
            </span>
          </button>
        </Reveal>

        {/* Slider */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 hidden justify-end gap-3 lg:flex">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-card)] text-[var(--text-body)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[0.93] active:border-[var(--primary)] active:text-[var(--primary)]"
            >
              ←
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-black active:scale-[0.93] active:bg-[var(--primary)] active:text-black"
            >
              →
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex [--slide-width:100%] sm:[--slide-width:50%] ${animate ? "transition-transform duration-500 ease-out" : ""
                }`}
              style={{
                transform: `translateX(calc(-${index} * var(--slide-width)))`,
              }}
            >
              {slides.map((item, i) => (
                <div key={`${item.name}-${i}`} className="w-full shrink-0 px-2 sm:w-1/2">
                  <article className="group flex h-full flex-col rounded-[20px] border border-[var(--border-card)] bg-[var(--card)] p-6 transition-colors duration-300 hover:border-[var(--primary)] lg:p-7">
                    <span className="font-heading text-[2.5rem] font-bold leading-none text-[var(--primary)]">
                      ❝
                    </span>

                    <p className="mt-4 flex-1 text-[0.95rem] leading-[1.8] text-[var(--text-body)]">
                      {item.review}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-[0.95rem] font-medium text-white">
                          {item.name}
                        </h3>
                        <p className="text-[0.8rem] text-[var(--text-body)]">
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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-card)] text-[var(--text-body)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[0.93] active:border-[var(--primary)] active:text-[var(--primary)]"
            >
              ←
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-black active:scale-[0.93] active:bg-[var(--primary)] active:text-black"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
