type Point = { x: number; y: number; label?: string };

export default function ScatterChartMinimal({
  data,
  secondaryData,
  height = 220,
  padding = 24
}: {
  data: Point[];
  secondaryData?: Point[];
  height?: number;
  padding?: number;
}) {
  const width = 480; // rendered width; container can control overall sizing

  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border border-gray-800 bg-gray-900 p-6 text-center text-sm text-gray-400">
        No data
      </div>
    );
  }

  const xs = data.map(p => p.x);
  const ys = data.map(p => p.y);
  const allXS = secondaryData && secondaryData.length ? xs.concat(secondaryData.map(p => p.x)) : xs;
  const allYS = secondaryData && secondaryData.length ? ys.concat(secondaryData.map(p => p.y)) : ys;
  const minX = Math.min(...allXS);
  const maxX = Math.max(...allXS);
  const minY = Math.min(...allYS);
  const maxY = Math.max(...allYS);
  const xSpan = maxX - minX || 1;
  const ySpan = maxY - minY || 1;

  const innerW = width - 2 * padding;
  const innerH = height - 2 * padding;

  const xTo = (x: number) => padding + ((x - minX) / xSpan) * innerW;
  const yTo = (y: number) => padding + innerH - ((y - minY) / ySpan) * innerH;

  const ticks = 4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
      {/* axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#374151" strokeWidth={1} />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth={1} />
      {/* axis labels */}
      <text x={(width - padding) - 4} y={(height - padding) + 16} fontSize={10} textAnchor="end" fill="#9CA3AF">X</text>
      <text x={padding - 10} y={padding - 6} fontSize={10} textAnchor="start" fill="#9CA3AF">Y</text>

      {/* x ticks */}
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const t = i / ticks;
        const x = padding + t * innerW;
        const val = minX + t * xSpan;
        return (
          <g key={`xt-${i}`}>
            <line x1={x} y1={height - padding} x2={x} y2={height - padding + 4} stroke="#4B5563" />
            <text x={x} y={height - padding + 16} fontSize={10} textAnchor="middle" fill="#9CA3AF">
              {Number.isFinite(val) ? val.toFixed(0) : ''}
            </text>
          </g>
        );
      })}

      {/* y ticks */}
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const t = i / ticks;
        const y = padding + (1 - t) * innerH;
        const val = minY + t * ySpan;
        return (
          <g key={`yt-${i}`}>
            <line x1={padding - 4} y1={y} x2={padding} y2={y} stroke="#4B5563" />
            <text x={padding - 6} y={y + 3} fontSize={10} textAnchor="end" fill="#9CA3AF">
              {Number.isFinite(val) ? val.toFixed(0) : ''}
            </text>
          </g>
        );
      })}

      {/* primary points */}
      {data.map((p, idx) => (
        <g key={`p-${idx}`}>
          <circle cx={xTo(p.x)} cy={yTo(p.y)} r={3} fill="#60A5FA">
            <title>{`x ${p.x}, y ${p.y}${p.label ? `\n${p.label}` : ''}`}</title>
          </circle>
        </g>
      ))}

      {/* secondary/overlay points (team) */}
      {secondaryData?.map((p, idx) => (
        <g key={`s-${idx}`}>
          <circle cx={xTo(p.x)} cy={yTo(p.y)} r={3} fill="#F472B6">
            <title>{`x ${p.x}, y ${p.y}${p.label ? `\n${p.label}` : ''}`}</title>
          </circle>
        </g>
      ))}
    </svg>
  );
}


