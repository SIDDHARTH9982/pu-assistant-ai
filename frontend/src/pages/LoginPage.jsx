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
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#050714' }}>

      {/* Global Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-blue" style={{ width: '600px', height: '600px', top: '-15%', left: '-10%', opacity: 0.6 }} />
        <div className="orb orb-purple" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', opacity: 0.5 }} />
        <div className="orb orb-cyan" style={{ width: '300px', height: '300px', top: '50%', left: '40%', opacity: 0.3 }} />
        <div className="absolute inset-0 star-field opacity-30" />
      </div>
      <div className="noise-overlay" />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-center max-w-md">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10"
            style={{
              background: 'linear-gradient(135deg, #4285F4, #8B5CF6)',
              boxShadow: '0 0 60px rgba(66,133,244,0.5), 0 0 120px rgba(139,92,246,0.2)'
            }}
          >
            <Sparkles size={32} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Welcome to{' '}
            <span className="gradient-text">PU Assistant AI</span>
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Your intelligent campus companion for Poornima University. Get instant answers about admissions, courses, fees, and more.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 text-sm">
            {[
              { label: '5000+', sub: 'Active Students' },
              { label: '300+', sub: 'Recruiters' },
              { label: '20+', sub: 'Topics Covered' },
              { label: '4.9★', sub: 'Average Rating' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div className="text-2xl font-bold gradient-text mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4285F4, #8B5CF6)', boxShadow: '0 0 20px rgba(66,133,244,0.4)' }}
            >
              <Sparkles size={14} className="text-white" />
            </div>
            <Link to="/" className="font-bold text-white text-lg">
              PU <span className="gradient-text-static">Assistant</span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>Sign In</h2>
          <p className="text-slate-400 mb-8 text-sm">Welcome back! Sign in to your Poornima AI account.</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-2xl p-4 mb-6 text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
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
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#4285F4' }}
                />
                <span className="text-sm text-slate-400">Remember me</span>
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
              style={{ borderRadius: '14px' }}
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

          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <span className="text-slate-600 text-xs">Demo Credentials</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
            <div
              className="grid grid-cols-2 gap-3 text-xs text-slate-500 rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <div className="text-slate-400 font-medium mb-1">Student</div>
                <div>student@poornima.org</div>
                <div>Student@123</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium mb-1">Admin</div>
                <div>admin@poornima.org</div>
                <div>Admin@PU2024</div>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">
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
