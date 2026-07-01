import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = () => {
    axios.get('http://localhost:8080/api/appointments')
      .then(res => {
        // Sort by date (newest first)
        const sorted = res.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
        setAppointments(sorted)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching appointments:', err)
        setLoading(false)
      })
  }

  const updateStatus = (id, newStatus) => {
    axios.patch(`http://localhost:8080/api/appointments/${id}/status`, { status: newStatus })
      .then(() => {
        // Update local state
        setAppointments(appointments.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ))
        alert(`Appointment ${newStatus.toLowerCase()} successfully!`)
      })
      .catch(err => {
        console.error('Error updating status:', err)
        alert('Failed to update status')
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading appointments...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/admin" className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold">Manage Appointments</h1>
          <p className="text-white/70 mt-2">View and manage all appointment requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-navy mb-1">
              {appointments.filter(a => a.status === 'PENDING').length}
            </h3>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-green-600 mb-1">
              {appointments.filter(a => a.status === 'CONFIRMED').length}
            </h3>
            <p className="text-gray-600 text-sm">Confirmed</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-red-600 mb-1">
              {appointments.filter(a => a.status === 'CANCELLED').length}
            </h3>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-navy mb-1">
              {appointments.length}
            </h3>
            <p className="text-gray-600 text-sm">Total</p>
          </div>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-bold text-navy mb-2">No Appointments Yet</h3>
            <p className="text-gray-600">New appointments will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                      <User size={20} className="text-sky-500" />
                      {appointment.patientName}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        {appointment.patientEmail || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        {appointment.patientPhone}
                      </div>
                    </div>

                    {appointment.symptoms && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm font-semibold text-navy mb-1 flex items-center gap-2">
                          <FileText size={16} />
                          Symptoms:
                        </p>
                        <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>
                        <p className="font-semibold text-navy">{appointment.doctorName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Speciality</p>
                        <p className="font-semibold text-navy">{appointment.speciality || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-navy flex items-center gap-1">
                          <Calendar size={14} />
                          {appointment.appointmentDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="font-semibold text-navy flex items-center gap-1">
                          <Clock size={14} />
                          {appointment.appointmentTime}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Status</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appointment.status === 'CONFIRMED' && <CheckCircle size={14} />}
                        {appointment.status === 'CANCELLED' && <XCircle size={14} />}
                        {appointment.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    {appointment.status === 'PENDING' && (
                      <div className="flex gap-2 pt-3">
                        <button
                          onClick={() => updateStatus(appointment.id, 'CONFIRMED')}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={16} />
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, 'CANCELLED')}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}