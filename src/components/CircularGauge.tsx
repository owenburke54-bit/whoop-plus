export default function CircularGauge({
  percent,
  label,
  valueText,
  color = '#10B981',
  size = 120,
  labelColor = 'text-gray-300'
}: {
  percent: number;
  label: string;
  valueText: string;
  color?: string;
  size?: number;
  labelColor?: string;
}) {
  const pct = Math.max(0, Math.min(100, percent));
  const r = size / 2 - 10;
  const c = Math.PI * 2 * r;
  const off = c * (1 - pct / 100);
  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-28 w-28">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1F2937" strokeWidth={10} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={10}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" fill="#E5E7EB" fontSize={16} fontWeight={700}>
          {valueText}
        </text>
        <text x="50%" y="66%" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF" fontSize={10}>
          {pct}%
        </text>
      </svg>
      <div className={`mt-2 text-xs font-medium ${labelColor}`}>{label}</div>
    </div>
  );
}


