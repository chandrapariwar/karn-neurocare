import { useEffect, useState } from 'react'
import axios from 'axios'
import EmergencyStrip from '../layout/EmergencyStrip'

export default function Services({ onBook }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend se services fetch karo
    axios.get('http://localhost:8080/api/services')
      .then(response => {
        setServices(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching services:', error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="bg-navy py-14 px-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-white mb-3">Our Services</h1>
        <p className="text-white/65 text-base">Comprehensive healthcare services designed around your needs</p>
      </div>
      
      <section className="bg-navy py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full text-center text-white/60 py-10">
              Loading services...
            </div>
          ) : (
            services.map(s => (
              <div 
                key={s.id} 
                className="bg-white/6 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer" 
                onClick={onBook}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="font-bold text-white text-base mb-2">{s.name}</div>
                <div className="text-white/60 text-sm leading-relaxed">{s.description}</div>
                {s.price && (
                  <div className="mt-4 text-cyan-400 font-semibold">{s.price}</div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      
      <EmergencyStrip onBook={onBook} />
    </>
  )
}