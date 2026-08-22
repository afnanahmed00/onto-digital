export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Minimal depth glow — matches the CTA section's radial motif, kept subtle */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#51FF73]/10 blur-[110px] sm:h-[420px] sm:w-[820px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-28 pb-10 text-center sm:px-8 sm:pt-28 sm:pb-12 lg:px-10 lg:pt-40 lg:pb-14 xl:px-10">
        <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
          OUR WORK
        </span>

        <h1 className="mt-3 text-[2.4rem] font-medium uppercase leading-[1.05] sm:text-[3.2rem] lg:text-[4rem]">
          PROJECTS
        </h1>

        <p className="mt-5 max-w-[38rem] text-[0.85rem] leading-[1.9] text-[#A7A7A7] sm:text-[0.95rem]">
          A selection of our recent work across web development, design,
          e-commerce and digital experiences.
        </p>
      </div>
    </section>
  );
}
