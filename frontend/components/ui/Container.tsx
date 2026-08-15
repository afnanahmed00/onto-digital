import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1320px] px-5 md:px-10 xl:px-[60px]",
        className
      )}
    >
      {children}
    </div>
  );
}