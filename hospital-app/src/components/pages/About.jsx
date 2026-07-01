import { useNavigate } from 'react-router-dom'
import EmergencyStrip from '../layout/EmergencyStrip'

const TEAM = [
  { name:'Dr. Anil Sharma',  role:'Chairman & Chief Cardiologist', img:'https://randomuser.me/api/portraits/men/32.jpg' },
  { name:'Dr. Priya Mehta',  role:'Medical Director',              img:'https://randomuser.me/api/portraits/women/44.jpg' },
  { name:'Dr. Rahul Kapoor', role:'Head of Surgery',               img:'https://randomuser.me/api/portraits/men/55.jpg' },
  { name:'Dr. Sunita Rao',   role:'Chief Oncologist',              img:'https://randomuser.me/api/portraits/women/33.jpg' },
]

export default function About({ onBook }) {
  const nav = useNavigate()
  return (
    <>
      <div className="bg-navy py-14 px-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-white mb-3">About Karn Neurocare & Maternity Hospital</h1>
        <p className="text-white/65 text-base">25 years of healing, caring and transforming lives across India</p>
        <div className="flex justify-center gap-2 mt-4 text-sm text-white/45">
          <span onClick={() => nav('/')} className="cursor-pointer hover:text-accent">Home</span>
          <span>›</span><span className="text-accent">About</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <div>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title">Healing Lives Since 2000</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">Karn Neurocare & Maternity Hospital was founded with a single vision: to make world-class healthcare accessible to every Indian. From a 50-bed facility in 2000, we have grown into one of India's most trusted multi-speciality hospital networks with over 1000 beds and 500+ specialists.</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">We believe that great healthcare is not just about technology — it's about compassion, trust and treating every patient with dignity. Our NABH and JCI accreditation reflects our unwavering commitment to quality and patient safety.</p>
            <div className="flex gap-8 flex-wrap">
              {[['1M+','Patients Treated'],['500+','Expert Doctors'],['25+','Years of Service']].map(([v,l]) => (
                <div key={l}><div className="text-2xl font-black text-brand">{v}</div><div className="text-xs text-gray-400 mt-1">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <img src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&w=700" alt="Hospital" className="w-full h-96 object-cover rounded-2xl"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon:'🎯', title:'Our Mission', text:'To provide exceptional, compassionate healthcare that transforms and saves lives across India.' },
            { icon:'🔭', title:'Our Vision',  text:'To be the most trusted name in healthcare, setting new standards in medical excellence globally.' },
            { icon:'💡', title:'Our Values',  text:'Compassion, Integrity, Innovation, Excellence and Patient-First approach in everything we do.' },
          ].map(c => (
            <div key={c.title} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">{c.icon}</div>
              <div className="font-bold text-navy text-base mb-2">{c.title}</div>
              <div className="text-gray-500 text-sm leading-relaxed">{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">Our Senior Leadership</h2>
            <p className="section-sub mx-auto">Experienced leaders driving excellence in healthcare delivery.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map(m => (
              <div key={m.name} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full object-cover object-top mx-auto mb-3 border-3 border-brand-light"/>
                <div className="font-bold text-navy text-sm">{m.name}</div>
                <div className="text-brand text-xs font-semibold mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EmergencyStrip onBook={onBook} />
    </>
  )
}
