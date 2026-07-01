import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Calendar, User, Clock, Phone, MapPin, Stethoscope, DollarSign, ChevronRight } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      setMessages([
        { type: 'bot', text: 'Hello! Welcome to Karn Neurocare. How can I help you today?' }
      ])
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Quick Reply Buttons
  const quickReplies = [
    { icon: <Calendar size={16} />, text: 'Book Appointment', query: 'I want to book an appointment' },
    { icon: <User size={16} />, text: 'Our Doctors', query: 'Tell me about doctors' },
    { icon: <Clock size={16} />, text: 'Timings', query: 'What are your timings?' },
    { icon: <Phone size={16} />, text: 'Emergency', query: 'Emergency contact number' },
    { icon: <Stethoscope size={16} />, text: 'Services', query: 'What services do you offer?' },
    { icon: <DollarSign size={16} />, text: 'Consultation Fees', query: 'What are the consultation fees?' },
  ]

  const handleQuickReply = (query) => {
    handleSendMessage(query)
    setShowQuickReplies(true)
  }

  // Bot response logic
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()

    // Appointment related
    if (msg.includes('appointment') || msg.includes('book')) {
      return {
        text: 'Great! I can help you book an appointment. You have two options:\n\n1. Click the "Book Appointment" button in the navigation bar above\n2. Tell me your preferred date and time, and I\'ll note it down\n\nWould you like to know about our available doctors first?',
        showQuickReplies: true
      }
    }

    // Doctor related
    if (msg.includes('doctor') || msg.includes('neurologist') || msg.includes('specialist')) {
      return {
        text: 'We have expert doctors in various specialties:\n\n **Neurology** - Dr. Ashu Karn, Dr. Deepak Karn\n❤️ **Cardiology** - Dr. Priya Sharma\n🦴 **Orthopedic** - Dr. Rajesh Kumar\n👶 **Pediatrics** - Dr. Sunita Singh\n\nAll our doctors are highly experienced and certified.',
        showQuickReplies: true
      }
    }

    // Emergency
    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('critical')) {
      return {
        text: '🚨 **EMERGENCY CONTACT**\n\n📞 Toll Free: 1800-KARN-NEURO\n📞 Direct: +91 11 4000 5000\n\nOur emergency services are available **24/7**. Please call immediately for urgent medical assistance.',
        showQuickReplies: true
      }
    }

    // Timing/Hours
    if (msg.includes('time') || msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('timing')) {
      return {
        text: '🕐 **OUR TIMINGS**\n\n📅 **OPD Hours:**\nMonday - Saturday: 8 AM - 8 PM\nSunday: 9 AM - 2 PM\n\n🚨 **Emergency:** 24/7 Available\n\n🏥 **Pharmacy:** 24/7 Available',
        showQuickReplies: true
      }
    }

    // Services
    if (msg.includes('service') || msg.includes('treatment') || msg.includes('offer') || msg.includes('facility')) {
      return {
        text: '🏥 **OUR SERVICES**\n\n✅ Neurology & Neurosurgery\n✅ Cardiology & Cardiac Surgery\n✅ Orthopedics & Joint Replacement\n✅ Pediatrics & Neonatal Care\n✅ Emergency & Trauma Care\n✅ Diagnostic Services (CT, MRI, X-Ray)\n✅ ICU & Critical Care\n✅ Physiotherapy & Rehabilitation\n\nVisit our Services page for detailed information.',
        showQuickReplies: true
      }
    }

    // Location/Address
    if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('reach')) {
      return {
        text: '📍 **OUR LOCATION**\n\nKarn Neurocare & Maternity Hospital\nBrahmapura, Muzaffarpur\nBrahmpura, Bihar 842003\nIndia\n\n🗺️ We are easily accessible from all parts of the city.',
        showQuickReplies: true
      }
    }

    // Contact
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('number') || msg.includes('call') || msg.includes('email')) {
      return {
        text: '📞 **CONTACT INFORMATION**\n\n🏥 Emergency: 1800-KARN-NEURO (Toll Free)\n📱 Appointments: +91 11 4000 5000\n✉️ Email: info@karnneurocare.com\n🌐 Website: www.karnneurocare.com\n\nWe\'re here to help!',
        showQuickReplies: true
      }
    }

    // Fees/Cost
    if (msg.includes('fee') || msg.includes('cost') || msg.includes('price') || msg.includes('charge') || msg.includes('consultation')) {
      return {
        text: '💰 **CONSULTATION FEES**\n\n👨‍⚕️ General Consultation: ₹500\n👨‍⚕️ Specialist Consultation: ₹1000 - ₹2000\n🏥 Emergency Visit: ₹800\n\n💳 We accept:\n- Cash\n- Cards\n- UPI\n- Insurance (Cashless available)\n\nFor exact pricing, please book an appointment.',
        showQuickReplies: true
      }
    }

    // Insurance
    if (msg.includes('insurance') || msg.includes('cashless') || msg.includes('claim')) {
      return {
        text: '🏥 **INSURANCE & CASHLESS**\n\n✅ We accept all major health insurance providers\n✅ Cashless treatment available\n✅ TPA desk available for claim assistance\n\nPlease bring your insurance card and ID proof at the time of visit.',
        showQuickReplies: true
      }
    }

    // Greeting
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('namaste')) {
      return {
        text: 'Hello! Welcome to Karn Neurocare. I\'m here to help you with:\n\n• Booking appointments\n• Doctor information\n• Services & facilities\n• Timings & contact details\n• Any other queries\n\nHow can I assist you today?',
        showQuickReplies: true
      }
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thankyou')) {
      return {
        text: 'You\'re most welcome! 😊\n\nIs there anything else I can help you with? Feel free to ask anytime.\n\nFor immediate assistance, you can also call us at 1800-KARN-NEURO.',
        showQuickReplies: true
      }
    }

    // Goodbye
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
      return {
        text: 'Goodbye! Take care and stay healthy! 👋\n\nIf you need any assistance in the future, feel free to reach out. We\'re always here for you.\n\n🏥 Karn Neurocare - Your Health, Our Priority',
        showQuickReplies: false
      }
    }

    // Default response
    return {
      text: `I understand you're asking about "${userMessage}".\n\nFor detailed information, you can:\n\n1. Visit our website pages (About, Services, Doctors)\n2. Call us at 1800-KARN-NEURO\n3. Book an appointment online\n\nIs there anything specific you'd like to know?`,
      showQuickReplies: true
    }
  }

  const handleSendMessage = (text = input) => {
    if (!text.trim()) return

    // Add user message
    const userMsg = { type: 'user', text: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])

    // Get bot response
    setTimeout(() => {
      const response = getBotResponse(text)
      const botMsg = { 
        type: 'bot', 
        text: response.text, 
        timestamp: new Date().toISOString() 
      }
      setMessages(prev => [...prev, botMsg])
      setShowQuickReplies(response.showQuickReplies !== false)
    }, 500)

    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear chat history?')) {
      localStorage.removeItem('chatHistory')
      setMessages([
        { type: 'bot', text: 'Hello! Welcome to Karn Neurocare. How can I help you today?', timestamp: new Date().toISOString() }
      ])
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-4 shadow-lg transition-all z-50 ${isOpen ? 'hidden' : 'flex items-center gap-2'}`}
      >
        <MessageCircle size={24} />
        <span className="font-semibold">Chat with us</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-navy text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">Karn Neurocare Assistant</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="text-white/60 hover:text-white text-xs"
                title="Clear Chat"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-sky-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          {showQuickReplies && (
            <div className="p-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Quick Replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.query)}
                    className="flex items-center gap-1 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    {reply.icon}
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              🚨 For emergencies, call <strong>1800-KARN-NEURO</strong>
            </p>
          </div>
        </div>
      )}
    </>
  )
}