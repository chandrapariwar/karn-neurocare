import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function Contact({ onBook }) {
  const [form, setForm] = useState({ fname:'', lname:'', email:'', phone:'', subject:'', msg:'' })
  const [status, setStatus] = useState({ loading: false, sent: false, error: false, message: '' })

  const submit = async (e) => {
    e.preventDefault()
    
    if (!form.fname || !form.phone) {
      return alert('Please fill name and phone.')
    }

    setStatus({ loading: true, sent: false, error: false, message: '' })

    try {
      // Native fetch API - no axios needed!
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${form.fname} ${form.lname}`.trim(),
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.msg
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Success
        setStatus({ loading: false, sent: true, error: false, message: data.message || 'Message sent successfully!' })
        setForm({ fname:'', lname:'', email:'', phone:'', subject:'', msg:'' })
      } else {
        // Backend se error aaya
        setStatus({ loading: false, sent: false, error: true, message: data.message || 'Failed to send message.' })
      }
      
    } catch (error) {
      // Network error
      console.error('Contact form error:', error)
      setStatus({ 
        loading: false, 
        sent: false, 
        error: true, 
        message: 'Network error. Please check if backend is running.'
      })
    }
    
    setTimeout(() => setStatus({ loading: false, sent: false, error: false, message: '' }), 5000)
  }

  return (
    <>
      <div className="bg-navy py-14 px-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-white/65 text-base">We're here 24/7 — reach out for appointments, emergencies or general enquiries</p>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="space-y-6">
            <div>
              <span className="section-tag">Get In Touch</span>
              <h2 className="section-title" style={{fontSize:'28px'}}>We'd Love to Hear From You</h2>
              <p className="section-sub text-sm">Our team is available 24/7 for appointments, emergencies, queries and feedback.</p>
            </div>
            {[
              { icon:<MapPin size={18} className="text-brand"/>, label:'Address',            val:'Brahmapura, Muzaffarpur, Brahmpura, Bihar 842003, (Bihar) India' },
              { icon:<Phone size={18} className="text-danger"/>, label:'Emergency (24/7)',   val:'1800-KARN-NEURO (Toll Free)', red:true },
              { icon:<Phone size={18} className="text-brand"/>, label:'Appointments',        val:'+91 11 4000 5000' },
              { icon:<Mail size={18} className="text-brand"/>,  label:'Email',               val:'info@karnneurocare.com' },
              { icon:<Clock size={18} className="text-brand"/>, label:'OPD Timings',         val:'Mon–Sat: 8 AM – 8 PM · Sun: 9 AM – 2 PM' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{item.label}</div>
                  <div className={`font-semibold text-sm ${item.red ? 'text-danger' : 'text-navy'}`}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-bold text-navy text-lg mb-6">Send Us a Message</h3>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">First Name *</label><input className="input" placeholder="Anil" value={form.fname} onChange={e=>setForm({...form,fname:e.target.value})}/></div>
                <div><label className="label">Last Name</label><input className="input" placeholder="Sharma" value={form.lname} onChange={e=>setForm({...form,lname:e.target.value})}/></div>
              </div>
              <div><label className="label">Email</label><input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div><label className="label">Phone *</label><input className="input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div>
                <label className="label">Subject</label>
                <select className="input" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                  <option value="">Select Subject</option>
                  {['Book Appointment','General Enquiry','Feedback','Emergency','Corporate / Insurance'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div><label className="label">Message</label><textarea className="input resize-none h-24" placeholder="How can we help you?" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
              
              <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
                {status.loading ? 'Sending...' : 'Send Message →'}
              </button>
              
              {status.sent && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl p-3 text-sm font-semibold">
                  <CheckCircle size={16}/> {status.message}
                </div>
              )}
              
              {status.error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-xl p-3 text-sm font-semibold">
                  ❌ {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}