import Image from "next/image";
import Link from "next/link";

export default function Work() {
  const projects = [
    {
      image: "/images/projects/p1.png",
      title: "Fintech Platform",
      category: "WEB APPLICATION",
      description:
        "Secure platform for seamless fintech management.",
    },
    {
      image: "/images/projects/p2.png",
      title: "E-Commerce Redesign",
      category: "E-COMMERCE",
      description:
        "Modern eCommerce experience that increased conversions.",
    },
    {
      image: "/images/projects/p3.png",
      title: "SaaS Dashboard",
      category: "WEB APPLICATION",
      description:
        "Analytics dashboard with real-time insights and reporting.",
    },
  ];

  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-10 sm:px-8 sm:py-11 lg:gap-12 lg:px-10 lg:py-12 xl:px-10">

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">

          {/* Left Content */}
         <div className="flex w-full max-w-[20rem] flex-col justify-center text-left shrink-0">

            <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
              OUR WORK
            </span>

            <h2 className="mt-2 font-[var(--font-heading)] text-[2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
              DIGITAL PRODUCTS
              <br />
              THAT MAKE AN
              <br />
              IMPACT
            </h2>

            <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.8] text-[#A7A7A7] lg:text-[1rem]">
              Explore a selection of our recent projects that helped brands
              grow, engage and lead.
            </p>

          </div>

          {/* Project Cards */}
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-[20px] border border-[#2a2a2a] bg-[#050505] transition-all duration-500 hover:-translate-y-2 hover:border-[#51FF73]"
              >
                {/* Image */}
                <div className="overflow-hidden p-2 pb-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-6">

                  <h3 className="font-[var(--font-heading)] text-[1.3rem] font-medium  uppercase text-white">
                    {project.title}
                  </h3>

                  <span className="mt-4 text-[0.78rem] uppercase tracking-[0.08em] text-[#A0A0A0]">
                    {project.category}
                  </span>

                  <div className="mt-6 flex justify-end">

                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl  text-[1.8rem] text-[#51FF73] transition-all duration-300 hover:bg-[#51FF73] hover:text-black">
                      ↗
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>

        </div>

        {/* View All CTA — after all projects */}
        <div className="flex justify-center lg:justify-end">

          <Link
            href="/projects"
            className="group flex items-center gap-4 font-[var(--font-heading)] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#51FF73]"
          >
            VIEW ALL CASE STUDIES

            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}