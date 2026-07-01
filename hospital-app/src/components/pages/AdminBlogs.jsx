import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Edit2, Trash2, FileText, Calendar, User, Tag, X } from 'lucide-react'
import axios from 'axios'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    publishDate: '',
    category: '',
    imageUrl: ''
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = () => {
    axios.get('http://localhost:8080/api/blogs')
      .then(res => {
        setBlogs(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching blogs:', err)
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
        await axios.put(`http://localhost:8080/api/blogs/${editingId}`, formData)
        alert('Blog updated successfully!')
      } else {
        await axios.post('http://localhost:8080/api/blogs', formData)
        alert('Blog added successfully!')
      }
      
      setFormData({ title: '', content: '', author: '', publishDate: '', category: '', imageUrl: '' })
      setShowForm(false)
      setEditingId(null)
      fetchBlogs()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save blog')
    }
  }

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      publishDate: blog.publishDate,
      category: blog.category,
      imageUrl: blog.imageUrl || ''
    })
    setEditingId(blog.id)
    setShowForm(true)
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/blogs/${id}`)
        alert('Blog deleted successfully!')
        fetchBlogs()
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to delete blog')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading blogs...</p>
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
              <h1 className="font-serif text-3xl font-bold">Manage Blogs</h1>
              <p className="text-white/70 mt-2">Create, edit, or delete blog posts</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setFormData({ title: '', content: '', author: '', publishDate: '', category: '', imageUrl: '' }) }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} /> Write New Blog
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-navy text-white p-6 rounded-t-2xl flex items-center justify-between sticky top-0">
                <h2 className="font-serif text-2xl font-bold">
                  {editingId ? 'Edit Blog Post' : 'Write New Blog'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-white/80 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="input" required placeholder="Understanding Neurological Disorders" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Author *</label>
                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="input" required placeholder="Dr. Rajesh Kumar" />
                  </div>
                  <div>
                    <label className="label">Category *</label>
                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="input" required placeholder="Neurology" />
                  </div>
                </div>

                <div>
                  <label className="label">Publish Date *</label>
                  <input type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="input" required />
                </div>

                <div>
                  <label className="label">Content *</label>
                  <textarea name="content" value={formData.content} onChange={handleInputChange} className="input resize-none h-48" required placeholder="Write your blog content here..."></textarea>
                </div>

                <div>
                  <label className="label">Image URL</label>
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="input" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn-primary justify-center">
                    {editingId ? 'Update Blog' : 'Publish Blog'} →
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blogs List */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-bold text-navy mb-2">No Blogs Yet</h3>
            <p className="text-gray-600 mb-6">Click "Write New Blog" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden">
                  {blog.imageUrl ? (
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="text-white" size={64} />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {blog.publishDate}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-navy mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.content}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <User size={14} />
                    {blog.author}
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, blog.title)}
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