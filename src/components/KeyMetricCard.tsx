import Link from 'next/link';

export default function KeyMetricCard({
  title,
  value,
  subtitle,
  href,
  rightSlot
}: {
  title: string;
  value: string;
  subtitle?: string;
  href: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <Link href={href} className="block rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all duration-200 hover:bg-gray-900 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-400">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
          {subtitle ? <div className="mt-1 text-xs text-gray-400">{subtitle}</div> : null}
        </div>
        {rightSlot}
      </div>
    </Link>
  );
}


