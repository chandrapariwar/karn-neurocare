import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Edit2, Trash2, User, Phone, GraduationCap, Briefcase, X } from 'lucide-react'
import axios from 'axios'

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    qualification: '',
    experience: '',
    phone: '',
    imageUrl: ''
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = () => {
    axios.get('http://localhost:8080/api/doctors')
      .then(res => {
        setDoctors(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching doctors:', err)
        setLoading(false)
      })
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        // Update existing doctor
        await axios.put(`http://localhost:8080/api/doctors/${editingId}`, formData)
        alert('Doctor updated successfully!')
      } else {
        // Add new doctor
        await axios.post('http://localhost:8080/api/doctors', formData)
        alert('Doctor added successfully!')
      }
      
      // Form reset karo
      setFormData({ name: '', department: '', qualification: '', experience: '', phone: '', imageUrl: '' })
      setShowForm(false)
      setEditingId(null)
      fetchDoctors() // Refresh list
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save doctor')
    }
  }

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name,
      department: doctor.department,
      qualification: doctor.qualification,
      experience: doctor.experience,
      phone: doctor.phone,
      imageUrl: doctor.imageUrl || ''
    })
    setEditingId(doctor.id)
    setShowForm(true)
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/doctors/${id}`)
        alert('Doctor deleted successfully!')
        fetchDoctors()
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to delete doctor')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading doctors...</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">Manage Doctors</h1>
              <p className="text-white/70 mt-2">Add, edit, or remove doctors</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', department: '', qualification: '', experience: '', phone: '', imageUrl: '' }) }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} /> Add New Doctor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-navy text-white p-6 rounded-t-2xl flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">
                  {editingId ? 'Edit Doctor' : 'Add New Doctor'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-white/80 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input" required placeholder="Dr. John Doe" />
                </div>
                <div>
                  <label className="label">Department / Speciality *</label>
                  <input type="text" name="department" value={formData.department} onChange={handleInputChange} className="input" required placeholder="Neurology" />
                </div>
                <div>
                  <label className="label">Qualification *</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} className="input" required placeholder="MBBS, MD" />
                </div>
                <div>
                  <label className="label">Experience *</label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} className="input" required placeholder="10+ years" />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input" required placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="input" placeholder="https://example.com/photo.jpg" />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn-primary justify-center">
                    {editingId ? 'Update Doctor' : 'Add Doctor'} →
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Doctors List */}
        {doctors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <User className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-bold text-navy mb-2">No Doctors Yet</h3>
            <p className="text-gray-600 mb-6">Click "Add New Doctor" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-sky-400 to-navy flex items-center justify-center">
                  {doctor.imageUrl ? (
                    <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-white" size={64} />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-navy mb-1">{doctor.name}</h3>
                  <p className="text-sky-500 font-semibold text-sm mb-3">{doctor.department}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} />
                      {doctor.qualification}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} />
                      {doctor.experience}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {doctor.phone}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id, doctor.name)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
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