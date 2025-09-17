import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import TermsOfService from './pages/TermsOfService';
import DashboardChatPage from './pages/DashboardChatPage';
import NotFoundPage from './pages/NotFoundPage';
import AccountDeletionForm from './pages/AccountDeletionForm';
import AuthSuccess from './components/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
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

        {/* Public Pages */}
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        <Route
          path="/help"
          element={
            <MainLayout>
              <HelpPage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
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

        {/* Protected Routes */}
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

        <Route
          path="/account-deletion-form"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <AccountDeletionForm />
              </AuthLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
