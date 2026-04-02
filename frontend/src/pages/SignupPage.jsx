import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const passwordChecks = [
    { label: 'At least 6 characters', pass: form.password.length >= 6 },
    { label: 'Contains a letter', pass: /[a-zA-Z]/.test(form.password) },
    { label: 'Contains a number', pass: /[0-9]/.test(form.password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="hero-glow" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }} />
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
            <Sparkles size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Join <span className="gradient-text">PU Assistant AI</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Create your account and get instant access to AI-powered answers for everything Poornima University.
          </p>
          <div className="space-y-4 text-left">
            {[
              'Instant answers about admissions & courses',
              'Complete fee & scholarship information',
              'Placement records & campus life info',
              'Chat history & personalized experience',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
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

          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Join Poornima University's AI assistant platform.</p>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-3 mt-2">
                  {passwordChecks.map((check) => (
                    <div key={check.label} className={`flex items-center gap-1 text-xs ${check.pass ? 'text-green-400' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${check.pass ? 'bg-green-400' : 'bg-gray-600'}`} />
                      {check.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="signup-confirm"
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="signup-submit"
              className="w-full btn-primary py-3.5 justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

          <p className="text-center text-gray-600 text-xs mt-4">
            By creating an account you agree to our{' '}
            <span className="text-gray-500">Terms of Service</span> and{' '}
            <span className="text-gray-500">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
