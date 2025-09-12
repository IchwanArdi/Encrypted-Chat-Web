import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function DashboardChatPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
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

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setDeleteError('Password diperlukan untuk menghapus akun');
      return;
    }

    setDeleteLoading(true);
    setDeleteError('');

    try {
      // Get token from localStorage or from somewhere else
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menghapus akun');
      }

      // Account deleted successfully
      alert('Akun berhasil dihapus!');

      // Clear all local data
      localStorage.removeItem('token');
      setUser(null);

      // Navigate to home
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteError(error.message || 'Terjadi kesalahan saat menghapus akun');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDownloadData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data/download-data`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Gagal mengunduh data');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-guyuchat-data.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Data berhasil diunduh!');
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Gagal mengunduh data: ' + error.message);
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
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" onClick={handleDownloadData}>
                Download Data
              </button>
              <Link to="/account-deletion-form" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Delete Account
              </Link>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors" onClick={handleLogout}>
                Logout
              </button>
            </div>
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
                  <p className="mt-1 text-gray-900">{user.authMethods && user.authMethods.length > 0 ? user.authMethods.join(', ') : 'Not available'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Last Login:</label>
                  <p className="mt-1 text-gray-900">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Account Created:</label>
                  <p className="mt-1 text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Not available'}</p>
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hapus Akun Permanen</h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">⚠️ Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus secara permanen.</p>

              {user?.authMethods?.includes('local') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Masukkan password untuk konfirmasi:</label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Password"
                  />
                </div>
              )}
            </div>

            {deleteError && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{deleteError}</div>}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                disabled={deleteLoading}
              >
                Batal
              </button>
              <button onClick={handleDeleteAccount} disabled={deleteLoading} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50">
                {deleteLoading ? 'Menghapus...' : 'Ya, Hapus Akun'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardChatPage;
