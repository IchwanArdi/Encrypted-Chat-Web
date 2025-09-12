import { useState } from 'react';

// NAMA FILE: AccountDeletionForm.jsx
// LOKASI: frontend/src/components/AccountDeletionForm.jsx
// TUJUAN: React component untuk request penghapusan akun via email
// AKSES: Bisa dipanggil dari route /account-deletion atau modal
//
// FITUR:
// - Form request penghapusan data untuk user yang tidak bisa login
// - Validasi email dan nama lengkap
// - Peringatan tentang penghapusan permanen
// - Loading states dan error handling
// - Responsive design dengan Tailwind CSS

function AccountDeletionForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Configuration - Ganti dengan URL API Anda
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim() || !formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Email dan nama lengkap wajib diisi' });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Format email tidak valid' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/data/request-deletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          fullName: formData.fullName.trim(),
          reason: formData.reason.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ email: '', fullName: '', reason: '' });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Terjadi kesalahan saat mengirim permintaan',
        });
      }
    } catch (error) {
      console.error('Request error:', error);
      setMessage({
        type: 'error',
        text: 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.',
      });
    } finally {
      setLoading(false);
    }
  };

  const MessageAlert = ({ type, text }) => {
    if (!text) return null;

    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const iconColor = isSuccess ? 'text-green-400' : 'text-red-400';

    return (
      <div className={`${bgColor} border rounded-md p-4 mb-6`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {isSuccess ? (
              <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${textColor}`}>{isSuccess ? 'Permintaan Berhasil Dikirim' : 'Terjadi Kesalahan'}</h3>
            <div className={`mt-2 text-sm ${textColor.replace('800', '700')}`}>{text}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">Permintaan Penghapusan Akun</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">Isi form di bawah ini untuk meminta penghapusan data akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Akun <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="contoh@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Alasan Penghapusan (Opsional)
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Alasan Anda ingin menghapus akun..."
              disabled={loading}
            />
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Peringatan Penting</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Penghapusan data bersifat permanen dan tidak dapat dibatalkan</li>
                    <li>Semua data akun Anda akan dihapus dalam 7-30 hari kerja</li>
                    <li>Anda akan menerima konfirmasi melalui email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                'Kirim Permintaan Penghapusan'
              )}
            </button>
          </div>
        </form>

        {/* Message Alert */}
        <MessageAlert type={message.type} text={message.text} />

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Masih punya pertanyaan?
            <a href="mailto:support@guyuchat.com" className="text-blue-600 hover:text-blue-500 ml-1">
              Hubungi Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountDeletionForm;
