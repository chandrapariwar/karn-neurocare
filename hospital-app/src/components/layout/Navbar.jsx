import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const LINKS = [
  { to:'/', label:'Home' },
  { to:'/about', label:'About' },
  { to:'/specialities', label:'Specialities' },
  { to:'/doctors', label:'Doctors' },
  { to:'/services', label:'Services' },
  { to:'/blog', label:'Blog' },
  { to:'/contact', label:'Contact' },
]

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg shadow-black/8' : 'bg-navy'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center text-lg">🏥</div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-navy' : 'text-white'}`}>
              Karn <span className="text-accent">Neurocare</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === to
                    ? scrolled ? 'bg-brand/10 text-brand' : 'bg-white/15 text-white'
                    : scrolled ? 'text-gray-600 hover:text-brand hover:bg-brand/8' : 'text-white/80 hover:text-white hover:bg-white/12'
                }`}>
                {label}
              </Link>
            ))}
            <button onClick={onBook}
              className="ml-3 px-5 py-2 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors">
              Book Appointment
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}>
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl">
            {LINKS.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === to ? 'bg-brand/10 text-brand' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                {label}
              </Link>
            ))}
            <button onClick={() => { onBook(); setMobileOpen(false) }}
              className="w-full mt-2 px-4 py-3 bg-brand text-white rounded-xl text-sm font-semibold">
              Book Appointment
            </button>
            <a href="tel:18001800" className="flex items-center gap-2 px-4 py-2.5 text-danger text-sm font-semibold">
              <Phone size={16}/> 1800-MED-PLUS (Emergency)
            </a>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}
