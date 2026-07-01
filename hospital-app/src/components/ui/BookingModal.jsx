import { useState, useEffect } from 'react'
import { X, Calendar, Clock, User, Phone, Mail, FileText } from 'lucide-react'
import axios from 'axios'

export default function BookingModal({ open, onClose }) {
  const [doctors, setDoctors] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorName: '',
    speciality: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: ''
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: false, message: '' })

  // Doctors aur Specialities fetch karo
  useEffect(() => {
    if (open) {
      // Doctors fetch karo
      axios.get('http://localhost:8080/api/doctors')
        .then(res => setDoctors(res.data))
        .catch(err => console.error('Error fetching doctors:', err))

      // Specialities fetch karo
      axios.get('http://localhost:8080/api/specialities')
        .then(res => setSpecialities(res.data))
        .catch(err => console.error('Error fetching specialities:', err))
    }
  }, [open])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.patientName || !formData.patientPhone || !formData.doctorName || !formData.appointmentDate || !formData.appointmentTime) {
      setStatus({ loading: false, success: false, error: true, message: 'Please fill all required fields!' })
      setTimeout(() => setStatus({ loading: false, success: false, error: false, message: '' }), 3000)
      return
    }

    setStatus({ loading: true, success: false, error: false, message: '' })

    try {
      const response = await axios.post('http://localhost:8080/api/appointments', {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        doctorName: formData.doctorName,
        speciality: formData.speciality,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        symptoms: formData.symptoms
      })

      console.log('Response:', response)  // Debug ke liye

      // ✅ Success - direct status check karo
      if (response.status === 200 || response.status === 201) {
        setStatus({ 
          loading: false, 
          success: true, 
          error: false, 
          message: 'Appointment booked successfully! We will confirm shortly.' 
        })
        // Form reset karo
        setFormData({
          patientName: '',
          patientEmail: '',
          patientPhone: '',
          doctorName: '',
          speciality: '',
          appointmentDate: '',
          appointmentTime: '',
          symptoms: ''
        })
        // 3 second baad modal band karo
        setTimeout(() => {
          onClose()
          setStatus({ loading: false, success: false, error: false, message: '' })
        }, 3000)
      }
    } catch (error) {
      console.error('Booking error:', error)
      setStatus({ 
        loading: false, 
        success: false, 
        error: true, 
        message: error.response?.data?.message || 'Failed to book appointment. Please try again.'
      })
      setTimeout(() => setStatus({ loading: false, success: false, error: false, message: '' }), 3000)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="bg-navy text-white p-6 rounded-t-2xl">
          <h2 className="font-serif text-2xl font-bold mb-2">Book an Appointment</h2>
          <p className="text-white/70 text-sm">Fill in your details to schedule a consultation</p>
        </div>

        {/* Success Message */}
        {status.success && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-semibold">✅ {status.message}</p>
          </div>
        )}

        {/* Error Message */}
        {status.error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold">❌ {status.message}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Patient Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-navy text-lg flex items-center gap-2">
              <User size={20} /> Patient Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  className="input"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleChange}
                className="input"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-navy text-lg flex items-center gap-2">
              <Calendar size={20} /> Appointment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Speciality</label>
                <select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Speciality</option>
                  {specialities.map(spec => (
                    <option key={spec.id} value={spec.name}>{spec.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Doctor *</label>
                <select
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.name}>{doc.name} - {doc.speciality}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Appointment Date *</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="label">Appointment Time *</label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-navy text-lg flex items-center gap-2">
              <FileText size={20} /> Symptoms (Optional)
            </h3>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="input resize-none h-24"
              placeholder="Describe your symptoms briefly..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className="btn-primary w-full justify-center disabled:bg-gray-400"
          >
            {status.loading ? 'Booking...' : 'Book Appointment →'}
          </button>
        </form>
      </div>
    </div>
  )
}