import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const links = {
    Platform: [
      { label: 'AI Chat', href: '/chat' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    University: [
      { label: 'Admissions', href: '#' },
      { label: 'Courses', href: '#' },
      { label: 'Placements', href: '#' },
      { label: 'About PU', href: 'https://poornima.org', external: true },
    ],
    Support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
    ]
  };

  return (
    <footer className="border-t border-white/5 bg-dark-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-xl">PU <span className="gradient-text">Assistant AI</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your intelligent campus companion for Poornima University. Powered by Gemini AI, built for students, parents, and aspirants.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary-400 flex-shrink-0" />
                <span>Sitapura, Jaipur - 302022, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary-400 flex-shrink-0" />
                <span>+91-141-5160400</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary-400 flex-shrink-0" />
                <span>info@poornima.org</span>
              </div>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                      >
                        {item.label} <ExternalLink size={10} />
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 PU Assistant AI · Poornima University, Jaipur · All rights reserved
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made by <span className="text-white font-semibold mx-1">Siddharth</span>
            <span
              className="inline-block text-red-500"
              style={{
                animation: 'heartbeat 1.2s ease-in-out infinite',
                display: 'inline-block',
                fontSize: '1.1rem',
              }}
            >❤️</span>
            <style>{`
              @keyframes heartbeat {
                0%   { transform: scale(1); }
                14%  { transform: scale(1.3); }
                28%  { transform: scale(1); }
                42%  { transform: scale(1.2); }
                70%  { transform: scale(1); }
              }
            `}</style>
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: FaTwitter, href: '#', label: 'Twitter' },
              { icon: FaLinkedin, href: 'https://linkedin.com/school/poornima-university', label: 'LinkedIn' },
              { icon: FaInstagram, href: '#', label: 'Instagram' },
              { icon: FaYoutube, href: '#', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
