import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer({ onBook }) {
  return (
    <footer className="bg-navy text-white/65">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="font-bold text-xl text-white mb-3">
              Karn <span className="text-accent">Neurocare</span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 mb-4">
              India's premier multi-speciality hospital committed to delivering world-class healthcare with compassion and excellence since 2000.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/8 rounded-lg px-3 py-2 text-xs text-white/75">
              🏆 NABH Accredited &nbsp;|&nbsp; JCI Certified
            </div>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Specialities</h4>
            <ul className="space-y-2.5">
              {['Cardiology','Neurology','Orthopedics','Oncology','Pediatrics'].map(s => (
                <li key={s}><Link to="/specialities" className="text-sm text-white/58 hover:text-accent transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['About Us','/about'],['Our Doctors','/doctors'],['Services','/services'],['Health Blog','/blog'],['Contact','/contact']].map(([l,t]) => (
                <li key={t}><Link to={t} className="text-sm text-white/58 hover:text-accent transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm"><MapPin size={15} className="shrink-0 text-accent mt-0.5"/><span className="text-white/58">123 MedCity Blvd, New Delhi 110001</span></li>
              <li className="flex gap-2.5 text-sm items-center"><Phone size={15} className="shrink-0 text-accent"/><span className="text-white/58">1800-MED-PLUS (24/7)</span></li>
              <li className="flex gap-2.5 text-sm items-center"><Mail size={15} className="shrink-0 text-accent"/><span className="text-white/58">info@karnneurocare.com</span></li>
              <li className="flex gap-2.5 text-sm"><Clock size={15} className="shrink-0 text-accent mt-0.5"/><span className="text-white/58">OPD: Mon–Sat 8AM–8PM<br/>Emergency: 24/7</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/38">
          <span>© 2025 Karn Neurocare & Maternity Hospital Hospital. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </div>
    </footer>
  )
}
