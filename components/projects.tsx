"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

type Project = {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
}

const projects: Project[] = [
  {
    title: "Autea Testing Framework",
    description:
      "End-to-end testing suite built on Playwright, with visual regression, API testing, accessibility, and custom HTML reports. (under development)",
    technologies: [
      "Playwright",
      "TypeScript",
      "Node.js",
      "CI/CD",
      "HTML Reports",
      "Visual Regression"
    ],
    github: "https://github.com/RupeshMangalam21/autea-testing-suite",
    image: "/autea.png",
  },
  {
    title: "TabZen - Intelligent Tab Management",
    description:
      "Open-source browser extension for smarter tab workflows with auto-grouping, semantic analysis, and productivity tools.",
    technologies: [
      "JavaScript",
      "Chrome Extensions",
      "Manifest V3",
      "Tailwind CSS",
      "Web APIs"
    ],
    github: "https://github.com/RupeshMangalam21/tabzen", 
    image: "/tabzen.png",
  },
  {
    title: "GearBox",
    description:
      "AI Driven Platform for vehicle and fleet maintenance (under development)",
    technologies: [
      "Three.js",
      "Next.js",
      "Node.js",
      "JavaScript",
      "Tailwind CSS"
    ],
    github: "https://github.com/RupeshMangalam21/gearbox",
    image: "/Gearbox.png",
  },
  {
    title: "Leetcode Compiler",
    description:
      "Leetcode inspired compiler system with support for multiple programming languages (under development)",
    technologies: [
      "Python",
      "Java",
      "JavaScript",
      "Docker",
      "Flask",
      "Redis",
      "PostgreSQL"
    ],
    github: "https://github.com/RupeshMangalam21/leetcode-compiler",
    image: "/compiler.png",
  },
  {
    title: "Healthcare Management System",
    description:
      "Healthcare management system, simplified with direct doctor-patient interaction",
    technologies: [
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
      "Firebase",
      "Google Maps API"
    ],
    github:
      "https://github.com/RupeshMangalam21/e-healthcare-management-system",
    image: "/ehms.png",
  },
  {
    title: "Resume Portfolio Website",
    description:
      "My personal portfolio website showcasing my projects and skills.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
      "React",
    ],
    github:
      "https://github.com/RupeshMangalam21/portfolio",
    image: "/portfolio.png",
  },
];

export default function Projects() {
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="text-teal-500 dark:text-teal-400">My</span> Projects
        </motion.h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-teal-500/20 group-hover:bg-teal-500/10 transition-colors duration-300"></div>
                  <img
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold group-hover:text-teal-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
