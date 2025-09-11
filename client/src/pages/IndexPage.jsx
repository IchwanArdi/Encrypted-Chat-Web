import { useInView } from '../hooks/useInView';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FadeUp({ children, delay = 0 }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function IndexPage() {
  useEffect(() => {
    AOS.init({
      duration: 700, // durasi animasi
      once: true, // animasi jalan sekali aja
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 md:mt-40 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-8 md:gap-y-12">
      {/* Header Badge */}
      <FadeUp>
        <div className="rounded-2xl shadow-lg items-center flex flex-row gap-x-2 w-fit px-4 sm:px-5 hover:shadow-2xl transition duration-200 cursor-pointer">
          <span className="bg-black rounded-2xl text-white font-semibold py-1 px-2 sm:px-3 text-sm">New</span>
          <h2 className="text-sm sm:text-md font-medium py-3 sm:py-4">Guyu Chat Beta is now live!🎉</h2>
        </div>
      </FadeUp>

      {/* Hero Section */}
      <FadeUp delay={100}>
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight">
            Ngobrol Bebas,
            <span className="block mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Gak Ada Ngintip!</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-medium max-w-4xl mx-auto px-4">
            Cara lebih baik untuk terhubung dan berkomunikasi dengan privasi.
            <br className="hidden sm:block" />
            Pesan Anda, privasi Anda, kendali di tangan Anda.
          </p>
        </div>
      </FadeUp>

      {/* CTA Button */}
      <FadeUp delay={200}>
        <button className="text-base sm:text-lg font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-2xl transition duration-200 cursor-pointer">
          🚀 Mulai Sekarang!
        </button>
      </FadeUp>

      {/* Preview Chat */}
      <FadeUp delay={300}>
        <div className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl bg-white overflow-hidden">
          <h3 className="text-xl sm:text-2xl font-semibold py-4 border-b border-gray-100">Preview Chat</h3>
          <div className="flex flex-col gap-y-4 p-4 sm:p-6">
            {/* Pesan kiri */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex justify-start">
              <span className="bg-slate-300 py-2 px-4 text-sm sm:text-lg rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-xs break-words">Halo! Apa Kabar?</span>
            </div>

            {/* Pesan kanan */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex justify-end">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm sm:text-lg py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-xs break-words">Baik! Senang bisa chat aman di Guyu Chat.</span>
            </div>

            {/* Pesan kiri */}
            <div data-aos="fade-up" data-aos-delay="500" className="flex justify-start">
              <span className="bg-slate-300 py-2 px-4 text-sm sm:text-lg rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-xs break-words">Ya, gak perlu khawatir tentang privasi di sini 👍</span>
            </div>

            {/* Pesan kanan */}
            <div data-aos="fade-up" data-aos-delay="700" className="flex justify-end">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm sm:text-lg py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-xs break-words">Benar sekali! Semua pesan terjamin keamanannya 🔒</span>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Features Section */}
      <div className="w-full max-w-6xl text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FadeUp delay={100}>
          <div className="shadow-lg hover:shadow-xl transition duration-200 py-6 px-6 rounded-2xl bg-white">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl sm:text-2xl text-black font-semibold mb-3">Enkripsi Tingkat Tinggi</h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">Semua pesan dienkripsi ujung ke ujung, memastikan hanya Anda dan penerima yang dapat membaca pesan Anda.</p>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="shadow-lg hover:shadow-xl transition duration-200 py-6 px-6 rounded-2xl bg-white">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl sm:text-2xl text-black font-semibold mb-3">Super Cepat</h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">Pengiriman pesan instan dengan kecepatan tinggi.</p>
          </div>
        </FadeUp>

        <FadeUp delay={300}>
          <div className="shadow-lg hover:shadow-xl transition duration-200 py-6 px-6 rounded-2xl bg-white md:col-span-2 lg:col-span-1">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl sm:text-2xl text-black font-semibold mb-3">Desain Modern</h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">Interface yang simpel namun elegan untuk pengalaman pengguna terbaik.</p>
          </div>
        </FadeUp>
      </div>

      {/* Footer */}
      <FadeUp delay={200}>
        <footer className="text-gray-500 text-xs sm:text-sm mt-16 sm:mt-20 mb-8 sm:mb-10 border-t border-gray-200 pt-8">&copy; 2025 Guyu Chat. All rights reserved.</footer>
      </FadeUp>
    </div>
  );
}

export default IndexPage;
