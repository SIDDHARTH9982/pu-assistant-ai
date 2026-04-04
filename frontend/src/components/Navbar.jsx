import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Report', href: '/presentation.html', external: true },
    { label: 'Features', href: '#features' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (href) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 shadow-xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">
              PU <span className="gradient-text">Assistant</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="nav-link text-sm"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <Link to="/chat" className="btn-primary text-sm py-2 px-4">
                  Open Chat
                </Link>
                <button onClick={handleLogout} className="nav-link text-sm text-red-400 hover:text-red-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-sm">Sign In</Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5">
                  Get Started <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left nav-link py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left nav-link py-2"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <div className="pt-3 border-t border-white/10 space-y-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block btn-secondary text-center text-sm py-2">Dashboard</Link>
                    <Link to="/chat" className="block btn-primary text-center text-sm py-2">Open Chat</Link>
                    <button onClick={handleLogout} className="block w-full text-center text-red-400 text-sm py-2">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block btn-secondary text-center text-sm py-2">Sign In</Link>
                    <Link to="/signup" className="block btn-primary text-center text-sm py-2">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
