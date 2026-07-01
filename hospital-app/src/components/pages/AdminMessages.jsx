import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Trash2, User, Phone, MessageSquare, Calendar, X } from 'lucide-react'
import axios from 'axios'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = () => {
    axios.get('http://localhost:8080/api/contact')
      .then(res => {
        // Sort by date (newest first)
        const sorted = res.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
        setMessages(sorted)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching messages:', err)
        setLoading(false)
      })
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete message from ${name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/contact/${id}`)
        alert('Message deleted successfully!')
        fetchMessages()
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to delete message')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading messages...</p>
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
          <h1 className="font-serif text-3xl font-bold">Contact Messages</h1>
          <p className="text-white/70 mt-2">View and manage all contact form submissions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-navy mb-1">{messages.length}</h3>
            <p className="text-gray-600 text-sm">Total Messages</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-green-600 mb-1">
              {messages.filter(m => new Date(m.createdAt) > new Date(Date.now() - 7*24*60*60*1000)).length}
            </h3>
            <p className="text-gray-600 text-sm">This Week</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl font-bold text-blue-600 mb-1">
              {messages.filter(m => new Date(m.createdAt) > new Date(Date.now() - 24*60*60*1000)).length}
            </h3>
            <p className="text-gray-600 text-sm">Today</p>
          </div>
        </div>

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Mail className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-bold text-navy mb-2">No Messages Yet</h3>
            <p className="text-gray-600">Messages from contact form will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                      <User className="text-sky-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-navy">{message.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(message.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(message.id, message.name)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-sky-500" />
                    {message.email || 'N/A'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-sky-500" />
                    {message.phone || 'N/A'}
                  </div>
                </div>

                {message.subject && (
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-navy mb-1">Subject:</p>
                    <p className="text-sm text-gray-700">{message.subject}</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}