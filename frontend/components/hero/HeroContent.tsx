import HeroActions from "./HeroActions";

export default function HeroContent() {
  return (
    <div className="flex max-w-[640px] flex-col justify-center">
      {/* Sub Heading */}
      <span className="
        text-[11px]
        lg:text-[12px]
        xl:text-[14px]
        font-medium
        uppercase
        tracking-[0.18em]
        text-[var(--primary)]
      ">
        Digital Solutions That Scale
      </span>

      {/* Heading */}
      <h1
        className="
          mt-3
          text-[32px]
          md:text-[40px]
          lg:text-[48px]
          xl:text-[64px]
          font-semibold
          uppercase
          leading-[1.08]
          tracking-[-0.02em]
          text-white
        "
      >
        Building Digital
        <br />
        Experiences That
        <br />
        <span className="text-[var(--primary)]">
          Drive Real Growth
        </span>
      </h1>

      {/* Paragraph */}
      <p
        className="
          mt-6
          max-w-[560px]
          text-[14px]
          md:text-[14px]
          lg:text-[18px]
          xl:text-[20px]
          leading-[1.7]
          text-[var(--text-secondary)]
        "
      >
        We craft high-performance websites, powerful web applications and
        scalable digital solutions for ambitious brands.
      </p>

      <HeroActions />

    </div>
  );
}