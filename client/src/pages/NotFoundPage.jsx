import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <SEO title="404 - Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Guyu Chat dan mulai chat aman sekarang." noindex={true} canonical="https://guyuchat.vercel.app/404" />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Sepertinya halaman yang Anda cari sudah pindah atau tidak pernah ada. Mari kembali ke chat yang aman!</p>
          <Link to="/" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform ">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
