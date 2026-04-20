import { motion } from 'framer-motion'
import type { Category } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../data/items'

const CATEGORIES: Category[] = [
  'body_color', 'mane_style', 'mane_color', 'tail_style',
  'outfit', 'accessory', 'background', 'horn', 'wings',
]

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory } = useGameStore()

  return (
    <div className="category-tabs">
      {CATEGORIES.map((cat) => {
        const isActive = cat === activeCategory
        return (
          <motion.button
            key={cat}
            className={`cat-tab ${isActive ? 'cat-tab-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cat-icon">{CATEGORY_ICONS[cat]}</span>
            <span className="cat-label">{CATEGORY_LABELS[cat]}</span>
            {isActive && (
              <motion.div
                className="cat-underline"
                layoutId="catUnderline"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
