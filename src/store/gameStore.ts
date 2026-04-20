import { create } from 'zustand'

export type Category = 'body_color' | 'mane_style' | 'mane_color' | 'tail_style' | 'outfit' | 'accessory' | 'background' | 'horn' | 'wings'

export interface PonyConfig {
  body_color: string
  mane_style: string
  mane_color: string
  tail_style: string
  outfit: string
  accessory: string
  background: string
  horn: string
  wings: string
}

export interface GameState {
  config: PonyConfig
  unlockedItems: Set<string>
  hasPremium: boolean
  coins: number
  showPaywall: boolean
  activeCategory: Category
  paywallTriggerItem: string | null

  setConfig: (key: Category, value: string) => void
  setActiveCategory: (cat: Category) => void
  openPaywall: (itemId?: string) => void
  closePaywall: () => void
  unlockPremium: () => void
  unlockItem: (itemId: string) => void
  addCoins: (amount: number) => void
}

const DEFAULT_CONFIG: PonyConfig = {
  body_color: 'pink',
  mane_style: 'wavy',
  mane_color: 'purple_pink',
  tail_style: 'flowing',
  outfit: 'none',
  accessory: 'none',
  background: 'meadow',
  horn: 'none',
  wings: 'none',
}

export const useGameStore = create<GameState>((set) => ({
  config: DEFAULT_CONFIG,
  unlockedItems: new Set(['pink', 'wavy', 'purple_pink', 'flowing', 'none', 'meadow']),
  hasPremium: false,
  coins: 100,
  showPaywall: false,
  activeCategory: 'body_color',
  paywallTriggerItem: null,

  setConfig: (key, value) =>
    set((state) => ({ config: { ...state.config, [key]: value } })),

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  openPaywall: (itemId) =>
    set({ showPaywall: true, paywallTriggerItem: itemId ?? null }),

  closePaywall: () =>
    set({ showPaywall: false, paywallTriggerItem: null }),

  unlockPremium: () =>
    set({ hasPremium: true, showPaywall: false }),

  unlockItem: (itemId) =>
    set((state) => ({
      unlockedItems: new Set([...state.unlockedItems, itemId]),
    })),

  addCoins: (amount) =>
    set((state) => ({ coins: state.coins + amount })),
}))
