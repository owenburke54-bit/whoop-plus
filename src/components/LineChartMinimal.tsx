type Point = { x: number; y: number };

export default function LineChartMinimal({
  data,
  height = 160,
  padding = 24,
  showPoints = true,
  xLabel,
  yLabel
}: {
  data: Point[];
  height?: number;
  padding?: number;
  showPoints?: boolean;
  xLabel?: string;
  yLabel?: string;
}) {
  const width = 480;
  if (!data || data.length === 0) {
    return <div className="rounded-md border border-gray-800 bg-gray-900 p-6 text-center text-sm text-gray-400">No data</div>;
  }
  const xs = data.map((_, i) => i);
  const ys = data.map(p => p.y);
  const minX = 0;
  const maxX = Math.max(1, xs.length - 1);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const innerW = width - 2 * padding;
  const innerH = height - 2 * padding;
  const xTo = (i: number) => padding + (i / maxX) * innerW;
  const yTo = (y: number) => padding + innerH - ((y - minY) / Math.max(1, maxY - minY)) * innerH;
  const d = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTo(i)} ${yTo(p.y)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      {/* axis labels (minimal) */}
      {xLabel ? (
        <text x={width - padding} y={height - 6} fontSize={10} textAnchor="end" fill="#9CA3AF">{xLabel}</text>
      ) : null}
      {yLabel ? (
        <text x={padding} y={padding - 6} fontSize={10} textAnchor="start" fill="#9CA3AF">{yLabel}</text>
      ) : null}
      <path d={d} fill="none" stroke="#60A5FA" strokeWidth={2} />
      {showPoints && data.map((p, i) => (
        <g key={i}>
          <circle cx={xTo(i)} cy={yTo(p.y)} r={2.5} fill="#60A5FA">
            <title>{`x ${i}, y ${p.y}`}</title>
          </circle>
        </g>
      ))}
    </svg>
  );
}


