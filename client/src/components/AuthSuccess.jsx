// src/components/AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        // Simpan token ke localStorage dengan key yang sama seperti regular login
        localStorage.setItem('token', token);

        // Decode token untuk mendapatkan user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('User logged in via Google:', payload);

        // Redirect ke chat page
        navigate('/chat', { replace: true });
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/login?error=invalid_token', { replace: true });
      }
    } else {
      // Tidak ada token, redirect ke login
      navigate('/login?error=no_token', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 shadow-lg animate-pulse">
          <div className="text-white text-xl font-bold">G</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 max-w-sm mx-auto">
          {/* Loading Spinner */}
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-900"></div>
          </div>

          <h2 className="text-lg font-medium text-slate-900 mb-2">Completing Sign In</h2>
          <p className="text-sm text-slate-500">Please wait while we log you in...</p>
        </div>
      </div>
    </div>
  );
}

export default AuthSuccess;
