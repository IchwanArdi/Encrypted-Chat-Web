import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get token from URL params
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Handle error
      console.error('Auth error:', error);

      let errorMessage = 'Authentication failed. Please try again.';
      switch (error) {
        case 'google_auth_failed':
          errorMessage = 'Google authentication failed. Please try again.';
          break;
        case 'facebook_auth_failed':
          errorMessage = 'Facebook authentication failed. Please try again.';
          break;
        case 'server_error':
          errorMessage = 'Server error occurred. Please try again later.';
          break;
      }

      // Show error and redirect to login
      alert(errorMessage);
      navigate('/login');
      return;
    }

    if (token) {
      // Store token
      localStorage.setItem('token', token);

      // Optional: Verify token with backend
      verifyToken(token)
        .then(() => {
          // Redirect to dashboard
          navigate('/dashboard');
        })
        .catch(() => {
          // Token invalid, redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  }, [navigate, searchParams]);

  const verifyToken = async (token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    const data = await response.json();
    return data;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center mb-8 shadow-lg">
          <div className="text-white text-xl font-bold">G</div>
        </div>
        <h2 className="text-2xl font-light text-slate-900 mb-4">Authenticating...</h2>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
        <p className="text-slate-500 text-sm mt-4">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}

export default AuthSuccess;
