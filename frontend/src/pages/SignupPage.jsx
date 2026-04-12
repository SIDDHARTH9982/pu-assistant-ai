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
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#050714' }}>

      {/* Global Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-purple" style={{ width: '600px', height: '600px', top: '-15%', left: '-10%', opacity: 0.55 }} />
        <div className="orb orb-blue" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', opacity: 0.5 }} />
        <div className="orb orb-cyan" style={{ width: '350px', height: '350px', top: '40%', left: '35%', opacity: 0.3 }} />
        <div className="absolute inset-0 star-field opacity-30" />
      </div>
      <div className="noise-overlay" />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-12">
        <div className="relative z-10 text-center max-w-md">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #4285F4)',
              boxShadow: '0 0 60px rgba(139,92,246,0.5), 0 0 120px rgba(66,133,244,0.2)'
            }}
          >
            <Sparkles size={32} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Join <span className="gradient-text">PU Assistant AI</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10">
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
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(66,133,244,0.15)', border: '1px solid rgba(66,133,244,0.3)' }}
                >
                  <CheckCircle size={12} className="text-primary-400" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
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

          <h2 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>Create Account</h2>
          <p className="text-slate-400 mb-8 text-sm">Join Poornima University's AI assistant platform.</p>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-4 mt-2.5">
                  {passwordChecks.map((check) => (
                    <div key={check.label} className={`flex items-center gap-1.5 text-xs ${check.pass ? 'text-green-400' : 'text-slate-600'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${check.pass ? 'bg-green-400' : 'bg-slate-700'}`} />
                      {check.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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
              style={{ borderRadius: '14px' }}
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

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

          <p className="text-center text-slate-700 text-xs mt-4">
            By creating an account you agree to our{' '}
            <span className="text-slate-600">Terms of Service</span> and{' '}
            <span className="text-slate-600">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
