import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, FileText, MessageSquare, TrendingUp } from 'lucide-react'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    doctors: 0,
    blogs: 0,
    messages: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Saare data fetch karo
    Promise.all([
      axios.get('http://localhost:8080/api/appointments'),
      axios.get('http://localhost:8080/api/doctors'),
      axios.get('http://localhost:8080/api/blogs'),
      axios.get('http://localhost:8080/api/contact')
    ]).then(([appointments, doctors, blogs, messages]) => {
      setStats({
        appointments: appointments.data.length,
        doctors: doctors.data.length,
        blogs: blogs.data.length,
        messages: messages.data.length
      })
      
      // Recent 5 appointments
      const sortedAppointments = appointments.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      setRecentAppointments(sortedAppointments)
      setLoading(false)
    }).catch(err => {
      console.error('Error fetching stats:', err)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/appointments" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-3xl font-bold text-navy mb-1">{stats.appointments}</h3>
            <p className="text-gray-600 text-sm">Total Appointments</p>
          </Link>

          <Link to="/admin/doctors" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-3xl font-bold text-navy mb-1">{stats.doctors}</h3>
            <p className="text-gray-600 text-sm">Total Doctors</p>
          </Link>

          <Link to="/admin/blogs" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-3xl font-bold text-navy mb-1">{stats.blogs}</h3>
            <p className="text-gray-600 text-sm">Blog Posts</p>
          </Link>

          <Link to="/admin/messages" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-orange-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-3xl font-bold text-navy mb-1">{stats.messages}</h3>
            <p className="text-gray-600 text-sm">Contact Messages</p>
          </Link>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">Recent Appointments</h2>
            <Link to="/admin/appointments" className="text-sky-500 hover:text-sky-600 font-semibold text-sm">
              View All →
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map(appointment => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{appointment.patientName}</td>
                      <td className="py-3 px-4 text-sm">{appointment.doctorName}</td>
                      <td className="py-3 px-4 text-sm">{appointment.appointmentDate}</td>
                      <td className="py-3 px-4 text-sm">{appointment.appointmentTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/doctors/new" className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl p-6 text-center transition-colors">
            <Users className="mx-auto mb-3" size={32} />
            <h3 className="font-bold text-lg mb-1">Add New Doctor</h3>
            <p className="text-white/80 text-sm">Register a new doctor</p>
          </Link>

          <Link to="/admin/blogs/new" className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-6 text-center transition-colors">
            <FileText className="mx-auto mb-3" size={32} />
            <h3 className="font-bold text-lg mb-1">Write New Blog</h3>
            <p className="text-white/80 text-sm">Publish health articles</p>
          </Link>

          <Link to="/admin/services" className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-6 text-center transition-colors">
            <TrendingUp className="mx-auto mb-3" size={32} />
            <h3 className="font-bold text-lg mb-1">Manage Services</h3>
            <p className="text-white/80 text-sm">Update hospital services</p>
          </Link>
        </div>
      </div>
    </div>
  )
}