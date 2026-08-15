interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-xl">
      <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
        {label}
      </span>

      <h2 className="mb-5 font-[var(--font-heading)] text-4xl font-semibold text-white">
        {title}
      </h2>

      {description && (
        <p className="text-[var(--text-secondary)] leading-8">
          {description}
        </p>
      )}
    </div>
  );
}