// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthSuccess from './pages/AuthSuccess';

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Index />
            </MainLayout>
          }
        />
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

        {/* New auth success route */}
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Optional: Auth error route */}
        <Route
          path="/auth/error"
          element={
            <AuthLayout>
              <div className="text-center">
                <h2 className="text-2xl font-light text-red-600 mb-4">Authentication Error</h2>
                <p className="text-slate-600">Something went wrong. Please try again.</p>
              </div>
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
