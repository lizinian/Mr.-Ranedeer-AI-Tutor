import type { Category } from '../store/gameStore'

export interface Item {
  id: string
  name: string
  category: Category
  isPremium: boolean
  color?: string
  gradient?: string[]
  icon?: string
}

export const BODY_COLORS: Item[] = [
  { id: 'pink', name: 'Rose Pink', category: 'body_color', isPremium: false, color: '#FFB3C6' },
  { id: 'lavender', name: 'Lavender', category: 'body_color', isPremium: false, color: '#D4B8E0' },
  { id: 'sky_blue', name: 'Sky Blue', category: 'body_color', isPremium: false, color: '#B3D9F2' },
  { id: 'mint', name: 'Mint', category: 'body_color', isPremium: false, color: '#B3E8D0' },
  { id: 'peach', name: 'Peach', category: 'body_color', isPremium: true, color: '#FFD4A8' },
  { id: 'golden', name: 'Golden', category: 'body_color', isPremium: true, color: '#FFE066' },
  { id: 'coral', name: 'Coral', category: 'body_color', isPremium: true, color: '#FF8C94' },
  { id: 'lilac', name: 'Lilac', category: 'body_color', isPremium: true, color: '#C8A4D4' },
  { id: 'turquoise', name: 'Turquoise', category: 'body_color', isPremium: true, color: '#40E0D0' },
]

export const MANE_STYLES: Item[] = [
  { id: 'wavy', name: 'Wavy', category: 'mane_style', isPremium: false, icon: '〜' },
  { id: 'straight', name: 'Straight', category: 'mane_style', isPremium: false, icon: '|' },
  { id: 'curly', name: 'Curly', category: 'mane_style', isPremium: true, icon: '🌀' },
  { id: 'braided', name: 'Braided', category: 'mane_style', isPremium: true, icon: '🎀' },
  { id: 'flowing', name: 'Flowing', category: 'mane_style', isPremium: true, icon: '✨' },
  { id: 'spiky', name: 'Spiky', category: 'mane_style', isPremium: true, icon: '⚡' },
]

