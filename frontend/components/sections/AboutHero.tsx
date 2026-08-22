import Link from "next/link";
import Image from "next/image";

const stats = [
  {
    value: "3+",
    label: "YEARS OF",
    sub: "EXPERIENCE",
  },
  {
    value: "10+",
    label: "PROJECTS",
    sub: "DELIVERED",
  },
  {
    value: "98%",
    label: "CLIENT",
    sub: "SATISFACTION",
  },
  {
    value: "9+",
    label: "INDUSTRIES",
    sub: "SERVED",
  },
];

export default function AboutHero() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
    <div className="mx-auto max-w-[1440px] px-5 pt-[60px] pb-[50px] sm:px-8 sm:pt-[90px] sm:pb-16 lg:px-10 lg:pt-[110px] lg:pb-20 xl:px-10">

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">

          {/* Left */}

          <div>

            <span className="font-heading text-[0.82rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
              ABOUT US
            </span>

            <h1 className="mt-2 text-[2.15rem] font-medium uppercase leading-[1.08] lg:text-[3.15rem]">
              WE BUILD DIGITAL
              <br />
              SOLUTIONS THAT
              <br />
              <span className="text-[var(--primary)]">
                DRIVE GROWTH
              </span>
            </h1>

            <p className="mt-4 max-w-[38rem] text-[0.85rem] leading-[1.9] text-[var(--text-body)]">
              ONTO DIGITAL is a digital agency passionate about
              turning ideas into impactful digital experiences.
              We help brands grow, scale and lead through
              strategy, design, development and continuous
              support.
            </p>

            <p className="mt-3 max-w-[38rem] text-[0.85rem] leading-[1.9] text-[var(--text-body)]">
              We combine creativity, technology and data to
              create digital products that look exceptional and
              deliver measurable business results.
            </p>

            <Link
              href="/contact"
              className="group mt-9 inline-flex h-[45px] items-center gap-4 rounded-xl border border-[var(--primary)] px-7 font-heading text-[0.85rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[var(--primary)] hover:text-black"
            >
              <span className="text-[var(--primary)] text-[1rem] transition-all group-hover:text-black">
                ↗
              </span>

              LET&apos;S BUILD TOGETHER
            </Link>

          </div>

          {/* Right */}

          <div>

            {/* Image */}

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-[var(--border-card)] bg-[var(--card)]">

              <Image
                src="/images/abouthero/abthero.png"
                alt="About ONTO DIGITAL"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

            </div>

            {/* Stats */}

            <div className="-mt-6 rounded-[20px] border border-[var(--border-card)] bg-[var(--card)] backdrop-blur-sm lg:mx-8">

              <div className="grid grid-cols-4 divide-x divide-[#202020]">

                {stats.map((item) => (

                  <div
                    key={item.value}
                    className="flex flex-col items-center px-1 py-4 text-center sm:px-4 sm:py-7"
                  >

                    <h3 className="text-[0.8rem] font-medium text-[var(--primary)] sm:text-[1rem] lg:text-[1.8rem]">
                      {item.value}
                    </h3>

                    <p className="mt-1.5 text-[0.5rem] uppercase leading-[1.3] tracking-[0.03em] text-[var(--text-body)] sm:mt-3 sm:text-[0.62rem] sm:tracking-[0.12em]">
                      {item.label}
                      <br />
                      {item.sub}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}