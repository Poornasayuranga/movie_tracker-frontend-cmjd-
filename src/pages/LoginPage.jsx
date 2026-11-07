
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { loginUser, registerUser } from '../services/authService'

import {
  Clapperboard,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'

export default function LoginPage({ initialMode = 'login' }) {

  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const [isSignUp, setIsSignUp] = useState(
    searchParams.get('mode') === 'signup' ||
    initialMode === 'signup' ||
    initialMode === 'register'
  )

  // Form fields
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // UI states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Switch Login / Register
  const switchMode = (mode) => {
    setIsSignUp(mode)
    setErrorMessage('')
    setSuccessMessage('')
    setForgotPasswordMode(false)
  }

  // Login and Register
  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    // Username validation
    if (!username.trim()) {
      setErrorMessage('Please enter your username.')
      return
    }

    // Email validation
    if (isSignUp) {
      if (!email.trim()) {
        setErrorMessage('Please enter your email.')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address.')
        return
      }
    }

    // Password validation
    if (!password) {
      setErrorMessage('Please enter your password.')
      return
    }

    if (isSignUp && password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.')
      return
    }

    // Confirm password validation
    if (isSignUp && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)

      if (isSignUp) {

        // Registration API request
        const userDetails = {
          username: username.trim(),
          password: password,
          email: email.trim(),
          userRole: 'CUSTOMER'
          // userRole: 'USER'
        }

        await registerUser(userDetails)

        setSuccessMessage(
          'Registration successful! Please sign in.'
        )

        // Clear fields
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

        // Switch to Login
        setIsSignUp(false)

      } else {

        // Login API request
        const loginDetails = {
          username: username.trim(),
          password: password
        }

        // Backend returns JWT token
        await loginUser(loginDetails)

        // Redirect after successful login (default to movies page)
        const destination = location.state?.from || '/movies'

        navigate(destination, { replace: true })
      }

    } catch (error) {

      console.error('Authentication Error:', error)

      const responseData = error.response?.data

      setErrorMessage(
        typeof responseData === 'string'
          ? responseData
          : responseData?.message ||
            error.message ||
            'Something went wrong. Please try again.'
      )

    } finally {
      setIsLoading(false)
    }
  }

  // Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault()

    setErrorMessage('')
    setSuccessMessage(
      'Password reset functionality is not connected yet.'
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0D1F] text-white flex flex-col">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-[#151D50] via-[#0A0D1F] to-[#0A0D1F]" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center max-w-7xl w-full mx-auto px-6 py-5">

        <Link to="/" className="flex items-center gap-3">

          <div className="bg-[#3B4FE8]/20 p-3 rounded-xl">
            <Clapperboard size={24} className="text-purple-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Movie<span className="text-purple-400">Tracker</span>
            </h2>

            <p className="text-xs text-white/40 tracking-widest">
              CINEMA HUB
            </p>
          </div>

        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">

        <div className="w-full max-w-md">

          {/* Form Card */}
          <div className="bg-[#121838]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

            {/* Heading */}
            {!forgotPasswordMode && (
              <>
                <div className="text-center mb-6">

                  <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs mb-4">
                    <ShieldCheck size={14} />
                    Member Access
                  </div>

                  <h1 className="text-3xl font-bold mb-2">
                    {isSignUp ? 'Create an Account' : 'Welcome Back'}
                  </h1>

                  <p className="text-sm text-white/50">
                    {isSignUp
                      ? 'Join Movie Tracker to track films, showtimes & tickets'
                      : 'Sign in to continue to Movie Tracker'}
                  </p>

                </div>

                {/* Login / Register Tabs */}
                <div className="grid grid-cols-2 bg-white/5 p-1 rounded-xl mb-6">

                  <button
                    type="button"
                    onClick={() => switchMode(false)}
                    className={`py-2 rounded-lg text-sm font-semibold ${
                      !isSignUp
                        ? 'bg-[#3B4FE8] text-white'
                        : 'text-white/50'
                    }`}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode(true)}
                    className={`py-2 rounded-lg text-sm font-semibold ${
                      isSignUp
                        ? 'bg-[#3B4FE8] text-white'
                        : 'text-white/50'
                    }`}
                  >
                    Register
                  </button>

                </div>
              </>
            )}

            {/* Forgot Password Heading */}
            {forgotPasswordMode && (
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  Forgot Password?
                </h1>

                <p className="text-sm text-white/50">
                  Enter your email address.
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm mb-4">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-300 p-3 rounded-lg text-sm mb-4">
                {successMessage}
              </div>
            )}

            {/* Login / Register Form */}
            {!forgotPasswordMode && (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Username */}
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Username
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-3 text-white/40"
                    />

                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#3B4FE8]"
                      required
                    />
                  </div>
                </div>

                {/* Email - Register only */}
                {isSignUp && (
                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3 top-3 text-white/40"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#3B4FE8]"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>

                  <div className="flex justify-between items-center mb-2">

                    <label className="text-sm text-white/70">
                      Password
                    </label>

                    {!isSignUp && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotPasswordMode(true)
                          setErrorMessage('')
                          setSuccessMessage('')
                        }}
                        className="text-xs text-purple-300 hover:text-purple-200"
                      >
                        Forgot Password?
                      </button>
                    )}

                  </div>

                  <div className="relative">

                    <Lock
                      size={17}
                      className="absolute left-3 top-3 text-white/40"
                    />

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-sm outline-none focus:border-[#3B4FE8]"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white/40"
                    >
                      {showPassword
                        ? <EyeOff size={17} />
                        : <Eye size={17} />
                      }
                    </button>

                  </div>
                </div>

                {/* Confirm Password */}
                {isSignUp && (
                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Confirm Password
                    </label>

                    <div className="relative">

                      <Lock
                        size={17}
                        className="absolute left-3 top-3 text-white/40"
                      />

                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-sm outline-none focus:border-[#3B4FE8]"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-white/40"
                      >
                        {showConfirmPassword
                          ? <EyeOff size={17} />
                          : <Eye size={17} />
                        }
                      </button>

                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#3B4FE8] to-[#7C3AED] hover:opacity-90 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading
                    ? 'Please wait...'
                    : isSignUp
                      ? 'Create Account'
                      : 'Sign In'
                  }

                  {!isLoading && <ArrowRight size={17} />}
                </button>

              </form>
            )}

            {/* Forgot Password Form */}
            {forgotPasswordMode && (
              <form onSubmit={handleForgotPassword} className="space-y-4">

                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#3B4FE8]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3B4FE8] to-[#7C3AED] rounded-xl py-3 font-semibold"
                >
                  Send Reset Instructions
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordMode(false)
                    setErrorMessage('')
                    setSuccessMessage('')
                  }}
                  className="w-full text-purple-300 text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={15} />
                  Back to Sign In
                </button>

              </form>
            )}

            {/* Bottom Link */}
            {!forgotPasswordMode && (
              <div className="text-center text-sm text-white/50 mt-6 pt-5 border-t border-white/10">

                {isSignUp ? (
                  <>
                    Already have an account?

                    <button
                      type="button"
                      onClick={() => switchMode(false)}
                      className="text-purple-300 ml-2"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?

                    <button
                      type="button"
                      onClick={() => switchMode(true)}
                      className="text-purple-300 ml-2"
                    >
                      Register
                    </button>
                  </>
                )}

              </div>
            )}

          </div>

          {/* Security Text */}
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs mt-5">
            <ShieldCheck size={15} />
            Secure Movie Tracker Authentication
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-white/40 border-t border-white/5">
        © 2026 Movie Tracker. All Rights Reserved.
      </footer>

    </div>
  )
}
