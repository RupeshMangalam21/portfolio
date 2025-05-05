"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"

export default function Loading() {
  useEffect(() => {
    // Loading octagon animation
    const octagon = document.getElementById("loading-octagon")
    if (octagon) {
      const tl = gsap.timeline({ repeat: -1 })
      tl.to(octagon, { rotation: "+=360", duration: 2, ease: "linear" })
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <svg id="loading-octagon" className="w-24 h-24" viewBox="0 0 50 50">
        <polygon
          points="15 5 35 5 45 15 45 35 35 45 15 45 5 35 5 15"
          stroke="#64ffda"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>
      <motion.img
        src="/logo.png"
        alt="R"
        className="absolute w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </div>
  )
}
