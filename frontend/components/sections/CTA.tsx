import Link from "next/link";

const CENTER = { x: 680, y: 260 };
const RINGS = [40, 85, 135, 190, 250, 315, 385];
const SPOKES = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);

export default function CTA() {
  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-10">
        <div className="relative overflow-hidden rounded-[24px] border border-[#51FF73] bg-[#050505] shadow-[0_0_40px_-20px_rgba(81,255,115,0.22)]">
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="cta-fade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#51FF73" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#51FF73" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#51FF73" stopOpacity="0" />
              </radialGradient>
              <mask id="cta-mask">
                <circle cx={CENTER.x} cy={CENTER.y} r="420" fill="url(#cta-fade)" />
              </mask>
            </defs>

            <g mask="url(#cta-mask)" stroke="#51FF73" strokeWidth="1" fill="none">
              {RINGS.map((r) => (
                <ellipse key={r} cx={CENTER.x} cy={CENTER.y} rx={r} ry={r * 0.55} />
              ))}
              {SPOKES.map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = CENTER.x + Math.cos(rad) * 420;
                const y2 = CENTER.y + Math.sin(rad) * 420 * 0.55;
                return <line key={angle} x1={CENTER.x} y1={CENTER.y} x2={x2} y2={y2} />;
              })}
            </g>
          </svg>

          <div className="relative flex flex-col items-center gap-8 px-4 py-8 text-center sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-12 lg:text-left">
            <div className="lg:w-[58%]">
              <h2 className="text-[1.6rem] font-medium uppercase leading-[1.08] sm:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.5rem]">
                READY TO BUILD SOMETHING
                <br />
                <span className="text-[#51FF73]">EXTRAORDINARY?</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[30rem] text-[0.8rem] leading-[1.8] text-[#A7A7A7] sm:text-[0.8rem] lg:mx-0 lg:text-[0.9rem]">
                Let&apos;s create digital experiences that drive growth,
                engage your audience and set you apart.
              </p>
            </div>

            <div className="flex justify-center lg:w-[42%] lg:justify-end">
              <Link
                href="/contact"
                className="group flex h-[60px] items-center gap-4 rounded-[18px] border border-[#51FF73] bg-black px-8 lg:px-10 font-heading text-[0.8rem] lg:text-[0.85rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(81,255,115,0.3)]"
              >
                <span className="text-[#51FF73] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
                START A PROJECT
                <span className="text-[#51FF73] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
