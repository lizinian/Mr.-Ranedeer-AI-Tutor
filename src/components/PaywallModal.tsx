import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

const PLANS = [
  {
    id: 'unlock_all',
    label: 'Unlock Everything',
    price: '$14.99',
    originalPrice: null,
    highlight: false,
    features: ['All body colors', 'All mane styles & colors', 'All outfits & accessories', 'All backgrounds', 'Horns & wings'],
  },
  {
    id: 'unlock_all_sale',
    label: 'BEST VALUE',
    badge: '50% OFF',
    price: '$6.99',
    originalPrice: '$14.99',
    highlight: true,
    features: ['All body colors', 'All mane styles & colors', 'All outfits & accessories', 'All backgrounds', 'Horns & wings'],
  },
]

const SINGLE_ITEMS = [
  { id: 'outfits', label: 'Unlock All Outfits', price: '$2.99', icon: '👗' },
  { id: 'accessories', label: 'Unlock All Accessories', price: '$2.99', icon: '💎' },
  { id: 'backgrounds', label: 'Unlock All Backgrounds', price: '$2.99', icon: '🌄' },
  { id: 'magic', label: 'Unlock Horns & Wings', price: '$2.99', icon: '✨' },
]

export default function PaywallModal() {
  const { showPaywall, closePaywall, unlockPremium } = useGameStore()

  const handlePurchase = (planId: string) => {
    // In a real app, this triggers Stripe/IAP flow
    console.log('Purchase:', planId)
    unlockPremium()
  }

  return (
    <AnimatePresence>
      {showPaywall && (
        <>
          <motion.div
            className="paywall-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePaywall}
          />
          <motion.div
            className="paywall-modal"
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="paywall-header">
              <div className="paywall-crown">✨👑✨</div>
              <h2 className="paywall-title">Unlock the Magic!</h2>
              <p className="paywall-subtitle">Get access to ALL exclusive styles, outfits & backgrounds</p>
              <button className="paywall-close" onClick={closePaywall}>✕</button>
            </div>

            {/* Character preview strip */}
            <div className="paywall-preview-strip">
              {['🦄', '🌈', '👑', '🌸', '⭐', '🦋', '✨'].map((e, i) => (
                <span key={i} className="preview-emoji">{e}</span>
              ))}
            </div>

            {/* Bundle plans */}
            <div className="paywall-plans">
              {PLANS.map((plan) => (
                <motion.button
                  key={plan.id}
                  className={`plan-card ${plan.highlight ? 'plan-highlight' : ''}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePurchase(plan.id)}
                >
                  {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                  <div className="plan-name">{plan.label}</div>
                  <div className="plan-price-wrap">
                    {plan.originalPrice && (
                      <span className="plan-original">{plan.originalPrice}</span>
                    )}
                    <span className="plan-price">{plan.price}</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((f, i) => (
                      <li key={i}>
                        <span className="feature-check">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  {plan.highlight && (
                    <div className="plan-cta">Get All Access!</div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="paywall-divider">
              <span>or unlock individual packs</span>
            </div>

            {/* Individual items */}
            <div className="single-items">
              {SINGLE_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  className="single-item-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handlePurchase(item.id)}
                >
                  <span className="single-item-icon">{item.icon}</span>
                  <span className="single-item-label">{item.label}</span>
                  <span className="single-item-price">{item.price}</span>
                </motion.button>
              ))}
            </div>

            <p className="paywall-legal">
              One-time purchase. No subscription. No hidden fees.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
