import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation - check if credentials match demo account
    const demoEmail = 'demo@healthlink.com';
    const demoPassword = 'demo123';

    setTimeout(() => {
      if (formData.email === demoEmail && formData.password === demoPassword) {
        // Successful login
        setLoading(false);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        // Failed login
        setError('Invalid email or password. Try demo@healthlink.com / demo123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Medical-themed background with floating elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Floating medical icons background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-teal-200 dark:bg-teal-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 dark:bg-cyan-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>
        
        {/* Subtle medical pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <path d="M5,5 L15,5 L15,15 L5,15 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#medical-pattern)" />
          </svg>
        </div>
      </div>

      {/* Minimalist header with logo and back link */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">HealthLink</span>
        </Link>
        
        <Link to="/" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main login card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            
            {/* Enhanced header with modern icon */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">Sign in to continue your wellness journey</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pl-11 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pl-11 pr-11 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
