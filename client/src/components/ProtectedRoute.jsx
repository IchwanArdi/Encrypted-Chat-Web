import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Validasi token (optional)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/login?error=session_expired" replace />;
    }
  } catch (error) {
    // Token tidak valid
    localStorage.removeItem('token');
    return <Navigate to="/login?error=invalid_session" replace />;
  }

  return children;
}

export default ProtectedRoute;
