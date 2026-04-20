import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { ALL_ITEMS_BY_CATEGORY } from './data/items'
import PonyCharacter from './components/PonyCharacter'
import BackgroundScene from './components/BackgroundScene'
import CategoryTabs from './components/CategoryTabs'
import ItemPicker from './components/ItemPicker'
import PaywallModal from './components/PaywallModal'
import './App.css'

export default function App() {
  const { config, activeCategory, coins, hasPremium, openPaywall } = useGameStore()
  const items = ALL_ITEMS_BY_CATEGORY[activeCategory]

  return (
    <div className="app">
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <span className="app-logo">🦄</span>
          <span className="app-title">Pony Princess</span>
        </div>
        <div className="top-bar-right">
          <div className="coins-badge">
            <span className="coin-icon">🪙</span>
            <span className="coin-count">{coins}</span>
          </div>
          {!hasPremium && (
            <motion.button
              className="premium-btn"
              onClick={() => openPaywall()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 8px #FFD700', '0 0 20px #FFD700', '0 0 8px #FFD700'] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Unlock All
            </motion.button>
          )}
          {hasPremium && (
            <div className="premium-badge">
              <span>Premium</span>
            </div>
          )}
        </div>
      </header>

      {/* Canvas */}
      <div className="canvas-wrap">
        <div className="canvas-scene">
          <BackgroundScene background={config.background} />
          <div className="pony-stage">
            <motion.div
              key={`${config.body_color}-${config.mane_style}-${config.outfit}-${config.horn}-${config.wings}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <PonyCharacter config={config} size={280} animated />
            </motion.div>
          </div>
        </div>

        {hasPremium && <SparkleParticles />}
      </div>

      {/* Controls */}
      <div className="controls-panel">
        <CategoryTabs />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
            className="picker-wrap"
          >
            <ItemPicker items={items} category={activeCategory} />
          </motion.div>
        </AnimatePresence>
      </div>

      <PaywallModal />
    </div>
  )
}

function SparkleParticles() {
  return (
    <div className="sparkle-particles" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="sparkle-dot"
          style={{
            left: `${8 + i * 11}%`,
            top: `${15 + (i % 3) * 28}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}
