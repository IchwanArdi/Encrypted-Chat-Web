// src/components/AuthSuccess.jsx - Improved Version
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing'); // processing, success, error

  useEffect(() => {
    const processAuth = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setTimeout(() => {
          navigate('/login?error=no_token', { replace: true });
        }, 2000);
        return;
      }

      try {
        // Validasi format token JWT
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }

        // Decode payload untuk validasi
        const payload = JSON.parse(atob(tokenParts[1]));

        // Cek apakah token expired
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }

        console.log('User logged in via OAuth:', {
          userId: payload.userId,
          exp: new Date(payload.exp * 1000),
        });

        // Verifikasi token dengan backend (optional tapi recommended)
        await verifyTokenWithServer(token);

        // Simpan token
        localStorage.setItem('token', token);

        setStatus('success');

        // Redirect setelah 1 detik untuk UX yang lebih baik
        setTimeout(() => {
          navigate('/chat', { replace: true });
        }, 1000);
      } catch (error) {
        console.error('Auth processing error:', error);
        setStatus('error');
        setTimeout(() => {
          navigate('/login?error=invalid_token', { replace: true });
        }, 2000);
      }
    };

    processAuth();
  }, [searchParams, navigate]);

  // Optional: Verifikasi token dengan server
  const verifyTokenWithServer = async (token) => {
    try {
      const baseURL = import.meta.env.MODE === 'production' ? 'https://server-chat-web.vercel.app' : 'http://localhost:5000';

      const response = await fetch(`${baseURL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const userData = await response.json();
      console.log('Token verified with server:', userData);

      return userData;
    } catch (error) {
      console.error('Server verification failed:', error);
      // Tidak throw error disini karena client-side verification sudah berhasil
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-900"></div>
            </div>
            <h2 className="text-lg font-medium text-slate-900 mb-2">Completing Sign In</h2>
            <p className="text-sm text-slate-500">Please wait while we log you in...</p>
          </>
        );

      case 'success':
        return (
          <>
            <div className="flex justify-center mb-4">
              <div className="rounded-full h-8 w-8 bg-green-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-medium text-slate-900 mb-2">Sign In Successful!</h2>
            <p className="text-sm text-slate-500">Redirecting to chat...</p>
          </>
        );

      case 'error':
        return (
          <>
            <div className="flex justify-center mb-4">
              <div className="rounded-full h-8 w-8 bg-red-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-medium text-slate-900 mb-2">Authentication Failed</h2>
            <p className="text-sm text-slate-500">Redirecting to login...</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 shadow-lg">
          <div className="text-white text-xl font-bold">G</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 max-w-sm mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AuthSuccess;