export const MANE_COLORS: Item[] = [
  { id: 'purple_pink', name: 'Sunset', category: 'mane_color', isPremium: false, gradient: ['#FF69B4', '#9B59B6'] },
  { id: 'blue_teal', name: 'Ocean', category: 'mane_color', isPremium: false, gradient: ['#3498DB', '#1ABC9C'] },
  { id: 'rainbow', name: 'Rainbow', category: 'mane_color', isPremium: true, gradient: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'] },
  { id: 'rose_gold', name: 'Rose Gold', category: 'mane_color', isPremium: true, gradient: ['#FFB6C1', '#C0A080'] },
  { id: 'midnight', name: 'Midnight', category: 'mane_color', isPremium: true, gradient: ['#2C3E7A', '#1A0550'] },
  { id: 'cotton_candy', name: 'Cotton Candy', category: 'mane_color', isPremium: true, gradient: ['#FFB3DE', '#B3E5FF'] },
]

export const TAIL_STYLES: Item[] = [
  { id: 'flowing', name: 'Flowing', category: 'tail_style', isPremium: false, icon: '〜' },
  { id: 'short', name: 'Short', category: 'tail_style', isPremium: false, icon: '↗' },
  { id: 'poofy', name: 'Poofy', category: 'tail_style', isPremium: true, icon: '☁️' },
  { id: 'star_tail', name: 'Star Tail', category: 'tail_style', isPremium: true, icon: '⭐' },
]

export const OUTFITS: Item[] = [
  { id: 'none', name: 'None', category: 'outfit', isPremium: false, icon: '❌' },
  { id: 'princess_dress', name: 'Princess', category: 'outfit', isPremium: false, icon: '👑' },
  { id: 'star_suit', name: 'Star Suit', category: 'outfit', isPremium: true, icon: '⭐' },
  { id: 'fairy_dress', name: 'Fairy', category: 'outfit', isPremium: true, icon: '🧚' },
  { id: 'knight', name: 'Knight', category: 'outfit', isPremium: true, icon: '⚔️' },
  { id: 'mermaid', name: 'Mermaid', category: 'outfit', isPremium: true, icon: '🐠' },
  { id: 'rainbow_suit', name: 'Rainbow', category: 'outfit', isPremium: true, icon: '🌈' },
]

export const ACCESSORIES: Item[] = [
  { id: 'none', name: 'None', category: 'accessory', isPremium: false, icon: '❌' },
  { id: 'crown', name: 'Crown', category: 'accessory', isPremium: false, icon: '👑' },
  { id: 'flower', name: 'Flower', category: 'accessory', isPremium: false, icon: '🌸' },
  { id: 'bow', name: 'Bow', category: 'accessory', isPremium: true, icon: '🎀' },
  { id: 'stars', name: 'Stars', category: 'accessory', isPremium: true, icon: '✨' },
  { id: 'glasses', name: 'Glasses', category: 'accessory', isPremium: true, icon: '🕶️' },
  { id: 'necklace', name: 'Necklace', category: 'accessory', isPremium: true, icon: '💎' },
]

export const BACKGROUNDS: Item[] = [
  { id: 'meadow', name: 'Meadow', category: 'background', isPremium: false, gradient: ['#87CEEB', '#90EE90'] },
  { id: 'sunset', name: 'Sunset', category: 'background', isPremium: false, gradient: ['#FF6B6B', '#FFE66D'] },
  { id: 'night', name: 'Night Sky', category: 'background', isPremium: true, gradient: ['#0F0C29', '#302B63'] },
  { id: 'underwater', name: 'Underwater', category: 'background', isPremium: true, gradient: ['#00C6FF', '#0072FF'] },
  { id: 'candy_land', name: 'Candy Land', category: 'background', isPremium: true, gradient: ['#FFB3DE', '#FFE4B5'] },
  { id: 'magic_forest', name: 'Magic Forest', category: 'background', isPremium: true, gradient: ['#2C5F2E', '#97BC62'] },
]

export const HORNS: Item[] = [
  { id: 'none', name: 'No Horn', category: 'horn', isPremium: false, icon: '—' },
  { id: 'unicorn', name: 'Unicorn', category: 'horn', isPremium: false, icon: '🦄' },
  { id: 'rainbow_horn', name: 'Rainbow', category: 'horn', isPremium: true, icon: '🌈' },
  { id: 'crystal', name: 'Crystal', category: 'horn', isPremium: true, icon: '💎' },
]

export const WINGS: Item[] = [
  { id: 'none', name: 'No Wings', category: 'wings', isPremium: false, icon: '—' },
  { id: 'butterfly', name: 'Butterfly', category: 'wings', isPremium: false, icon: '🦋' },
  { id: 'feather', name: 'Feather', category: 'wings', isPremium: true, icon: '🕊️' },
  { id: 'fairy_wings', name: 'Fairy', category: 'wings', isPremium: true, icon: '✨' },
  { id: 'bat_wings', name: 'Bat', category: 'wings', isPremium: true, icon: '🦇' },
]

export const ALL_ITEMS_BY_CATEGORY: Record<Category, Item[]> = {
  body_color: BODY_COLORS,
  mane_style: MANE_STYLES,
  mane_color: MANE_COLORS,
  tail_style: TAIL_STYLES,
  outfit: OUTFITS,
  accessory: ACCESSORIES,
  background: BACKGROUNDS,
  horn: HORNS,
  wings: WINGS,
}

export const CATEGORY_LABELS: Record<Category, string> = {
  body_color: 'Body Color',
  mane_style: 'Mane Style',
  mane_color: 'Mane Color',
  tail_style: 'Tail Style',
  outfit: 'Outfit',
  accessory: 'Accessory',
  background: 'Background',
  horn: 'Horn',
  wings: 'Wings',
}

export const CATEGORY_ICONS: Record<Category, string> = {
  body_color: '🎨',
  mane_style: '💇',
  mane_color: '🌈',
  tail_style: '〜',
  outfit: '👗',
  accessory: '💎',
  background: '🌄',
  horn: '🦄',
  wings: '🦋',
}
