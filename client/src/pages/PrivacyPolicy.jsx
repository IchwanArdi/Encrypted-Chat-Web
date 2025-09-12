function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Kebijakan Privasi GuyuChat</h1>
          <p className="text-gray-600 mb-8">
            <em>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</em>
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-700 mb-4">Kami mengumpulkan informasi berikut untuk memberikan layanan terbaik:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Informasi Akun:</strong> Nama, email, dan foto profil dari Facebook/Google
                </li>
                <li>
                  <strong>Informasi Chat:</strong> Pesan yang Anda kirim melalui aplikasi
                </li>
                <li>
                  <strong>Data Teknis:</strong> Alamat IP, informasi perangkat, dan log aktivitas
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
              <p className="text-gray-700 mb-4">Informasi Anda digunakan untuk:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Menyediakan layanan chat dan komunikasi</li>
                <li>Mempertahankan dan meningkatkan aplikasi</li>
                <li>Memberikan dukungan pelanggan</li>
                <li>Memastikan keamanan platform</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Berbagi Informasi</h2>
              <p className="text-gray-700 mb-4">Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan dalam situasi berikut:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dengan persetujuan eksplisit Anda</li>
                <li>Untuk mematuhi kewajiban hukum</li>
                <li>Untuk melindungi hak dan keamanan pengguna lain</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Keamanan Data</h2>
              <p className="text-gray-700">Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Hak Anda</h2>
              <p className="text-gray-700 mb-4">Anda memiliki hak untuk:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
                <li>Memperbarui atau mengoreksi informasi yang tidak akurat</li>
                <li>Meminta penghapusan akun dan data Anda</li>
                <li>Menarik persetujuan untuk pemrosesan data</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Penghapusan Data</h2>
              <p className="text-gray-700">
                Anda dapat meminta penghapusan data dengan mengikuti petunjuk di halaman{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Penghapusan Data
                </a>{' '}
                atau menghubungi kami langsung.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Perubahan Kebijakan</h2>
              <p className="text-gray-700">Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui aplikasi atau email.</p>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Hubungi Kami</h2>
              <p className="text-gray-700 mb-4">Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi:</p>
              <div className="text-gray-700 space-y-1">
                <p>
                  <strong>Email:</strong> privacy@guyuchat.com
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
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
