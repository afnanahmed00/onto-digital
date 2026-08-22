import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/services/services";

export default async function ServiceCollection() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  let hasError = false;

  try {
    services = await getServices();
  } catch {
    hasError = true;
  }

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-10">

        <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
          WHAT WE DO
        </span>

        <h2 className="mt-2 max-w-[38rem] text-[2rem] font-medium uppercase leading-[1.08] sm:text-[2.5rem]">
          SERVICES BUILT TO
          <br />
          ELEVATE YOUR BUSINESS
        </h2>

        {hasError ? (
          <StatusMessage
            title="Unable to load services."
            description="Please refresh the page or try again shortly."
          />
        ) : services.length === 0 ? (
          <StatusMessage title="No services yet" description="New services are coming soon." />
        ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.slug}
                className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-[var(--border-card)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:p-7 lg:p-8"
              >
                {/* Top shine */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary)] bg-[var(--background-secondary)] text-[var(--primary)]">
                  <Icon size={20} />
                </div>

                <h3 className="relative mt-5 text-[1rem] font-medium uppercase leading-[1.2] text-white sm:text-[1.1rem]">
                  {service.breadcrumbLabel.toUpperCase()}
                </h3>

                <p className="relative mt-3 flex-1 text-[0.82rem] leading-[1.7] text-[var(--text-body)]">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="group/link relative mt-6 flex items-center gap-2 self-start font-heading text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--primary)]"
                >
                  LEARN MORE
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
}

function StatusMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-[20px] border border-[var(--border-card)] bg-[var(--card)] px-6 py-20 text-center sm:mt-12">
      <p className="font-heading text-[1rem] font-medium uppercase tracking-[0.08em] text-white">
        {title}
      </p>
      <p className="text-[0.85rem] text-[var(--text-body)]">{description}</p>
    </div>
  );
}
