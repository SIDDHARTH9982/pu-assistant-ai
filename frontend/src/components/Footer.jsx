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
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,7,20,0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #4285F4, #8B5CF6)',
                  boxShadow: '0 0 24px rgba(66,133,244,0.35)'
                }}
              >
                <Sparkles size={19} className="text-white" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">
                PU <span className="gradient-text-static">Assistant AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              Your intelligent campus companion for Poornima University. Powered by Gemini AI, built for students, parents, and aspirants.
            </p>
            <div className="space-y-2.5 text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <MapPin size={13} className="text-primary-400 flex-shrink-0" />
                <span>Sitapura, Jaipur - 302022, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="text-primary-400 flex-shrink-0" />
                <span>+91-141-5160400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} className="text-primary-400 flex-shrink-0" />
                <span>info@poornima.org</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="font-semibold text-white mb-5 text-xs uppercase tracking-widest"
                style={{ letterSpacing: '0.1em' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {item.label}
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-slate-600 text-xs">
            © 2024 PU Assistant AI · Poornima University, Jaipur · All rights reserved
          </p>

          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made by
            <span className="text-white font-semibold mx-0.5">Siddharth</span>
            <span
              className="inline-block text-red-500"
              style={{
                animation: 'heartbeat 1.2s ease-in-out infinite',
                display: 'inline-block',
                fontSize: '1rem',
              }}
            >❤️</span>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaTwitter, href: '#', label: 'Twitter' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/siddharth-kumawat-556aab3a6/', label: 'LinkedIn' },
              { icon: FaInstagram, href: '#', label: 'Instagram' },
              { icon: FaYoutube, href: '#', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(100,116,139,0.8)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(66,133,244,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(66,133,244,0.3)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(66,133,244,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(100,116,139,0.8)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
