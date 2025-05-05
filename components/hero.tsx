/* components/Hero.tsx */
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, FileDown } from "lucide-react"
import Link from "next/link"
import FluidBackground from "./FluidBackground"

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fluid background */}
      <FluidBackground />

      {/* Hero content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="text-teal-500 dark:text-teal-400 text-lg md:text-xl mb-4">
            Hello, my name is
          </motion.p>
          <motion.h1 variants={item} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            Rupesh Mangalam
          </motion.h1>
          <motion.h2 variants={item} className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
            Software Developer
          </motion.h2>
          <motion.p variants={item} className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-8">
            Aspiring Fullstack Developer with a strong foundation in JavaScript, React, Node.js, and a growing
            proficiency in backend technologies. Building user-centric, scalable applications.
          </motion.p>
          <motion.div variants={item} className="flex justify-center space-x-4 mb-8">
            <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              asChild // Add this prop
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-gray-800"
            >
              <a
                href="/Rupesh_Mangalam_Resume.pdf"
                download="Rupesh_Mangalam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileDown className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </motion.div>

          {/* Centered arrow below content */}
          <motion.div
            variants={item}
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Link href="#about" aria-label="Scroll down">
              <ArrowDown className="text-teal-500 dark:text-teal-400 h-6 w-6" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
