import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DashboardChatPage from './pages/DashboardChatPage';
import AuthSuccess from './components/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <MainLayout>
              <IndexPage />
            </MainLayout>
          }
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <AuthLayout>
              <PrivacyPolicy />
            </AuthLayout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <AuthLayout>
              <TermsOfService />
            </AuthLayout>
          }
        />

        {/* OAuth Success Handler */}
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Protected Chat Page */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <DashboardChatPage />
              </AuthLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <MainLayout>
              <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-slate-900">404</h1>
                  <p className="text-slate-600 mt-2">Page not found</p>
                </div>
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
