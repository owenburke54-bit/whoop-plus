import Link from 'next/link';

export default function OverviewCard({
  title,
  href,
  children,
  action
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const Wrapper = ({ children: inner }: { children: React.ReactNode }) =>
    href ? (
      <Link href={href} className="block">
        {inner}
      </Link>
    ) : (
      <>{inner}</>
    );

  return (
    <Wrapper>
      <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-sm font-medium text-gray-200">{title}</h2>
          {action}
        </div>
        <div className="mt-3 text-sm text-gray-300">{children}</div>
      </section>
    </Wrapper>
  );
}


