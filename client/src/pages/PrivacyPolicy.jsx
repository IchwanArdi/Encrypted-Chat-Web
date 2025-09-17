import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Guyu Chat"
        description="Baca kebijakan privasi Guyu Chat: bagaimana kami melindungi data, enkripsi end-to-end, hak pengguna, serta komitmen kami terhadap keamanan dan transparansi."
        keywords="privacy policy, kebijakan privasi, keamanan data, enkripsi, end-to-end encryption, privasi pengguna, guyu chat, keamanan, transparansi"
        type="article"
        additionalMetaTags={[
          { name: 'theme-color', content: '#1e293b' },
          { name: 'application-name', content: 'Guyu Chat' },
        ]}
      />

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        {/* Main Content */}
        <div className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-black mb-6">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">Policy</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Transparansi penuh tentang bagaimana kami melindungi data dan privasi Anda. Karena privasi adalah hak, bukan privilege.</p>
              <p className="text-sm text-gray-400 mt-4">Last updated: January 2025</p>
            </div>

            {/* Quick Summary */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-green-300">Ringkasan Singkat</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-white mb-2">✅ Yang Kami LAKUKAN:</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Enkripsi end-to-end semua pesan</li>
                    <li>• Simpan data minimal yang diperlukan</li>
                    <li>• Transparan tentang praktik data</li>
                    <li>• Berikan kontrol penuh kepada user</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">❌ Yang TIDAK Kami Lakukan:</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Jual data pribadi Anda</li>
                    <li>• Baca pesan pribadi Anda</li>
                    <li>• Track aktivitas di luar platform</li>
                    <li>• Bagikan info tanpa izin</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-8">
              {/* Data Collection */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">Data yang Kami Kumpulkan</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Informasi Akun</h3>
                    <p className="text-gray-300">Email, nama, dan password terenkripsi untuk membuat dan mengelola akun Anda.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Komunikasi</h3>
                    <p className="text-gray-300">Metadata pesan (waktu, pengirim/penerima) untuk fungsionalitas chat. Konten pesan dienkripsi end-to-end.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Teknis</h3>
                    <p className="text-gray-300">Informasi perangkat dan koneksi minimal untuk optimalisasi performa dan keamanan.</p>
                  </div>
                </div>
              </div>

              {/* How We Use Data */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Bagaimana Kami Menggunakan Data</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Operasional Platform</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Memfasilitasi pengiriman pesan</li>
                      <li>• Manajemen akun pengguna</li>
                      <li>• Pemeliharaan keamanan sistem</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Peningkatan Layanan</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Analisis performa (tanpa konten pesan)</li>
                      <li>• Debugging dan perbaikan bug</li>
                      <li>• Pengembangan fitur baru</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Keamanan Data</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center mt-1">
                      <span className="text-green-400 text-sm">🔐</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">End-to-End Encryption</h3>
                      <p className="text-gray-300 text-sm">Semua pesan dienkripsi dengan algoritma AES-256. Bahkan kami tidak bisa membaca pesan Anda.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8  flex items-center justify-center mt-1">
                      <span className="text-blue-400 text-sm">🛡️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Secure Infrastructure</h3>
                      <p className="text-gray-300 text-sm">Server dilindungi dengan firewall, SSL/TLS, dan monitoring keamanan 24/7.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center mt-1">
                      <span className="text-purple-400 text-sm">🔄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Regular Security Audits</h3>
                      <p className="text-gray-300 text-sm">Audit keamanan berkala untuk memastikan sistem selalu terlindungi dari ancaman terbaru.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-pink-300">Hak-Hak Anda</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">✅</span>
                      <span className="text-white font-semibold">Akses Data</span>
                    </div>
                    <p className="text-gray-300 text-sm ml-6">Minta salinan semua data pribadi yang kami miliki tentang Anda.</p>

                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">✅</span>
                      <span className="text-white font-semibold">Koreksi Data</span>
                    </div>
                    <p className="text-gray-300 text-sm ml-6">Perbaiki atau update informasi yang tidak akurat.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">✅</span>
                      <span className="text-white font-semibold">Hapus Akun</span>
                    </div>
                    <p className="text-gray-300 text-sm ml-6">Hapus akun dan semua data terkait kapan saja.</p>

                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">✅</span>
                      <span className="text-white font-semibold">Portabilitas</span>
                    </div>
                    <p className="text-gray-300 text-sm ml-6">Export data Anda dalam format yang dapat dibaca.</p>
                  </div>
                </div>
              </div>

              {/* Contact & Updates */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Kontak & Update</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Punya pertanyaan tentang privasi atau ingin menggunakan hak-hak Anda? Hubungi kami di{' '}
                    <Link to="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                      halaman contact
                    </Link>
                    .
                  </p>
                  <p className="text-gray-300">Kami akan memberitahu semua perubahan signifikan pada kebijakan privasi ini melalui email dan notifikasi di platform minimal 30 hari sebelumnya.</p>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <p className="text-cyan-300 font-semibold text-sm">💡 Tip: Bookmark halaman ini untuk update terbaru tentang kebijakan privasi kami.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-8 border-t border-gray-700/50">
          <div className="max-w-4xl mx-auto text-center text-gray-400">
            <p>© 2025 Guyu Chat. Privasi Anda adalah prioritas utama kami.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
