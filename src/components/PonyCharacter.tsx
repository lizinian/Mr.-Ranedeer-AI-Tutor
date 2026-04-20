import type { PonyConfig } from '../store/gameStore'

const BODY_COLORS: Record<string, string> = {
  pink: '#FFB3C6',
  lavender: '#D4B8E0',
  sky_blue: '#B3D9F2',
  mint: '#B3E8D0',
  peach: '#FFD4A8',
  golden: '#FFE066',
  coral: '#FF8C94',
  lilac: '#C8A4D4',
  turquoise: '#40E0D0',
}

const MANE_GRADIENTS: Record<string, [string, string]> = {
  purple_pink: ['#FF69B4', '#9B59B6'],
  blue_teal: ['#3498DB', '#1ABC9C'],
  rainbow: ['#FF69B4', '#9B59B6'],
  rose_gold: ['#FFB6C1', '#C0A080'],
  midnight: ['#2C3E7A', '#1A0550'],
  cotton_candy: ['#FFB3DE', '#B3E5FF'],
}

interface Props {
  config: PonyConfig
  size?: number
  animated?: boolean
}

export default function PonyCharacter({ config, size = 320, animated = true }: Props) {
  const body = BODY_COLORS[config.body_color] ?? '#FFB3C6'
  const bodyDark = darken(body, 15)
  const bodyLight = lighten(body, 15)

  const [maneA, maneB] = MANE_GRADIENTS[config.mane_color] ?? ['#FF69B4', '#9B59B6']

  const hasHorn = config.horn !== 'none'
  const hasWings = config.wings !== 'none'
  const hasOutfit = config.outfit !== 'none'
  const hasAccessory = config.accessory !== 'none'

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
    >
      <defs>
        <linearGradient id="mane_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={maneA} />
          <stop offset="100%" stopColor={maneB} />
        </linearGradient>
        <linearGradient id="body_grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={bodyLight} />
          <stop offset="100%" stopColor={bodyDark} />
        </linearGradient>
        <linearGradient id="horn_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
        <radialGradient id="eye_shine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="sparkle">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {animated && (
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
            @keyframes tail-sway {
              0%, 100% { transform-origin: top; transform: rotate(-8deg); }
              50% { transform-origin: top; transform: rotate(8deg); }
            }
            @keyframes blink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.1); }
            }
            .pony-group {
              animation: float 3s ease-in-out infinite;
            }
            .pony-tail {
              animation: tail-sway 2s ease-in-out infinite;
            }
            .pony-eye {
              animation: blink 4s ease-in-out infinite;
            }
          `}</style>
        )}
      </defs>

      <g className="pony-group">
        {/* Wings (behind body) */}
        {hasWings && config.wings !== 'bat_wings' && (
          <g opacity="0.9">
            <ellipse cx="120" cy="165" rx="55" ry="28" fill="url(#mane_grad)" opacity="0.7" transform="rotate(-30, 120, 165)" />
            <ellipse cx="115" cy="170" rx="40" ry="18" fill="white" opacity="0.5" transform="rotate(-30, 115, 170)" />
            <ellipse cx="200" cy="165" rx="55" ry="28" fill="url(#mane_grad)" opacity="0.7" transform="rotate(30, 200, 165)" />
            <ellipse cx="205" cy="170" rx="40" ry="18" fill="white" opacity="0.5" transform="rotate(30, 205, 170)" />
          </g>
        )}
        {hasWings && config.wings === 'bat_wings' && (
          <g opacity="0.85">
            <path d="M130 170 Q90 120 60 140 Q80 175 130 185Z" fill="#4A0080" />
            <path d="M190 170 Q230 120 260 140 Q240 175 190 185Z" fill="#4A0080" />
          </g>
        )}

        {/* Body */}
        <ellipse cx="160" cy="210" rx="75" ry="60" fill="url(#body_grad)" stroke={bodyDark} strokeWidth="1.5" />

        {/* Legs */}
        <rect x="110" y="250" width="22" height="50" rx="10" fill={body} stroke={bodyDark} strokeWidth="1" />
        <rect x="143" y="255" width="22" height="48" rx="10" fill={body} stroke={bodyDark} strokeWidth="1" />
        <rect x="175" y="255" width="22" height="48" rx="10" fill={body} stroke={bodyDark} strokeWidth="1" />
        <rect x="208" y="250" width="22" height="50" rx="10" fill={body} stroke={bodyDark} strokeWidth="1" />
        {/* Hooves */}
        <ellipse cx="121" cy="300" rx="12" ry="6" fill={bodyDark} />
        <ellipse cx="154" cy="302" rx="12" ry="6" fill={bodyDark} />
        <ellipse cx="186" cy="302" rx="12" ry="6" fill={bodyDark} />
        <ellipse cx="219" cy="300" rx="12" ry="6" fill={bodyDark} />

        {/* Tail */}
        <g className="pony-tail">
          <path d="M235 200 Q275 180 270 230 Q265 270 240 280 Q260 250 245 220 Q255 200 235 200Z"
            fill="url(#mane_grad)" opacity="0.95" />
          <path d="M238 205 Q272 188 268 232 Q260 265 242 272"
            fill="none" stroke={maneB} strokeWidth="2" opacity="0.5" />
        </g>

        {/* Neck */}
        <ellipse cx="138" cy="175" rx="30" ry="35" fill="url(#body_grad)" stroke={bodyDark} strokeWidth="1" />

        {/* Head */}
        <ellipse cx="120" cy="135" rx="45" ry="42" fill="url(#body_grad)" stroke={bodyDark} strokeWidth="1.5" />

        {/* Snout */}
        <ellipse cx="88" cy="150" rx="22" ry="16" fill={bodyLight} stroke={bodyDark} strokeWidth="1" />
        <ellipse cx="82" cy="152" rx="5" ry="4" fill={darken(body, 25)} />
        <ellipse cx="94" cy="152" rx="5" ry="4" fill={darken(body, 25)} />

        {/* Horn */}
        {hasHorn && (
          <g>
            <polygon points="120,60 108,98 132,98" fill="url(#horn_grad)" stroke="#E65100" strokeWidth="1" />
            {config.horn === 'rainbow_horn' && (
              <>
                <polygon points="120,60 108,98 132,98" fill="url(#mane_grad)" opacity="0.6" />
              </>
            )}
            {config.horn === 'crystal' && (
              <>
                <polygon points="120,60 108,98 132,98" fill="#B2EBF2" opacity="0.8" stroke="#00BCD4" strokeWidth="1" />
                <polygon points="120,65 114,90 126,90" fill="white" opacity="0.5" />
              </>
            )}
          </g>
        )}

        {/* Mane */}
        <ManeShape style={config.mane_style} x={120} y={110} />

        {/* Eyes */}
        <g className="pony-eye" style={{ transformOrigin: '105px 128px' }}>
          <ellipse cx="105" cy="128" rx="12" ry="13" fill="#1A1A2E" />
          <ellipse cx="105" cy="128" rx="9" ry="10" fill="#4A0080" />
          <circle cx="105" cy="128" r="4" fill="#8B00FF" />
          <ellipse cx="103" cy="124" rx="4" ry="3" fill="url(#eye_shine)" />
          <circle cx="110" cy="132" r="1.5" fill="white" />
        </g>

        {/* Eyelashes */}
        <path d="M95 118 Q99 112 103 116" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M98 116 Q102 109 106 114" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M103 115 Q107 108 111 113" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="98" cy="140" rx="8" ry="5" fill="#FF6B9D" opacity="0.35" />

        {/* Smile */}
        <path d="M82 155 Q90 162 98 156" stroke={darken(body, 30)} strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Cutie mark */}
        <g opacity="0.85">
          <text x="155" y="228" fontSize="22" textAnchor="middle">✨</text>
        </g>

        {/* Outfit overlay */}
        {hasOutfit && <OutfitOverlay outfit={config.outfit} body={body} />}

        {/* Accessory */}
        {hasAccessory && <AccessoryOverlay accessory={config.accessory} />}

        {/* Sparkles around premium */}
        {(hasHorn || hasWings) && (
          <g filter="url(#sparkle)">
            <text x="75" y="90" fontSize="14" opacity="0.8">✨</text>
            <text x="155" y="75" fontSize="10" opacity="0.6">⭐</text>
            <text x="50" y="130" fontSize="10" opacity="0.7">✦</text>
          </g>
        )}
      </g>
    </svg>
  )
}

function ManeShape({ style, x, y }: { style: string; x: number; y: number }) {
  const base = { fill: 'url(#mane_grad)', stroke: 'none' }
  if (style === 'wavy') {
    return (
      <g>
        <path d={`M${x - 30} ${y - 30} Q${x - 55} ${y - 10} ${x - 45} ${y + 20} Q${x - 60} ${y + 40} ${x - 35} ${y + 55} Q${x - 20} ${y + 70} ${x} ${y + 60} Q${x - 5} ${y + 30} ${x - 15} ${y + 10} Q${x - 10} ${y - 10} ${x - 30} ${y - 30}Z`} {...base} />
      </g>
    )
  }
  if (style === 'straight') {
    return (
      <rect x={x - 55} y={y - 35} width="28" height="90" rx="14" {...base} />
    )
  }
  if (style === 'curly') {
    return (
      <g>
        <path d={`M${x - 30} ${y - 30} Q${x - 65} ${y} ${x - 50} ${y + 30} Q${x - 35} ${y + 60} ${x - 55} ${y + 80} Q${x - 70} ${y + 100} ${x - 40} ${y + 95} Q${x - 15} ${y + 85} ${x - 20} ${y + 60} Q${x - 5} ${y + 30} ${x - 15} ${y} Q${x - 5} ${y - 20} ${x - 30} ${y - 30}Z`} {...base} />
      </g>
    )
  }
  if (style === 'braided') {
    return (
      <g>
        <rect x={x - 55} y={y - 35} width="26" height="85" rx="12" {...base} opacity={0.8} />
        <path d={`M${x - 55} ${y - 10} Q${x - 42} ${y} ${x - 30} ${y - 10} Q${x - 42} ${y + 20} ${x - 55} ${y + 10}Z`} fill="url(#mane_grad)" opacity={0.9} />
        <path d={`M${x - 55} ${y + 20} Q${x - 42} ${y + 30} ${x - 30} ${y + 20} Q${x - 42} ${y + 40} ${x - 55} ${y + 30}Z`} fill="url(#mane_grad)" opacity={0.9} />
      </g>
    )
  }
  if (style === 'flowing') {
    return (
      <g>
        <path d={`M${x - 28} ${y - 35} Q${x - 75} ${y - 10} ${x - 65} ${y + 35} Q${x - 60} ${y + 80} ${x - 30} ${y + 90} Q${x - 10} ${y + 95} ${x - 5} ${y + 75} Q${x - 20} ${y + 65} ${x - 25} ${y + 40} Q${x - 30} ${y + 15} ${x - 10} ${y} Q${x + 5} ${y - 15} ${x - 28} ${y - 35}Z`} {...base} />
      </g>
    )
  }
  if (style === 'spiky') {
    return (
      <g>
        <polygon points={`${x - 30},${y - 40} ${x - 45},${y - 10} ${x - 35},${y - 5} ${x - 50},${y + 25} ${x - 38},${y + 20} ${x - 48},${y + 55} ${x - 32},${y + 48} ${x - 40},${y + 75} ${x - 20},${y + 65} ${x - 25},${y + 30} ${x - 12},${y + 10} ${x - 22},${y - 20} ${x - 30},${y - 40}`} {...base} />
      </g>
    )
  }
  return null
}

function OutfitOverlay({ outfit }: { outfit: string; body?: string }) {
  if (outfit === 'princess_dress') {
    return (
      <g opacity="0.9">
        <path d="M110 215 Q160 195 210 215 Q220 260 160 275 Q100 260 110 215Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
        <path d="M125 215 Q160 200 195 215 Q200 245 160 255 Q120 245 125 215Z" fill="white" opacity="0.3" />
        <text x="160" y="248" fontSize="16" textAnchor="middle">👑</text>
      </g>
    )
  }
  if (outfit === 'star_suit') {
    return (
      <g opacity="0.9">
        <path d="M112 215 Q160 195 208 215 Q215 258 160 272 Q105 258 112 215Z" fill="#1A237E" stroke="#3F51B5" strokeWidth="1" />
        <text x="148" y="244" fontSize="12">⭐</text>
        <text x="164" y="258" fontSize="10">✦</text>
        <text x="172" y="244" fontSize="12">⭐</text>
      </g>
    )
  }
  if (outfit === 'fairy_dress') {
    return (
      <g opacity="0.9">
        <path d="M112 215 Q160 195 208 215 Q215 258 160 272 Q105 258 112 215Z" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1" />
        <path d="M120 218 Q160 202 200 218 Q205 248 160 258 Q115 248 120 218Z" fill="rgba(255,255,255,0.4)" />
        <text x="160" y="250" fontSize="16" textAnchor="middle">🌿</text>
      </g>
    )
  }
  if (outfit === 'mermaid') {
    return (
      <g opacity="0.9">
        <path d="M115 215 Q160 196 205 215 Q212 255 185 275 Q160 285 135 275 Q108 255 115 215Z" fill="#00BCD4" stroke="#0097A7" strokeWidth="1" />
        <path d="M122 220 Q160 204 198 220 Q204 250 185 268 Q160 276 135 268 Q116 250 122 220Z" fill="rgba(255,255,255,0.3)" />
        <text x="160" y="250" fontSize="16" textAnchor="middle">🐠</text>
      </g>
    )
  }
  if (outfit === 'rainbow_suit') {
    return (
      <g opacity="0.9">
        <defs>
          <linearGradient id="rainbow_suit_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="33%" stopColor="#FFFF00" />
            <stop offset="66%" stopColor="#00FF00" />
            <stop offset="100%" stopColor="#0000FF" />
          </linearGradient>
        </defs>
        <path d="M112 215 Q160 195 208 215 Q215 258 160 272 Q105 258 112 215Z" fill="url(#rainbow_suit_grad)" stroke="none" />
        <path d="M120 218 Q160 202 200 218 Q205 248 160 258 Q115 248 120 218Z" fill="rgba(255,255,255,0.3)" />
        <text x="160" y="250" fontSize="16" textAnchor="middle">🌈</text>
      </g>
    )
  }
  if (outfit === 'knight') {
    return (
      <g opacity="0.9">
        <path d="M112 215 Q160 195 208 215 Q215 258 160 272 Q105 258 112 215Z" fill="#607D8B" stroke="#455A64" strokeWidth="1.5" />
        <path d="M138 215 L138 270 Q160 275 182 270 L182 215Z" fill="#78909C" opacity="0.6" />
        <text x="160" y="250" fontSize="16" textAnchor="middle">⚔️</text>
      </g>
    )
  }
  return null
}

function AccessoryOverlay({ accessory }: { accessory: string }) {
  if (accessory === 'crown') {
    return (
      <g>
        <path d="M95 93 L100 72 L112 86 L120 65 L128 86 L140 72 L145 93Z" fill="#FFD700" stroke="#FFA000" strokeWidth="1" />
        <circle cx="120" cy="70" r="4" fill="#E91E63" />
        <circle cx="100" cy="78" r="3" fill="#3F51B5" />
        <circle cx="140" cy="78" r="3" fill="#4CAF50" />
      </g>
    )
  }
  if (accessory === 'flower') {
    return (
      <g>
        <circle cx="148" cy="98" r="8" fill="#FF69B4" />
        <circle cx="138" cy="93" r="7" fill="#FF69B4" />
        <circle cx="130" cy="100" r="7" fill="#FF69B4" />
        <circle cx="135" cy="110" r="7" fill="#FF69B4" />
        <circle cx="147" cy="108" r="7" fill="#FF69B4" />
        <circle cx="139" cy="100" r="6" fill="#FFE082" />
      </g>
    )
  }
  if (accessory === 'bow') {
    return (
      <g>
        <path d="M95 100 Q80 85 90 95 Q80 105 95 100Z" fill="#FF1493" />
        <path d="M145 100 Q160 85 150 95 Q160 105 145 100Z" fill="#FF1493" />
        <ellipse cx="120" cy="100" rx="8" ry="6" fill="#FF69B4" />
      </g>
    )
  }
  if (accessory === 'stars') {
    return (
      <g filter="url(#sparkle)">
        <text x="82" y="108" fontSize="14">⭐</text>
        <text x="145" y="95" fontSize="10">✨</text>
        <text x="70" y="130" fontSize="10">✦</text>
      </g>
    )
  }
  if (accessory === 'glasses') {
    return (
      <g>
        <rect x="89" y="122" width="22" height="14" rx="7" fill="none" stroke="#1A237E" strokeWidth="2" />
        <rect x="112" y="122" width="22" height="14" rx="7" fill="none" stroke="#1A237E" strokeWidth="2" />
        <line x1="111" y1="129" x2="112" y2="129" stroke="#1A237E" strokeWidth="2" />
        <line x1="89" y1="129" x2="83" y2="125" stroke="#1A237E" strokeWidth="2" />
        <line x1="134" y1="129" x2="140" y2="125" stroke="#1A237E" strokeWidth="2" />
      </g>
    )
  }
  if (accessory === 'necklace') {
    return (
      <g>
        <path d="M110 168 Q138 180 166 168" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="138" cy="178" r="5" fill="#E91E63" stroke="#C62828" strokeWidth="1" />
        <circle cx="122" cy="172" r="3" fill="#FFD700" />
        <circle cx="154" cy="172" r="3" fill="#FFD700" />
      </g>
    )
  }
  return null
}

function darken(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount)
  return `rgb(${r},${g},${b})`
}

function lighten(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount)
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount)
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount)
  return `rgb(${r},${g},${b})`
}
