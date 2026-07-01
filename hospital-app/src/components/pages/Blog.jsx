import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Blog({ onBook }) {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs')
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  // Full blog post view
  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <img 
            src={selectedBlog.imageUrl} 
            alt={selectedBlog.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8 md:p-12">
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-6 text-sky-500 hover:text-sky-600 font-semibold flex items-center gap-2"
            >
              ← Back to All Posts
            </button>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-semibold">
                {selectedBlog.category}
              </span>
              <span>📅 {new Date(selectedBlog.publishDate).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>✍️ {selectedBlog.author}</span>
            </div>

            <h1 className="font-serif text-4xl font-bold text-navy mb-6">
              {selectedBlog.title}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedBlog.content}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={onBook}
                className="btn-primary w-full md:w-auto"
              >
                Book Appointment →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Blog listing view
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expert advice, tips, and insights to help you live a healthier life
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
              onClick={() => setSelectedBlog(blog)}
            >
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-semibold">
                    {blog.category}
                  </span>
                  <span>📅 {new Date(blog.publishDate).toLocaleDateString('en-IN')}</span>
                </div>

                <h2 className="text-2xl font-bold text-navy mb-3 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {blog.content.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-gray-700 font-semibold">
                    ✍️ {blog.author}
                  </span>
                  <button className="text-sky-500 hover:text-sky-600 font-semibold flex items-center gap-2">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Have Questions About Your Health?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert doctors are here to help. Book an appointment today and take the first step towards better health.
          </p>
          <button
            onClick={onBook}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Book Appointment Now →
          </button>
        </div>
      </div>
    </div>
  );
}