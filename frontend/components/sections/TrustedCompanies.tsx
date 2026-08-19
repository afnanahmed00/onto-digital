export default function TrustedCompanies() {
  const companies = [
  { name: "zapier", className: "text-[13px] md:text-[22px] font-medium lowercase tracking-tight" },
  { name: "Spotify", className: "text-[12px] md:text-[20px] font-semibold" },
  { name: "zoom", className: "text-[12px] md:text-[21px] font-semibold lowercase" },
  { name: "slack", className: "text-[12px] md:text-[21px] font-semibold lowercase" },
  { name: "amazon", className: "text-[13px] md:text-[22px] font-medium lowercase" },
  { name: "Adobe", className: "text-[13px] md:text-[22px] font-semibold" },
];

  return (
    <section className="relative block h-10 border-y border-[#323232] bg-[#242424] md:h-[100px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center overflow-hidden px-5 sm:px-8 lg:px-10 xl:px-10">
       <h2 className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3A3A3A] bg-[#242424] px-6 py-2 text-[14px] font-medium text-white md:block">
  Trusted By 250+ Companies
</h2>

        <div className="w-full overflow-hidden py-0 md:py-[20px]">
          <div className="animate-marquee flex w-max items-center gap-8 md:gap-24">
            {[...companies, ...companies].map((company, index) => (
              <span
                key={index}
                className={`${company.className} whitespace-nowrap text-white`}
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}