import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="hero-glow" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #00D4FF, transparent)', animationDelay: '2s' }} />

        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to <span className="gradient-text">PU Assistant AI</span>
          </h1>
          <p className="text-gray-400 leading-relaxed text-lg">
            Your intelligent campus companion for Poornima University. Get instant answers about admissions, courses, fees, and more.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 text-sm">
            {[
              { label: '5000+', sub: 'Active Students' },
              { label: '300+', sub: 'Recruiters' },
              { label: '20+', sub: 'Topics Covered' },
              { label: '4.9★', sub: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <div className="text-xl font-bold gradient-text">{stat.label}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <Link to="/" className="font-bold text-white text-lg">PU <span className="gradient-text">Assistant</span></Link>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-gray-400 mb-8">Welcome back! Sign in to your Poornima AI account.</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm"
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  id="remember-me"
                  className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary-500"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="login-submit"
              className="w-full btn-primary py-3.5 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-gray-500 text-xs">Demo Credentials</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 glass rounded-xl p-3">
              <div>
                <div className="text-gray-400 font-medium mb-1">Student</div>
                <div>student@poornima.org</div>
                <div>Student@123</div>
              </div>
              <div>
                <div className="text-gray-400 font-medium mb-1">Admin</div>
                <div>admin@poornima.org</div>
                <div>Admin@PU2024</div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
