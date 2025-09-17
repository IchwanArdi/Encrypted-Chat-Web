import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function AboutPage() {
  return (
    <>
      <SEO
        title="Tentang Guyu Chat | Guyu Chat"
        description="Kenali lebih dekat Guyu Chat: misi, visi, cerita di balik pengembangannya, dan tim yang berkomitmen menghadirkan platform chat aman, privat, dan bebas drama."
        keywords="tentang guyu chat, about, misi, visi, tim, privasi, chat aman, chat privat, indonesia"
        type="article"
        additionalMetaTags={[
          { name: 'theme-color', content: '#1e293b' },
          { name: 'application-name', content: 'Guyu Chat' },
        ]}
      />

      <div className="min-h-screen pt-20 w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        {/* Main Content */}
        <div className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-black mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Guyu Chat</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Platform chat yang dibuat dengan satu misi: memberikan ruang komunikasi yang aman, privat, dan bebas drama untuk semua orang.</p>
            </div>

            {/* Story Section */}
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">Cerita di Balik Guyu Chat</h2>
              <div className="prose prose-gray prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Guyu Chat lahir dari frustrasi sederhana: kenapa platform chat yang ada sekarang selalu ribet, lambat, atau bikin khawatir soal privasi? Kami percaya bahwa berkomunikasi harusnya mudah, cepat, dan yang paling penting -
                  aman.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">Dimulai sebagai proyek eksperimen di akhir 2024, Guyu Chat berkembang menjadi platform yang mengedepankan:</p>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span>
                      <strong>Privasi Mutlak:</strong> End-to-end encryption untuk semua percakapan
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3">•</span>
                    <span>
                      <strong>Kecepatan Real-time:</strong> Tidak ada delay atau lag yang mengganggu
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    <span>
                      <strong>Desain Modern:</strong> Interface yang bersih dan intuitif
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3">•</span>
                    <span>
                      <strong>Bebas Drama:</strong> Fokus pada komunikasi yang sehat
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Misi Kami</h3>
                <p className="text-gray-300 leading-relaxed">Menciptakan platform komunikasi yang memungkinkan setiap orang untuk berkomunikasi dengan bebas, aman, dan nyaman tanpa khawatir tentang privasi atau gangguan teknis.</p>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Visi Kami</h3>
                <p className="text-gray-300 leading-relaxed">Menjadi platform chat pilihan utama untuk siapa saja yang mengutamakan privasi, kecepatan, dan kemudahan dalam berkomunikasi di era digital.</p>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Tim di Balik Guyu Chat</h2>
              <p className="text-gray-300 text-center leading-relaxed max-w-2xl mx-auto mb-8">
                Kami adalah tim kecil yang passionate tentang teknologi, privasi, dan komunikasi yang sehat. Setiap anggota tim berkontribusi dengan keahlian unik mereka.
              </p>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Made with ❤️ in Indonesia • Est. 2024</p>
              </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Nilai-Nilai Kami</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-blue-300">Privacy First</h4>
                  <p className="text-gray-400 text-sm">Data Anda adalah milik Anda. Tidak dijual, tidak dibagikan.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-purple-300">Speed & Reliability</h4>
                  <p className="text-gray-400 text-sm">Komunikasi real-time tanpa hambatan teknis.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-green-300">User-Centric</h4>
                  <p className="text-gray-400 text-sm">Setiap fitur dirancang dengan user experience terbaik.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-12 border-t border-gray-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Siap Bergabung?</h3>
            <p className="text-gray-300 mb-6">Mulai chat yang aman dan bebas drama sekarang juga!</p>
            <Link to="/login" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform">
              Mulai Chat Sekarang
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
