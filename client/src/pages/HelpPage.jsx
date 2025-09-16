import { useState } from 'react';
import { Link } from 'react-router-dom';

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'Semua', icon: '📋' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Akun', icon: '👤' },
    { id: 'chat', name: 'Chat & Pesan', icon: '💬' },
    { id: 'privacy', name: 'Privasi & Keamanan', icon: '🔒' },
    { id: 'technical', name: 'Masalah Teknis', icon: '⚙️' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'Bagaimana cara mulai menggunakan Guyu Chat?',
      answer: 'Sangat mudah! Klik "Mulai Chat Sekarang" di halaman utama, buat akun dengan email dan password, lalu langsung bisa mulai chat. Atau gunakan login Google/Facebook untuk lebih cepat.',
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Apakah Guyu Chat gratis?',
      answer: 'Ya, 100% gratis! Semua fitur utama seperti chat pribadi, public chat, dan keamanan end-to-end tersedia tanpa biaya. Tidak ada hidden cost atau premium features.',
    },
    {
      id: 3,
      category: 'account',
      question: 'Lupa password, bagaimana cara reset?',
      answer: 'Di halaman login, klik "Forgot Password", masukkan email Anda, dan kami akan kirim link reset password. Cek inbox dan spam folder email Anda.',
    },
    {
      id: 4,
      category: 'account',
      question: 'Bagaimana cara mengganti nama profil?',
      answer: 'Saat ini fitur edit profil masih dalam pengembangan. Untuk sementara, silakan hubungi support jika perlu mengganti informasi profil.',
    },
    {
      id: 5,
      category: 'chat',
      question: 'Apa perbedaan public chat dan private chat?',
      answer: 'Public chat bisa dilihat semua pengguna online, seperti group chat terbuka. Private chat hanya antara Anda dan satu orang lain, lebih privat dan aman.',
    },
    {
      id: 6,
      category: 'chat',
      question: 'Pesan tidak terkirim, kenapa?',
      answer: 'Cek koneksi internet Anda. Jika masih bermasalah, coba refresh halaman atau logout-login lagi. Pastikan juga browser Anda support WebSocket.',
    },
    {
      id: 7,
      category: 'chat',
      question: 'Bagaimana cara tahu seseorang sedang online?',
      answer: 'Di sidebar private chat, ada indikator hijau di samping nama pengguna yang sedang online. Status online diupdate real-time.',
    },
    {
      id: 8,
      category: 'privacy',
      question: 'Seberapa aman chat di Guyu Chat?',
      answer: 'Sangat aman! Semua pesan dienkripsi end-to-end dengan algoritma AES-256. Bahkan admin kami tidak bisa membaca pesan Anda. Data disimpan minimal dan tidak dijual ke pihak ketiga.',
    },
    {
      id: 9,
      category: 'privacy',
      question: 'Apakah admin bisa baca pesan saya?',
      answer: 'Tidak! Semua pesan dienkripsi end-to-end sebelum dikirim ke server. Yang tersimpan di server hanya data terenkripsi yang tidak bisa dibaca siapapun kecuali penerima pesan.',
    },
    {
      id: 10,
      category: 'technical',
      question: 'Browser apa saja yang didukung?',
      answer: 'Guyu Chat bekerja optimal di Chrome, Firefox, Safari, dan Edge versi terbaru. Pastikan browser Anda support WebSocket untuk chat real-time.',
    },
    {
      id: 11,
      category: 'technical',
      question: 'Kenapa chat lambat atau sering disconnect?',
      answer: 'Biasanya masalah koneksi internet. Coba refresh halaman, cek koneksi WiFi/data, atau ganti browser. Jika masih bermasalah, hubungi support kami.',
    },
    {
      id: 12,
      category: 'account',
      question: 'Bagaimana cara hapus akun?',
      answer: 'Kirim email ke support@guyuchat.com dengan subjek "Delete Account" beserta email akun yang ingin dihapus. Kami akan proses dalam 24 jam dan konfirmasi via email.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6">
              Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Center</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Butuh bantuan? Cari jawaban cepat untuk pertanyaan umum atau hubungi support kami!</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jawaban di sini..."
                className="w-full px-6 py-4 pr-12 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-lg"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6 text-cyan-300">Kategori</h2>
                <div className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left ${
                        activeCategory === category.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Tidak ada hasil</h3>
                  <p className="text-gray-500">Coba kata kunci yang berbeda atau pilih kategori lain.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mb-6">
                    <p className="text-gray-400">
                      Menampilkan {filteredFaqs.length} dari {faqs.length} pertanyaan
                      {searchQuery && <span className="ml-2 text-cyan-400">untuk "{searchQuery}"</span>}
                    </p>
                  </div>

                  {filteredFaqs.map((faq) => (
                    <details key={faq.id} className="group bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                      <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-700/30 transition-colors">
                        <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                        <div className="text-2xl text-cyan-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="text-gray-300 leading-relaxed bg-gray-900/30 rounded-xl p-4">{faq.answer}</div>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Still Need Help Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Masih Butuh Bantuan?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Jika tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim support kami. Kami siap membantu 24/7!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@guyuchat.com" className="px-8 py-3 border border-cyan-500/30 rounded-xl font-semibold text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300">
                Email Langsung
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>Help Center Guyu Chat • Updated regularly with new FAQs and guides</p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
