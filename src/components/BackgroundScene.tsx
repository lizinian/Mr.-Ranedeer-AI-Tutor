interface Props {
  background: string
}

const BG_CONFIG: Record<string, { from: string; to: string; elements: React.ReactNode }> = {
  meadow: {
    from: '#87CEEB',
    to: '#90EE90',
    elements: (
      <>
        <circle cx="60" cy="80" r="35" fill="white" opacity="0.7" />
        <circle cx="100" cy="65" r="45" fill="white" opacity="0.6" />
        <circle cx="80" cy="85" r="30" fill="white" opacity="0.7" />
        <circle cx="280" cy="90" r="40" fill="white" opacity="0.65" />
        <circle cx="320" cy="75" r="30" fill="white" opacity="0.6" />
        <ellipse cx="50" cy="280" rx="25" ry="8" fill="#4CAF50" />
        <ellipse cx="90" cy="285" rx="20" ry="7" fill="#66BB6A" />
        <ellipse cx="300" cy="282" rx="28" ry="9" fill="#4CAF50" />
        <text x="120" y="295" fontSize="18">🌸</text>
        <text x="220" y="290" fontSize="14">🌼</text>
        <text x="30" y="300" fontSize="16">🌺</text>
      </>
    ),
  },
  sunset: {
    from: '#FF6B6B',
    to: '#FFE66D',
    elements: (
      <>
        <circle cx="320" cy="100" r="55" fill="#FFD700" opacity="0.8" />
        <circle cx="310" cy="95" r="50" fill="#FFA500" opacity="0.4" />
        <path d="M0 220 Q100 200 200 215 Q300 230 400 218 L400 320 L0 320Z" fill="#C2185B" opacity="0.5" />
        <path d="M0 240 Q120 225 240 235 Q350 245 400 238 L400 320 L0 320Z" fill="#880E4F" opacity="0.4" />
      </>
    ),
  },
  night: {
    from: '#0F0C29',
    to: '#302B63',
    elements: (
      <>
        {Array.from({ length: 20 }, (_, i) => (
          <circle
            key={i}
            cx={20 + (i * 19) % 380}
            cy={20 + (i * 13) % 120}
            r={0.8 + (i % 3) * 0.6}
            fill="white"
            opacity={0.6 + (i % 4) * 0.1}
          />
        ))}
        <path d="M310 50 Q330 30 320 55 Q340 50 325 65 Q315 55 310 50Z" fill="#FFFDE7" opacity="0.9" />
        <circle cx="318" cy="55" r="12" fill="#FFF8E1" opacity="0.7" />
        <text x="30" y="60" fontSize="20">🌟</text>
        <text x="180" y="40" fontSize="14">✨</text>
      </>
    ),
  },
  underwater: {
    from: '#00C6FF',
    to: '#0072FF',
    elements: (
      <>
        <ellipse cx="80" cy="40" rx="50" ry="20" fill="rgba(255,255,255,0.2)" />
        <ellipse cx="280" cy="60" rx="60" ry="22" fill="rgba(255,255,255,0.15)" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            cx={30 + (i * 32)}
            cy={150 + ((i * 23) % 100)}
            r={2 + (i % 4)}
            fill="rgba(255,255,255,0.4)"
          />
        ))}
        <text x="20" y="285" fontSize="20">🌊</text>
        <text x="300" y="290" fontSize="20">🐠</text>
        <text x="170" y="300" fontSize="16">🐟</text>
        <path d="M0 280 Q100 260 200 275 Q300 290 400 275 L400 320 L0 320Z" fill="rgba(0,50,100,0.4)" />
      </>
    ),
  },
  candy_land: {
    from: '#FFB3DE',
    to: '#FFE4B5',
    elements: (
      <>
        <text x="10" y="80" fontSize="28">🍭</text>
        <text x="330" y="90" fontSize="24">🍬</text>
        <text x="160" y="50" fontSize="20">🍰</text>
        <text x="70" y="290" fontSize="22">🍩</text>
        <text x="290" y="295" fontSize="20">🧁</text>
        <text x="200" y="290" fontSize="18">🍫</text>
        <circle cx="60" cy="100" r="30" fill="rgba(255,182,193,0.4)" />
        <circle cx="330" cy="120" r="25" fill="rgba(255,218,185,0.4)" />
      </>
    ),
  },
  magic_forest: {
    from: '#1B5E20',
    to: '#4CAF50',
    elements: (
      <>
        <rect x="20" y="180" width="30" height="100" fill="#4E342E" rx="5" />
        <ellipse cx="35" cy="185" rx="40" ry="50" fill="#2E7D32" />
        <ellipse cx="35" cy="175" rx="30" ry="40" fill="#388E3C" />
        <rect x="340" y="190" width="28" height="95" fill="#4E342E" rx="5" />
        <ellipse cx="354" cy="190" rx="38" ry="48" fill="#2E7D32" />
        <text x="160" y="75" fontSize="20">🌟</text>
        <text x="80" y="120" fontSize="14">✨</text>
        <text x="270" y="110" fontSize="14">✦</text>
        <text x="180" y="290" fontSize="20">🍄</text>
        <text x="100" y="300" fontSize="16">🌿</text>
      </>
    ),
  },
}

export default function BackgroundScene({ background }: Props) {
  const cfg = BG_CONFIG[background] ?? BG_CONFIG.meadow

  return (
    <svg viewBox="0 0 400 320" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="bg_grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={cfg.from} />
          <stop offset="100%" stopColor={cfg.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="url(#bg_grad)" />
      {cfg.elements}
    </svg>
  )
}
