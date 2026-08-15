import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--background)]">
      {/* Background watermark image (mobile/tablet only) */}
      <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
        <HeroImage variant="watermark" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-[1440px] flex-col justify-center pt-28 pb-12 px-5 sm:min-h-[80vh] sm:px-8 sm:pt-28 sm:pb-16 md:px-10 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between lg:pt-24 lg:pb-12 xl:px-16">
        <div className="w-full lg:w-1/2">
          <HeroContent />
        </div>

        {/* Original foreground image (desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 lg:justify-end">
          <HeroImage variant="desktop" />
        </div>
      </div>
    </section>
  );
}
