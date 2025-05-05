"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="text-teal-500 dark:text-teal-400">About</span> Me
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-teal-500 rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg border-2 border-teal-500 dark:border-teal-400">
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/profile.jpeg" alt="Rupesh Mangalam" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.p variants={item} className="text-gray-700 dark:text-gray-300 mb-6">
              I'm Rupesh Mangalam, a Software Developer with a strong foundation in JavaScript, React, Node.js, and a
              growing proficiency in backend technologies like Docker, Redis, and SQLAlchemy.
            </motion.p>
            <motion.p variants={item} className="text-gray-700 dark:text-gray-300 mb-6">
              Recent Bachelor of Engineering Grad in Computer Science at Chandigarh University,
              I'm passionate about building user-centric, scalable applications and eager to deepen my expertise
              in containerized environments and database management.
            </motion.p>
            <motion.p variants={item} className="text-gray-700 dark:text-gray-300 mb-6">
              Here are a few technologies I've been working with recently:
            </motion.p>

            <motion.ul variants={item} className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> JavaScript/TypeScript
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> React/Next.js
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> Node.js
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> Python
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> Docker
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span> PostgreSQL/Firebase
              </li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
