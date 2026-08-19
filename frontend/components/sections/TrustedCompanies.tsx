export default function TrustedCompanies() {
  const technologies = [
  { name: "React.js", className: "text-[12px] md:text-[20px] font-medium  tracking-tight" },
  { name: "Next.js", className: "text-[12px] md:text-[20px] font-semibold" },
  { name: "Node.js", className: "text-[12px] md:text-[20px] font-semibold " },
  { name: "MongoDB", className: "text-[12px] md:text-[20px] font-semibold " },
  { name: "WordPress", className: "text-[12px] md:text-[20px] font-medium " },
  { name: "Shopify", className: "text-[12px] md:text-[20px] font-semibold" },
];

  return (
    <section className="relative block h-10 border-y border-[#323232] bg-[#242424] md:h-[100px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center overflow-hidden px-5 sm:px-8 lg:px-10 xl:px-10">
      

        <div className="w-full overflow-hidden py-0 md:py-[20px]">
          <div className="animate-marquee flex w-max items-center gap-8 md:gap-24">
            {[...technologies, ...technologies].map((technology, index) => (
              <span
                key={index}
                className={`${technology.className} whitespace-nowrap text-white`}
              >
                {technology.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}