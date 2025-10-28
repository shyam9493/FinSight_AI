import { useEffect, useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import emailjs from '@emailjs/browser'
import './App.css'

function IconSun(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMoon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch (e) {
      return false
    }
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    try {
      if (isDark) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (e) {}
  }, [isDark])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing. Please add credentials to .env.local')
        setFormStatus('error')
        return
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )

      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      console.error('Email send failed:', error)
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="container-max mx-auto flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-linear-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">F</div>
            <div>
              <img src='Finsight ai.png' />
              <div className="text-lg font-semibold">FinSight AI</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Smarter financial insights, faster decisions</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-slate-600 dark:text-slate-300">
              <a className="hover:underline" href="#features">Features</a>
              <a className="hover:underline" href="#contact">Contact</a>
            </nav>

            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((s) => !s)}
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <IconSun className="w-5 h-5" /> : <IconMoon className="w-5 h-5" />}
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container-max mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">FinSight AI — Financial intelligence for modern teams</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Analyze trends, forecast outcomes, and generate actionable insights with a single platform. Built for analysts, investors, and finance teams who want fast, trusted insights.</p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-md font-semibold">Try demo</a>
              <a href="#features" className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-md text-slate-700 dark:text-slate-200">See features</a>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container-max mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Automated Insights</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Get automated narrative analysis and anomaly detection across your financial datasets.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Forecasting</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Scenario modeling and probabilistic forecasts so you can plan with confidence.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Integrations</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Connect to data warehouses, CSVs, and popular finance tools with secure connectors.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container-max mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-semibold text-center mb-4">Get in Touch</h2>
            <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell us what you're thinking..."
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus === 'success' && (
                <div className="text-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="text-center text-red-600 dark:text-red-400 font-medium">
                  Failed to send message. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-max mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} FinSight AI — Built for faster decisions</div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
