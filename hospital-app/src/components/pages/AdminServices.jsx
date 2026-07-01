import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Edit2, Trash2, Settings, X } from 'lucide-react'
import axios from 'axios'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    price: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = () => {
    axios.get('http://localhost:8080/api/services')
      .then(res => {
        setServices(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching services:', err)
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
        await axios.put(`http://localhost:8080/api/services/${editingId}`, formData)
        alert('Service updated successfully!')
      } else {
        await axios.post('http://localhost:8080/api/services', formData)
        alert('Service added successfully!')
      }
      
      setFormData({ name: '', description: '', icon: '', price: '' })
      setShowForm(false)
      setEditingId(null)
      fetchServices()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save service')
    }
  }

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
      price: service.price
    })
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/services/${id}`)
        alert('Service deleted successfully!')
        fetchServices()
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to delete service')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading services...</p>
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
              <h1 className="font-serif text-3xl font-bold">Manage Services</h1>
              <p className="text-white/70 mt-2">Add, edit, or remove hospital services</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', description: '', icon: '', price: '' }) }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} /> Add New Service
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full">
              <div className="bg-navy text-white p-6 rounded-t-2xl flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-white/80 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Service Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input" required placeholder="Cardiology" />
                </div>
                
                <div>
                  <label className="label">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="input resize-none h-24" required placeholder="Heart checkup & treatment"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Icon (Emoji)</label>
                    <input type="text" name="icon" value={formData.icon} onChange={handleInputChange} className="input" placeholder="❤️" />
                  </div>
                  <div>
                    <label className="label">Price</label>
                    <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="input" placeholder="₹1500" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn-primary justify-center">
                    {editingId ? 'Update Service' : 'Add Service'} →
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services List */}
        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Settings className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-bold text-navy mb-2">No Services Yet</h3>
            <p className="text-gray-600 mb-6">Click "Add New Service" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4 text-center">{service.icon}</div>
                <h3 className="font-bold text-lg text-navy mb-2 text-center">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{service.description}</p>
                
                {service.price && (
                  <div className="text-center mb-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {service.price}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id, service.name)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}