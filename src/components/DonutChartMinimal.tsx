export default function DonutChartMinimal({ value, color = '#60A5FA', size = 140 }: { value: number; color?: string; size?: number }) {
  const pct = Math.max(0, Math.min(100, value));
  const r = size / 2 - 10;
  const c = Math.PI * 2 * r;
  const off = c * (1 - pct / 100);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-36 w-36">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1F2937" strokeWidth={10} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={10} fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#E5E7EB" fontSize={16} fontWeight={600}>{pct}%</text>
    </svg>
  );
}


