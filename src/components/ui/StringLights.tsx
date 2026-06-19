// Decoratieve lampjesslingers (festoonverlichting) zoals op de Facebook-cover.
// Twee slingers met licht doorhangende draad en gloeiende peertjes.

const WIDTH = 1200;

interface Strand {
  count: number;
  base: number;
  amp: number;
  phase: number;
}

function buildPoints({ count, base, amp, phase }: Strand) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = (i * WIDTH) / count;
    const y = base + amp * Math.sin((i / count) * Math.PI * 2 + phase);
    return { x, y };
  });
}

const strands: Strand[] = [
  { count: 16, base: 34, amp: 22, phase: 0 },
  { count: 18, base: 70, amp: 26, phase: Math.PI },
];

export default function StringLights({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} 150`}
      preserveAspectRatio="xMidYMin slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="bulb" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="55%" stopColor="#fff2c4" />
          <stop offset="100%" stopColor="#f6d98a" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {strands.map((strand, s) => {
        const pts = buildPoints(strand);
        const wire = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
        return (
          <g key={s}>
            <path d={wire} fill="none" stroke="#243018" strokeWidth={2} strokeOpacity={0.85} />
            {pts.map((p, i) => (
              <g key={i}>
                {/* ophangdraadje */}
                <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 9} stroke="#243018" strokeWidth={1.6} />
                {/* fitting */}
                <rect x={p.x - 2.6} y={p.y + 7} width={5.2} height={4} rx={1} fill="#243018" />
                {/* peertje */}
                <ellipse
                  cx={p.x}
                  cy={p.y + 17}
                  rx={6.5}
                  ry={7.5}
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
