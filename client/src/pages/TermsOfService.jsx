import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Syarat dan Ketentuan GuyuChat</h1>
          <p className="text-gray-600 mb-8">
            <em>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</em>
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Penerimaan Syarat</h2>
              <p className="text-gray-700">Dengan mengakses dan menggunakan GuyuChat, Anda setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan layanan kami.</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Deskripsi Layanan</h2>
              <p className="text-gray-700 mb-4">GuyuChat adalah platform komunikasi yang memungkinkan pengguna untuk:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Melakukan percakapan real-time</li>
                <li>Berbagi pesan teks dan media</li>
                <li>Terhubung dengan pengguna lain</li>
                <li>Menggunakan fitur-fitur komunikasi lainnya</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Akun Pengguna</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Pendaftaran:</strong> Anda dapat mendaftar menggunakan email atau akun media sosial (Google/Facebook).
                </p>
                <p>
                  <strong>Keamanan Akun:</strong> Anda bertanggung jawab menjaga keamanan akun dan kata sandi Anda.
                </p>
                <p>
                  <strong>Informasi Akurat:</strong> Anda setuju memberikan informasi yang akurat dan terkini saat mendaftar.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Aturan Penggunaan</h2>
              <p className="text-gray-700 mb-4">Anda DILARANG untuk:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Mengirim konten yang melanggar hukum, kasar, atau tidak pantas</li>
                <li>Menggunakan layanan untuk spam atau mengirim pesan massal</li>
                <li>Mengganggu atau melecehkan pengguna lain</li>
                <li>Mencoba mengakses akun pengguna lain tanpa izin</li>
                <li>Menggunakan bot atau alat otomatis tanpa persetujuan</li>
                <li>Mengirim virus, malware, atau kode berbahaya lainnya</li>
                <li>Melanggar hak kekayaan intelektual orang lain</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Hak Kekayaan Intelektual</h2>
              <p className="text-gray-700 mb-4">Semua konten, desain, dan fitur dalam GuyuChat adalah milik kami dan dilindungi oleh hukum hak cipta. Anda diberikan lisensi terbatas untuk menggunakan layanan sesuai dengan syarat ini.</p>
              <p className="text-gray-700">Konten yang Anda buat tetap menjadi milik Anda, namun Anda memberikan kami hak untuk menyimpan dan memproses konten tersebut untuk menyediakan layanan.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privasi dan Data</h2>
              <p className="text-gray-700">
                Pengumpulan dan penggunaan informasi pribadi Anda diatur oleh{' '}
                <a href="/PrivacyPolicy" className="text-blue-600 hover:text-blue-800 underline">
                  Kebijakan Privasi
                </a>{' '}
                kami. Dengan menggunakan layanan ini, Anda setuju dengan praktik privasi kami.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Penghentian Layanan</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Penghentian oleh Pengguna:</strong> Anda dapat menghentikan akun Anda kapan saja melalui pengaturan akun atau menghubungi dukungan pelanggan.
                </p>
                <p>
                  <strong>Penghentian oleh Kami:</strong> Kami berhak menangguhkan atau menghentikan akun Anda jika melanggar syarat ini atau menggunakan layanan secara tidak wajar.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Batasan Tanggung Jawab</h2>
              <p className="text-gray-700 mb-4">Layanan disediakan "sebagaimana adanya". Kami tidak memberikan jaminan bahwa layanan akan:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Berfungsi tanpa gangguan atau kesalahan</li>
                <li>Memenuhi semua kebutuhan Anda</li>
                <li>Tersedia setiap saat</li>
                <li>Bebas dari virus atau komponen berbahaya</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Ganti Rugi</h2>
              <p className="text-gray-700">Anda setuju untuk mengganti rugi dan membebaskan kami dari klaim, kerugian, atau kerusakan yang timbul dari pelanggaran syarat ini atau penggunaan layanan yang tidak wajar.</p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Hukum yang Berlaku</h2>
              <p className="text-gray-700">Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di Indonesia.</p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Perubahan Syarat</h2>
              <p className="text-gray-700">
                Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke waktu. Perubahan akan diberitahukan melalui aplikasi atau email. Penggunaan layanan setelah perubahan berarti Anda menerima syarat yang baru.
              </p>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Hubungi Kami</h2>
              <p className="text-gray-700 mb-4">Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi:</p>
              <div className="text-gray-700 space-y-1">
                <p>
                  <strong>Email:</strong> support@guyuchat.com
                </p>
                <p>
                  <strong>Alamat:</strong> [Alamat lengkap Anda]
                </p>
                <p>
                  <strong>Telepon:</strong> [Nomor telepon]
                </p>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a href="/register" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              ← Kembali ke Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
