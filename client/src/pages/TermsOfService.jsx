import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Guyu Chat"
        description="Baca syarat dan ketentuan penggunaan Guyu Chat: aturan akun, perilaku yang diperbolehkan, privasi & data, ketersediaan layanan, hingga batasan tanggung jawab."
        keywords="terms of service, syarat dan ketentuan, aturan penggunaan, kebijakan pengguna, Guyu Chat, privasi, keamanan, regulasi, peraturan chat"
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
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Service</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Aturan main yang jelas dan fair untuk semua pengguna Guyu Chat. Dibuat sederhana tanpa bahasa legal yang rumit.</p>
              <p className="text-sm text-gray-400 mt-4">Last updated: January 2025 • Effective Date: January 1, 2025</p>
            </div>

            {/* Quick Summary */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-indigo-300">TL;DR - Ringkasan Singkat</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-white mb-3">👍 Boleh:</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Chat dengan sopan dan respect</li>
                    <li>• Share pengalaman dan ide positif</li>
                    <li>• Laporkan masalah atau bug</li>
                    <li>• Gunakan fitur sesuai fungsinya</li>
                    <li>• Hapus akun kapan saja</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-3">👎 Tidak Boleh:</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Spam, harassment, atau trolling</li>
                    <li>• Share konten SARA atau toxic</li>
                    <li>• Hack atau abuse sistem</li>
                    <li>• Pretend jadi orang lain</li>
                    <li>• Share data pribadi orang lain</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Terms */}
            <div className="space-y-8">
              {/* Acceptance */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">1. Penerimaan Syarat</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Dengan menggunakan Guyu Chat, Anda setuju untuk terikat dengan Terms of Service ini. Jika tidak setuju, silakan tidak menggunakan layanan kami.</p>
                  <p>Kami berhak mengubah terms ini kapan saja dengan pemberitahuan minimal 30 hari sebelumnya. Penggunaan berkelanjutan berarti Anda menyetujui perubahan tersebut.</p>
                </div>
              </div>

              {/* Account Rules */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">2. Aturan Akun</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Eligibility</h3>
                    <p>Anda harus berusia minimal 13 tahun. Jika di bawah 18 tahun, diperlukan persetujuan orang tua.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Account Security</h3>
                    <p>Anda bertanggung jawab menjaga keamanan akun dan password. Jangan share credentials dengan siapapun.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">One Person, One Account</h3>
                    <p>Satu orang hanya boleh punya satu akun. Membuat multiple accounts untuk tujuan spam atau abuse dilarang.</p>
                  </div>
                </div>
              </div>

              {/* Acceptable Use */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-green-300">3. Acceptable Use Policy</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Perilaku yang Diharapkan:</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• Berkomunikasi dengan hormat dan sopan</li>
                      <li>• Respect privasi dan boundaries orang lain</li>
                      <li>• Gunakan bahasa yang appropriate (tidak kasar berlebihan)</li>
                      <li>• Laporkan abuse atau masalah ke support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2 ">Perilaku yang Dilarang:</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• Harassment, bullying, atau intimidasi</li>
                      <li>• Spam, flooding, atau automated messaging</li>
                      <li>• Konten SARA, hate speech, atau diskriminatif</li>
                      <li>• Phishing, scamming, atau penipuan</li>
                      <li>• Share konten ilegal atau harmful</li>
                      <li>• Impersonation atau pretend jadi orang lain</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy & Data */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">4. Privasi & Data</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Kebijakan privasi lengkap tersedia di{' '}
                    <Link to="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                      halaman Privacy Policy
                    </Link>
                    . Poin penting:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Pesan dienkripsi end-to-end untuk keamanan maksimal</li>
                    <li>• Kami tidak jual atau bagikan data pribadi Anda</li>
                    <li>• Data minimal yang dikumpulkan hanya untuk operasional</li>
                    <li>• Anda bisa minta hapus data atau akun kapan saja</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">5. Intellectual Property</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Platform & Code</h3>
                    <p>Guyu Chat dan semua kodenya adalah milik kami. Anda tidak boleh copy, reverse engineer, atau distribute tanpa izin.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">User Content</h3>
                    <p>Pesan dan konten yang Anda kirim tetap menjadi milik Anda. Kami hanya memproses untuk memberikan layanan chat.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Copyright</h3>
                    <p>Jangan share konten yang melanggar copyright. Jika ada laporan DMCA, kami akan tindak lanjuti sesuai hukum.</p>
                  </div>
                </div>
              </div>

              {/* Service Availability */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-pink-300">6. Ketersediaan Layanan</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Uptime Target</h3>
                    <p>Kami berusaha menjaga layanan online 99% waktu, tapi tidak bisa guarantee 100% karena maintenance dan hal teknis lainnya.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Maintenance</h3>
                    <p>Scheduled maintenance akan diumumkan sebelumnya. Emergency maintenance mungkin terjadi tanpa pemberitahuan.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Beta Features</h3>
                    <p>Beberapa fitur mungkin dalam tahap beta. Kami akan jelaskan risikonya dan bisa dihentikan sewaktu-waktu.</p>
                  </div>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-red-300">7. Pemutusan Layanan</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Oleh User</h3>
                    <p>Anda bisa hapus akun kapan saja melalui settings atau email ke support. Semua data akan dihapus dalam 30 hari.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Oleh Kami</h3>
                    <p>Kami bisa suspend atau ban akun yang melanggar terms ini. Warning akan diberikan kecuali untuk pelanggaran berat.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Appeal Process</h3>
                    <p>Jika merasa salah di-ban, kirim email ke support dengan penjelasan. Kami akan review dalam 7 hari kerja.</p>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-orange-300">8. Batasan Tanggung Jawab</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Guyu Chat disediakan "as is". Kami tidak bertanggung jawab atas:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Kehilangan data akibat technical issues</li>
                    <li>• Kerugian bisnis atau pribadi dari penggunaan platform</li>
                    <li>• Tindakan user lain di platform</li>
                    <li>• Gangguan layanan di luar kendali kami</li>
                  </ul>
                  <p>Tanggung jawab maksimal kami terbatas pada biaya yang Anda bayar (yang dalam hal ini $0 karena gratis).</p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">9. Hukum yang Berlaku</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Terms ini tunduk pada hukum Republik Indonesia. Jika ada sengketa, akan diselesaikan melalui:</p>
                  <ol className="space-y-1 ml-4">
                    <li>1. Diskusi langsung dengan support team</li>
                    <li>2. Mediasi jika perlu</li>
                    <li>3. Pengadilan di Jakarta sebagai opsi terakhir</li>
                  </ol>
                </div>
              </div>

              {/* Contact & Changes */}
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-teal-300">10. Kontak & Perubahan</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Pertanyaan tentang terms ini? Email ke:{' '}
                    <a href="mailto:legal@guyuchat.com" className="text-teal-400 hover:text-teal-300 underline">
                      legal@guyuchat.com
                    </a>
                  </p>
                  <p>Perubahan terms akan diumumkan minimal 30 hari sebelumnya via email dan notifikasi di platform. Perubahan minor (typo, clarification) bisa dilakukan tanpa notice.</p>
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                    <p className="text-teal-300 font-semibold text-sm">💡 Tip: Bookmark halaman ini dan cek update berkala untuk mengetahui perubahan terms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-8 border-t border-gray-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-4">Terms ini dibuat dengan bahasa sederhana agar mudah dipahami. Jika ada yang tidak jelas, jangan ragu untuk bertanya.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
            <p className="text-gray-400 text-xs mt-4">© 2025 Guyu Chat. Made with ❤️ for Indonesian chat community.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsOfService;
