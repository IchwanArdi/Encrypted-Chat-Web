import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardChatPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            // User not authenticated, redirect to login
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched user data:', data);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Redirect to login on error
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Logout response:', data);
      
      if (data.message === 'Logged out successfully') {
        // Clear local state and storage
        setUser(null);
        localStorage.removeItem('token');
        
        // Navigate to home page
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Even if logout fails, clear local data and redirect
      setUser(null);
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard Chat</h1>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {user && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">ID:</label>
                  <p className="mt-1 text-gray-900">{user._id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">First Name:</label>
                  <p className="mt-1 text-gray-900">{user.firstName || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Last Name:</label>
                  <p className="mt-1 text-gray-900">{user.lastName || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Display Name:</label>
                  <p className="mt-1 text-gray-900">{user.displayName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email:</label>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Avatar:</label>
                  <p className="mt-1 text-gray-900">{user.avatar || 'No avatar'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Auth Methods:</label>
                  <p className="mt-1 text-gray-900">
                    {user.authMethods && user.authMethods.length > 0 
                      ? user.authMethods.join(', ') 
                      : 'Not available'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Last Login:</label>
                  <p className="mt-1 text-gray-900">
                    {user.lastLoginAt 
                      ? new Date(user.lastLoginAt).toLocaleString() 
                      : 'Never'}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Account Created:</label>
                  <p className="mt-1 text-gray-900">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleString() 
                      : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="text-center py-8">
              <p className="text-gray-600">No user data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardChatPage;