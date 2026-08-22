import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

export type ProcessStep = {
    number: string;
    title: string;
    description: string;
};

export type ProcessProps = {
    badge: string;
    heading: ReactNode;
    description: string;
    steps: ProcessStep[];
};

export default function Process({ badge, heading, description, steps }: ProcessProps) {
    return (
        <section id="process" className="border-t border-[var(--border)] bg-[var(--background)]">
           <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:flex-row lg:gap-12 lg:px-10 lg:py-14 xl:px-10">

                {/* Left */}
                <Reveal className="flex w-full max-w-[22rem] flex-col justify-center lg:sticky lg:top-32 lg:self-start">

                    <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
                        {badge}
                    </span>

                    <h2 className="mt-2 text-[2rem] sm:text-[2.75rem] lg:text-[2.75rem] font-medium uppercase leading-[1.08]">
                        {heading}
                    </h2>

                    <p className="mt-5 max-w-[20rem] text-[1rem] leading-[1.65] text-[var(--text-body)] sm:mt-6 sm:text-[0.95rem] lg:text-[1rem] lg:leading-[1.7]">
                        {description}
                    </p>

                </Reveal>

                {/* Right */}
                <div className="flex-1">

                    {/* Desktop */}
                    <div className="relative hidden justify-between gap-8 lg:flex">

                        {steps.map((item, index) => (
                            <div
                                key={item.number}
                                className="relative flex-1 min-w-0"
                            >
                                <div className="font-heading text-[2.15rem] font-medium leading-none text-white">
                                    {item.number}
                                </div>

                                <div className="relative mt-7 mb-9 flex items-center">

                                    {index !== steps.length - 1 && (
                                        <div
                                            className="absolute left-3 top-1/2 h-[2px] w-[calc(100%+2rem)] -translate-y-1/2"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg,#090909 0%,#18351d 45%,var(--primary) 100%)",
                                            }}
                                        />
                                    )}

                                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--background)]">
                                        <div
                                            className={`rounded-full bg-white ${index === steps.length - 1
                                                ? "h-3 w-3 animate-pulse"
                                                : "h-2.5 w-2.5"
                                                }`}
                                        />
                                    </div>

                                </div>

                                <h3 className="text-[1.1rem] font-medium uppercase leading-tight">
                                    {item.title}
                                </h3>

                                <p className="mt-5 text-[0.9rem] leading-[1.8] text-[var(--text-body)]">
                                    {item.description}
                                </p>

                            </div>
                        ))}

                    </div>

                    {/* Mobile */}
                    <div className="relative flex flex-col gap-14 lg:hidden">

                        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#0a0a0a] via-[#1d5d2f] to-[var(--primary)]" />

                        {steps.map((item, index) => {
                            const contentRight = index % 2 === 0;
                            const isLast = index === steps.length - 1;

                            return (
                                <div
                                    key={item.number}
                                    className="relative flex items-start justify-between"
                                >
                                    {/* Left */}
                                    <div className="flex w-[42%] justify-end pr-4">
                                        <div className="max-w-[130px] text-right">
                                            {!contentRight ? (
                                                <>
                                                    <h3 className="text-[0.9rem] uppercase">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-2 text-[0.78rem] leading-6 text-[var(--text-body)]">
                                                        {item.description}
                                                    </p>
                                                </>
                                            ) : (
                                                <span className="font-heading text-xl text-white">
                                                    {item.number}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Center */}
                                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--background)]">

                                        <div
                                            className={`rounded-full bg-white ${isLast
                                                ? "h-3 w-3 animate-pulse"
                                                : "h-2.5 w-2.5"
                                                }`}
                                        />

                                    </div>

                                    {/* Right */}
                                    <div className="flex w-[42%] justify-start pl-4">
                                        <div className="max-w-[130px]">
                                            {contentRight ? (
                                                <>
                                                    <h3 className="text-[0.9rem] uppercase">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-2 text-[0.78rem] leading-6 text-[var(--text-body)]">
                                                        {item.description}
                                                    </p>
                                                </>
                                            ) : (
                                                <span className="font-heading text-xl text-white">
                                                    {item.number}
                                                </span>
                                            )}
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
