"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

type Education = {
  institution: string
  degree: string
  date: string
  details: string[]
}

const education: Education[] = [
  {
    institution: "Chandigarh University",
    degree: "Bachelor of Engineering (BE), Computer Science and Engineering",
    date: "2021 - Present (Graduating July 2025)",
    details: [
      "Currently pursuing Computer Science and Engineering",
      "Focusing on full-stack development and software engineering principles",
      "Participating in hackathons and coding competitions",
    ],
  },
  {
    institution: "Sanskar International School",
    degree: "Class 12th",
    date: "2021",
    details: ["Completed with 76.4%", "Focused on science and mathematics"],
  },
  {
    institution: "Sanskar International School",
    degree: "Class 10th",
    date: "2019",
    details: ["Completed with 83.2%", "Developed interest in computer science and programming"],
  },
]

type Achievement = {
  title: string
  organization: string
  date: string
  description: string[]
}

const achievements: Achievement[] = [
  {
    title: "Tekathon 2.0",
    organization: "Smart India Hackathon 2023 Regionals",
    date: "September 2023",
    description: [
      "Led a team of 6 members to victory, qualifying for Smart India Hackathon 2023 Regionals",
      "Ranked top 30 out of 700+ teams",
    ],
  },
  {
    title: "Pharma-thon 1.0",
    organization: "",
    date: "November 2023",
    description: ["Led a team of 2 members to secure first runner-up position out of 30+ teams"],
  },
  {
    title: "Tomato Grand Challenge Hackathon",
    organization: "",
    date: "November 2023",
    description: ["Led a team to secure first runner-up position out of 30+ teams"],
  },
]

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState<"education" | "achievements">("education")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          <span className="text-teal-500 dark:text-teal-400">Education</span> & Achievements
        </motion.h2>

        <div ref={ref} className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  activeSection === "education"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                )}
                onClick={() => setActiveSection("education")}
              >
                Education
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  activeSection === "achievements"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                )}
                onClick={() => setActiveSection("achievements")}
              >
                Achievements
              </motion.button>
            </div>
          </div>

          {activeSection === "education" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-col md:flex-row border-b border-gray-200 dark:border-gray-700">
                {education.map((edu, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: "rgba(20, 184, 166, 0.1)" }}
                    className={cn(
                      "py-3 px-4 text-left focus:outline-none transition-colors",
                      activeTab === index
                        ? "text-teal-500 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400 md:border-b-0 md:border-l-2"
                        : "text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400",
                    )}
                    onClick={() => setActiveTab(index)}
                  >
                    {edu.institution}
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeTab}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {education[activeTab].degree}{" "}
                  <span className="text-teal-500 dark:text-teal-400">@ {education[activeTab].institution}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{education[activeTab].date}</p>
                <ul className="space-y-3">
                  {education[activeTab].details.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}

          {activeSection === "achievements" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {achievement.title}
                    {achievement.organization && (
                      <span className="text-teal-500 dark:text-teal-400"> @ {achievement.organization}</span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.date}</p>
                  <ul className="space-y-3">
                    {achievement.description.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <span className="text-teal-500 dark:text-teal-400 mr-2">▹</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
