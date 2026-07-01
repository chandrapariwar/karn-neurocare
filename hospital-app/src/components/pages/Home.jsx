import { useNavigate } from 'react-router-dom'
import { SPECIALITIES, DOCTORS, SERVICES, TESTIMONIALS, BLOG_POSTS, STATS } from '../../data'
import EmergencyStrip from '../layout/EmergencyStrip'

export default function Home({ onBook }) {
  const nav = useNavigate()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[580px] flex items-center justify-center text-center px-6 py-20 overflow-hidden bg-navy">
        <div className="absolute inset-0" style={{ backgroundImage:"url('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&w=1400')", backgroundSize:'cover', backgroundPosition:'center', opacity:0.12 }}/>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
            🏆 Leading Neuro & Maternity Care in Muzaffarpur
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            World-Class Care,<br /><span className="text-accent">Compassionate</span> Healing
          </h1>
          <p className="text-lg text-white/72 leading-relaxed mb-8 max-w-xl mx-auto">
            500+ specialist doctors. Cutting-edge technology. Personalised care that puts you first — because your health is our highest priority.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={onBook} className="btn-primary text-base px-8 py-3.5">📅 Book Appointment</button>
            <button onClick={() => nav('/about')} className="btn-outline text-base px-8 py-3.5">Learn More →</button>
          </div>
          <div className="flex justify-center gap-10 mt-12 pt-10 border-t border-white/12 flex-wrap">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/55 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK BOOK BANNER */}
      <div className="bg-white shadow-xl shadow-black/10 mx-4 md:mx-10 -mt-8 relative z-10 rounded-2xl px-6 py-5 flex gap-4 flex-wrap items-end">
        {[['Speciality','select',['Cardiology','Neurology','Orthopedics','Oncology','Pediatrics']],
          ['Date','date',[]],
          ['Time Slot','select',['09:00 AM','10:00 AM','11:00 AM','02:00 PM','03:00 PM','04:00 PM']]].map(([label, type, opts]) => (
          <div key={label} className="flex-1 min-w-[140px]">
            <label className="label">{label}</label>
            {type === 'date'
              ? <input type="date" className="input" min={new Date().toISOString().split('T')[0]} />
              : <select className="input"><option value="">Select {label}</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
            }
          </div>
        ))}
        <button onClick={onBook} className="btn-primary">Find Appointment</button>
      </div>

      {/* SPECIALITIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-tag">Our Specialities</span>
          <h2 className="section-title">Comprehensive Medical Expertise</h2>
          <p className="section-sub mx-auto">World-class specialists across 20+ departments delivering evidence-based care.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPECIALITIES.slice(0, 8).map(s => (
            <div key={s.name} onClick={() => nav('/specialities')}
              className="bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand/10 hover:border-blue-100 transition-all duration-200">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-bold text-navy text-sm mb-1.5">{s.name}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{s.desc.slice(0, 60)}...</div>
              <div className="text-brand text-xs font-semibold mt-3">Learn more →</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => nav('/specialities')} className="btn-primary">View All 20+ Specialities →</button>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden">
            <img src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&w=700" alt="Hospital" className="w-full h-96 object-cover rounded-2xl"/>
            <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center text-xl">🏆</div>
              <div>
                <div className="font-black text-brand text-base">NABL Accredited</div>
                <div className="text-gray-500 text-xs">25 years of excellence</div>
              </div>
            </div>
          </div>
          <div>
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Healthcare You Can Trust, Every Time</h2>
            <p className="section-sub mb-6">We combine advanced medical science with genuine human care — because you deserve nothing less.</p>
            <div className="space-y-5">
              {[
                { icon:'🔬', h:'Advanced Technology', p:'Latest MRI, Robotic Surgery, AI diagnostics and minimally invasive procedures.' },
                { icon:'👨‍⚕️', h:'Expert Multidisciplinary Teams', p:'500+ specialists collaborate for holistic treatment of complex cases.' },
                { icon:'🛡️', h:'Patient Safety First', p:'Zero-tolerance infection control and continuous round-the-clock monitoring.' },
                { icon:'❤️', h:'Compassionate Care', p:'We treat every patient like family — with empathy, dignity and respect.' },
              ].map(w => (
                <div key={w.h} className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-brand-light rounded-xl flex items-center justify-center text-xl shrink-0">{w.icon}</div>
                  <div><h4 className="font-bold text-navy text-sm mb-1">{w.h}</h4><p className="text-gray-500 text-sm leading-relaxed">{w.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.9)'}}>Our Services</span>
            <h2 className="section-title text-white">Everything Your Health Needs</h2>
            <p className="section-sub text-white/60 mx-auto">Comprehensive services designed around you — from emergency to preventive wellness.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0,6).map(s => (
              <div key={s.title} onClick={() => nav('/services')}
                className="bg-white/6 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="font-bold text-white text-base mb-2">{s.title}</div>
                <div className="text-white/60 text-sm leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => nav('/services')} className="btn-outline">View All Services →</button>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-tag">Our Experts</span>
          <h2 className="section-title">Meet Our Top Doctors</h2>
          <p className="section-sub mx-auto">Nationally recognised specialists with decades of expertise dedicated to your recovery.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.map(d => (
            <div key={d.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200">
              <img src={d.img} alt={d.name} className="w-full h-52 object-cover object-top"/>
              <div className="p-5">
                <div className="font-bold text-navy text-base">{d.name}</div>
                <div className="text-brand text-xs font-semibold mt-1">{d.spec}</div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-500">Exp: {d.exp}</span>
                  <span className="text-yellow-500 font-bold">★ {d.rating}</span>
                </div>
              </div>
              <button onClick={onBook} className="w-full py-3 bg-brand-light text-brand font-semibold text-sm hover:bg-brand hover:text-white transition-colors">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Patient Stories</span>
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-sub mx-auto">Real stories from real patients who trusted us with their health journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="text-yellow-400 text-lg mb-4">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-500 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                  <div><div className="font-bold text-navy text-sm">{t.name}</div><div className="text-gray-400 text-xs">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY */}
      <EmergencyStrip onBook={onBook} />

      {/* BLOG */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-tag">Health Blog</span>
          <h2 className="section-title">Health Tips & Medical News</h2>
          <p className="section-sub mx-auto">Stay informed with the latest health insights from our expert doctors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0,3).map(b => (
            <div key={b.title} onClick={() => nav('/blog')}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer">
              <img src={b.img} alt={b.title} className="w-full h-44 object-cover"/>
              <div className="p-5">
                <span className="text-[10px] font-bold bg-brand-light text-brand px-2.5 py-1 rounded-full uppercase tracking-wider">{b.tag}</span>
                <div className="font-bold text-navy text-sm leading-snug mt-2 mb-2">{b.title}</div>
                <div className="text-gray-400 text-xs">📅 {b.date} · {b.author}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => nav('/blog')} className="btn-primary">View All Articles →</button>
        </div>
      </section>
    </>
  )
}
