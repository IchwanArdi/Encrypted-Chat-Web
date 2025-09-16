import { useState } from 'react';
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Ada pertanyaan, saran, atau butuh bantuan? Kami di sini untuk membantu! Tim support kami siap melayani 24/7.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-300">Kirim Pesan</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-300 mb-2">Pesan Terkirim!</h3>
                  <p className="text-gray-300">Terima kasih! Kami akan membalas dalam 24 jam.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-orange-400 hover:text-orange-300 underline">
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
                        Nama
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3">
                      Subjek
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="">Pilih Subjek</option>
                      <option value="Pertanyaan">Pertanyaan</option>
                      <option value="Saran">Saran</option>
                      <option value="Bantuan">Bantuan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 text-white shadow-lg shadow-orange-500/20 ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center items-start space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-300">Email</p>
                  <a href="mailto:support@guyuchat.com" className="text-gray-200 hover:text-orange-400 transition-colors">
                    support@guyuchat.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-300">WhatsApp</p>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-orange-400 transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-300">Website</p>
                  <a href="https://guyuchat.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-orange-400 transition-colors">
                    www.guyuchat.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
