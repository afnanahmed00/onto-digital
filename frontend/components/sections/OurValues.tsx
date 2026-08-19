import {
  Lightbulb,
  Target,
  Handshake,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";

const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description:
      "We embrace creativity and technology to build future-ready solutions.",
  },
  {
    icon: Target,
    title: "FOCUS",
    description:
      "We stay focused on what matters—delivering impactful results for your business.",
  },
  {
    icon: Handshake,
    title: "COLLABORATION",
    description:
      "We work closely with our clients as partners, not just service providers.",
  },
  {
    icon: ShieldCheck,
    title: "QUALITY",
    description:
      "We follow best practices to ensure every project meets the highest standards.",
  },
  {
    icon: User,
    title: "TRANSPARENCY",
    description:
      "We believe in clear communication, honesty and complete transparency.",
  },
];

export default function OurValues() {
  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-[50px] sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-10">

        <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
          OUR VALUES
        </span>

        <h2 className="mt-2 max-w-2xl font-[var(--font-heading)] text-[2.2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
          THE PRINCIPLES THAT
          <br />
          DRIVE EVERYTHING WE DO
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">

          {values.map(({ icon: Icon, title, description }) => (

            <div
              key={title}
              className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#262626] bg-[#050505] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#51FF73] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:rounded-[20px] sm:p-5 lg:p-6"
            >

              {/* Top shine */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#51FF73] text-[#51FF73] sm:h-12 sm:w-12">
                <Icon size={18} strokeWidth={1.75} className="sm:hidden" />
                <Icon size={22} strokeWidth={1.75} className="hidden sm:block" />
              </div>

              <h3 className="relative mt-4 font-[var(--font-heading)] text-[0.8rem] font-medium uppercase leading-tight text-white sm:mt-5 sm:text-[1rem]">
                {title}
              </h3>

              <p className="relative mt-2 text-[0.72rem] leading-[1.6] text-[#A7A7A7] sm:mt-3 sm:text-[0.8rem] sm:leading-[1.8]">
                {description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
