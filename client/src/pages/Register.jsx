import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simplified input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error on input
  };

  // Simplified validation with early returns
  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) return setError('First name is required'), false;
    if (!lastName.trim()) return setError('Last name is required'), false;
    if (!email.trim()) return setError('Email is required'), false;
    if (!password) return setError('Password is required'), false;
    if (password.length < 3) return setError('Password must be at least 3 characters long'), false;
    if (password !== confirmPassword) return setError('Passwords do not match'), false;
    if (!agreedToTerms) return setError('Please agree to the terms and conditions'), false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setAgreedToTerms(false);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/login', {
            state: {
              message: 'Registration successful! Please log in with your credentials.',
              email: formData.email.trim().toLowerCase(),
            },
          });
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified social handlers
  const handleSocialRegister = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  // Password toggle component
  const PasswordToggle = ({ show, toggle }) => (
    <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={toggle} disabled={isLoading}>
      <svg className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {show ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        )}
      </svg>
    </button>
  );

  // Alert component for messages
  const Alert = ({ type, message }) => (
    <div className={`mb-6 p-4 rounded-2xl border backdrop-blur-sm ${type === 'error' ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
      <div className="flex items-center">
        <div className={`w-5 h-5 mr-3 ${type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{type === 'error' ? '⚠️' : '✅'}</div>
        <p className={`text-sm font-medium ${type === 'error' ? 'text-red-300' : 'text-green-300'}`}>{message}</p>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title="Register | Guyu Chat"
        description="Daftar sekarang di Guyu Chat dan mulai percakapan aman dengan enkripsi end-to-end. Buat akun gratis untuk mengakses semua fitur chat modern."
        keywords="register, daftar, sign up, buat akun, Guyu Chat, enkripsi chat, percakapan aman, daftar gratis, secure messaging"
        type="website"
        additionalMetaTags={[
          { name: 'theme-color', content: '#9333ea' },
          { name: 'application-name', content: 'Guyu Chat' },
        ]}
      />

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Join the Revolution!</h1>
            <p className="text-gray-400 text-lg font-light">
              Create your account and start <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-semibold">secure conversations</span>
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Messages */}
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {['firstName', 'lastName'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-semibold text-gray-300 mb-3">
                      {field === 'firstName' ? 'First Name' : 'Last Name'}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      required
                      className="w-full px-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300 text-base"
                      placeholder={field === 'firstName' ? 'John' : 'Doe'}
                      value={formData[field]}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300 text-base"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              {/* Password Fields */}
              {[
                { name: 'password', label: 'Password', placeholder: 'Create a strong password', show: showPassword, toggle: () => setShowPassword(!showPassword) },
                { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your password', show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword) },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-semibold text-gray-300 mb-3">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.show ? 'text' : 'password'}
                      required
                      className="w-full px-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300 text-base pr-12"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <PasswordToggle show={field.show} toggle={field.toggle} />
                  </div>
                  {field.name === 'password' && <p className="mt-2 text-xs text-gray-400 font-medium">Minimum 3 characters</p>}
                </div>
              ))}

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-5 w-5 text-purple-500 focus:ring-purple-500 border-gray-600 bg-gray-700/50 rounded-lg mt-0.5"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="block text-sm text-gray-300 font-medium leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms-of-service" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all duration-300 font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all duration-300 font-semibold">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-4 px-6 border-0 text-base font-bold rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/40 text-gray-400 font-medium backdrop-blur-sm">or sign up with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: 'google',
                    label: 'Google',
                    icon: (
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'facebook',
                    label: 'Facebook',
                    icon: (
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                ].map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => handleSocialRegister(provider.name)}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center items-center py-3.5 px-4 rounded-xl border border-gray-600/50 bg-gray-700/30 backdrop-blur-sm text-sm font-semibold text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {provider.icon}
                    {provider.label}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400 font-light">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all duration-300">
                Sign in here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
