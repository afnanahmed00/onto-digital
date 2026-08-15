import Image from "next/image";

type HeroImageProps = {
  variant?: "watermark" | "desktop";
};

export default function HeroImage({ variant = "desktop" }: HeroImageProps) {
  if (variant === "watermark") {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/earth.png"
          alt=""
          width={1000}
          height={1000}
          priority
          className="
            h-auto
            w-[480px]
            sm:w-[600px]
            md:w-[720px]
            object-contain
            scale-[1.2]
            opacity-[0.16]
            blur-[0.5px]
          "
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-end w-full">
      <Image
        src="/images/hero/earth.png"
        alt="Earth"
        width={860}
        height={860}
        priority
        className="
          w-[820px]
          xl:w-[920px]
          2xl:w-[1000px]
          object-contain
          translate-x-8
          opacity-50
        "
      />
    </div>
  );
}
