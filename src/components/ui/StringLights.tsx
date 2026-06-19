// Decoratieve lampjesslingers (festoonverlichting) zoals op de Facebook-cover.
// Twee strengen: één bovenaan en één die achter de titel doorloopt.
// De draad is een vloeiende Catmull-Rom-curve i.p.v. een hoekige polyline.

const WIDTH = 1200;
const HEIGHT = 800;

interface Strand {
  count: number;
  base: number;
  amp: number;
  phase: number;
}

interface Point {
  x: number;
  y: number;
}

function buildPoints({ count, base, amp, phase }: Strand): Point[] {
  return Array.from({ length: count + 1 }, (_, i) => ({
    x: (i * WIDTH) / count,
    y: base + amp * Math.sin((i / count) * Math.PI * 2 + phase),
  }));
}

// Vloeiende curve door de punten (Catmull-Rom omgezet naar cubic bezier).
function smoothPath(pts: Point[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

const strands: Strand[] = [
  { count: 8, base: 90, amp: 45, phase: 0 },
  { count: 9, base: 380, amp: 70, phase: Math.PI },
];

export default function StringLights({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="bulb" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="55%" stopColor="#fff2c4" />
          <stop offset="100%" stopColor="#f4d27e" />
        </radialGradient>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {strands.map((strand, s) => {
        const pts = buildPoints(strand);
        return (
          <g key={s}>
            <path d={smoothPath(pts)} fill="none" stroke="#243018" strokeWidth={3} strokeOpacity={0.85} />
            {pts.map((p, i) => (
              <g key={i}>
                {/* ophangdraadje */}
                <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 16} stroke="#243018" strokeWidth={2.6} />
                {/* fitting */}
                <rect x={p.x - 4} y={p.y + 13} width={8} height={7} rx={1.5} fill="#243018" />
                {/* peertje */}
                <ellipse
                  cx={p.x}
                  cy={p.y + 30}
                  rx={11}
                  ry={13}
                  fill="url(#bulb)"
                  filter="url(#glow)"
                />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
