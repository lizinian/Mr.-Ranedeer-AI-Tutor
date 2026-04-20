import { motion } from 'framer-motion'
import type { Item } from '../data/items'
import type { Category } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'

interface Props {
  items: Item[]
  category: Category
}

export default function ItemPicker({ items, category }: Props) {
  const { config, unlockedItems, hasPremium, setConfig, openPaywall } = useGameStore()
  const selected = config[category]

  const isUnlocked = (item: Item) =>
    hasPremium || !item.isPremium || unlockedItems.has(item.id)

  const handleSelect = (item: Item) => {
    if (!isUnlocked(item)) {
      openPaywall(item.id)
      return
    }
    setConfig(category, item.id)
  }

  return (
    <div className="item-grid">
      {items.map((item) => {
        const unlocked = isUnlocked(item)
        const isSelected = selected === item.id

        return (
          <motion.button
            key={item.id}
            className={`item-btn ${isSelected ? 'selected' : ''} ${!unlocked ? 'locked' : ''}`}
            onClick={() => handleSelect(item)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title={item.name}
          >
            <ItemPreview item={item} />
            {!unlocked && (
              <div className="lock-badge">
                <span>🔒</span>
              </div>
            )}
            {isSelected && (
              <motion.div
                className="selected-ring"
                layoutId="selectedRing"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="item-label">{item.name}</div>
          </motion.button>
        )
      })}
    </div>
  )
}

function ItemPreview({ item }: { item: Item }) {
  if (item.color) {
    return (
      <div className="item-color-swatch" style={{ background: item.color }} />
    )
  }
  if (item.gradient) {
    const grad = `linear-gradient(135deg, ${item.gradient.join(', ')})`
    return (
      <div className="item-color-swatch" style={{ background: grad }} />
    )
  }
  return (
    <div className="item-icon-wrap">
      <span className="item-icon">{item.icon ?? '?'}</span>
    </div>
  )
}
