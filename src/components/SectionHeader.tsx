interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black text-flame">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-bone sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-300">{description}</p>
      ) : null}
    </div>
  );
}
