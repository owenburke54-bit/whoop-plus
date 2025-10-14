type Point = { x: number; y: number };

export default function DualLineChartMinimal({
  a,
  b,
  colorA = '#60A5FA',
  colorB = '#F472B6',
  height = 160,
  padding = 24
}: {
  a: Point[];
  b: Point[];
  colorA?: string;
  colorB?: string;
  height?: number;
  padding?: number;
}) {
  const width = 480;
  if (!a?.length || !b?.length) {
    return <div className="rounded-md border border-gray-800 bg-gray-900 p-6 text-center text-sm text-gray-400">No data</div>;
  }
  const xs = a.map((_, i) => i);
  const minX = 0;
  const maxX = Math.max(1, xs.length - 1);
  const allY = [...a.map(p => p.y), ...b.map(p => p.y)];
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const innerW = width - 2 * padding;
  const innerH = height - 2 * padding;
  const xTo = (i: number) => padding + (i / maxX) * innerW;
  const yTo = (y: number) => padding + innerH - ((y - minY) / Math.max(1, maxY - minY)) * innerH;
  const dA = a.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTo(i)} ${yTo(p.y)}`).join(' ');
  const dB = b.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTo(i)} ${yTo(p.y)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <path d={dA} fill="none" stroke={colorA} strokeWidth={2} />
      <path d={dB} fill="none" stroke={colorB} strokeWidth={2} />
    </svg>
  );
}


