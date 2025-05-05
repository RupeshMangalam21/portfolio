"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to send message.")
      } else {
        setSuccess("Message sent successfully!")
        e.currentTarget.reset()
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="text-teal-500 dark:text-teal-400">Get In</span> Touch
        </motion.h2>

        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Contact Information */}
          <motion.div variants={item} className="space-y-8">
            <motion.h3 variants={item} className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Contact Information
            </motion.h3>
            <motion.p variants={item} className="text-gray-700 dark:text-gray-300 mb-8">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </motion.p>

            <motion.div variants={item} className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-700 dark:text-gray-300">rupeshmangalam.work@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-700 dark:text-gray-300">(+91) 7696290139</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-700 dark:text-gray-300">Punjab, India</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex space-x-4 mt-8">
              <a href="https://github.com/RupeshMangalam21" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/code404" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side: Form */}
          <motion.div variants={item}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <Input id="name" name="name" placeholder="Your name" className="border-gray-300 dark:border-gray-700 focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <Input id="email" name="email" type="email" placeholder="Your email" className="border-gray-300 dark:border-gray-700 focus:ring-teal-500 focus:border-teal-500" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <Input id="subject" name="subject" placeholder="Subject" className="border-gray-300 dark:border-gray-700 focus:ring-teal-500 focus:border-teal-500" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <Textarea id="message" name="message" rows={5} placeholder="Your message" className="border-gray-300 dark:border-gray-700 focus:ring-teal-500 focus:border-teal-500" required />
              </div>

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>

              {success && <p className="text-green-600">{success}</p>}
              {!success && error && <p className="text-red-600">{error}</p>}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}