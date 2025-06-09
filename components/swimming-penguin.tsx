"use client"

import { useEffect, useState } from "react"

interface SwimmingPenguinProps {
  isActive: boolean
  onComplete: () => void
}

export function SwimmingPenguin({ isActive, onComplete }: SwimmingPenguinProps) {
  const [penguins, setPenguins] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [fish, setFish] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      // Create fish swimming from right to left (they appear first)
      const newFish = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: window.innerWidth + 100,
        y: Math.random() * (window.innerHeight - 200) + 100,
        delay: i * 0.3,
      }))

      // Create penguin flock chasing the fish (they appear after fish)
      const newPenguins = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: window.innerWidth + 200 + i * 50, // Spread out the flock
        y: Math.random() * (window.innerHeight - 200) + 100,
        delay: i * 0.2 + 0.5, // Start after fish with staggered timing
      }))

      setFish(newFish)
      setPenguins(newPenguins)

      // Clear animation after completion
      const timer = setTimeout(() => {
        setFish([])
        setPenguins([])
        onComplete()
      }, 6000)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Fish swimming first */}
      {fish.map((fishItem) => (
        <div
          key={`fish-${fishItem.id}`}
          className="absolute penguin-fish-swimming"
          style={{
            left: `${fishItem.x}px`,
            top: `${fishItem.y}px`,
            animationDelay: `${fishItem.delay}s`,
          }}
        >
          🐟
        </div>
      ))}

      {/* Penguin flock chasing the fish */}
      {penguins.map((penguin) => (
        <div
          key={`penguin-${penguin.id}`}
          className="absolute penguin-flock-swimming"
          style={{
            left: `${penguin.x}px`,
            top: `${penguin.y}px`,
            animationDelay: `${penguin.delay}s`,
          }}
        >
          🐧
        </div>
      ))}
    </div>
  )
}
