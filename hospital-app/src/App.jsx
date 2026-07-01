import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BookingModal from './components/ui/BookingModal'
import Chatbot from './components/ui/Chatbot'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Specialities from './components/pages/Specialities'
import Doctors from './components/pages/Doctors'
import Services from './components/pages/Services'
import Blog from './components/pages/Blog'
import Contact from './components/pages/Contact'
import AdminDashboard from './components/pages/AdminDashboard'
import AdminAppointments from './components/pages/AdminAppointments'
import AdminDoctors from './components/pages/AdminDoctors'
import AdminBlogs from './components/pages/AdminBlogs'
import AdminServices from './components/pages/AdminServices'
import AdminMessages from './components/pages/AdminMessages'
import AdminLogin from './components/pages/AdminLogin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openBook = () => setModalOpen(true)

  return (
    <>
      <ScrollToTop />
      <Navbar onBook={openBook} />

      <Routes>
        <Route path="/"            element={<Home         onBook={openBook} />} />
        <Route path="/about"       element={<About        onBook={openBook} />} />
        <Route path="/specialities" element={<Specialities onBook={openBook} />} />
        <Route path="/doctors"     element={<Doctors      onBook={openBook} />} />
        <Route path="/services"    element={<Services     onBook={openBook} />} />
        <Route path="/blog"        element={<Blog onBook={openBook} />} />
        <Route path="/contact"     element={<Contact      onBook={openBook} />} />
        <Route path="/admin"       element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/admin/doctors/new" element={<AdminDoctors />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/admin/blogs/new" element={<AdminBlogs />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="*"            element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
            <div className="text-6xl mb-4">🏥</div>
            <h1 className="font-serif text-3xl font-bold text-navy mb-3">Page Not Found</h1>
            <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
            <a href="/" className="btn-primary">Go to Home →</a>
          </div>
        } />
      </Routes>

      <Footer onBook={openBook} />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Chatbot />
    </>
  )
}