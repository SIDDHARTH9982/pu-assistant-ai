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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={scrolled ? {
        background: 'rgba(5, 7, 20, 0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #4285F4, #8B5CF6)',
                boxShadow: '0 0 20px rgba(66,133,244,0.4)'
              }}
            >
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              PU <span className="gradient-text-static">Assistant</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="nav-link text-sm"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <Link
                  to="/chat"
                  className="btn-primary text-sm py-2 px-4"
                  style={{ borderRadius: '12px' }}
                >
                  Open Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(248,113,113,0.8)' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(252,165,165,1)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(248,113,113,0.8)'}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm py-2 px-5"
                  style={{ borderRadius: '12px' }}
                >
                  Get Started <ChevronRight size={13} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden transition-colors duration-200"
            style={{ color: 'rgba(148,163,184,0.8)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            style={{
              background: 'rgba(5,7,20,0.95)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
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
              <div className="pt-3 border-t border-white/5 space-y-2">
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
