export default function ContactHero() {
  return (
    <section className="bg-black">
      <div className="mx-auto flex h-auto max-w-[1440px] flex-col items-center px-5 pt-20 pb-2 text-center sm:px-8 sm:pt-20 sm:pb-2 lg:px-10 lg:pt-24 lg:pb-2 xl:px-10">

        <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
          GET IN TOUCH
        </span>

        <h1 className="mt-3 max-w-[42rem] text-[1.5rem] font-medium uppercase leading-tight sm:text-[1.85rem] lg:text-[2.2rem]">
          LET&apos;S BUILD SOMETHING
          <br />
          <span className="text-[#51FF73]">EXTRAORDINARY</span> TOGETHER
        </h1>

        <p className="mt-3 max-w-[32rem] text-[0.82rem] leading-[1.8] text-[#A7A7A7] sm:text-[0.88rem]">
          Have a project in mind or just want to say hello?
          <br className="hidden sm:block" />
          We&apos;d love to hear from you.
        </p>

      </div>
    </section>
  );
}