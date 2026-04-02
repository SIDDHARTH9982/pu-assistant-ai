import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, MessageSquare, BookOpen, GraduationCap,
  Building, Users, Trophy, ChevronDown, Star, CheckCircle,
  Zap, Shield, Globe, Brain, Send, Bot, User as UserIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const HeroSection = () => {
  const [demoInput, setDemoInput] = useState('');
  const demoMessages = [
    { role: 'user', content: 'What is the fee for B.Tech CSE?' },
    { role: 'assistant', content: 'The annual tuition fee for **B.Tech CSE** at Poornima University is **₹1,10,000 per year**. Scholarships are available for merit students. Would you like details about scholarships?' },
    { role: 'user', content: 'Yes, tell me about scholarships' },
    { role: 'assistant', content: '🎓 **Available Scholarships:**\n- Vice Chancellor Scholarship: 100% waiver (JEE top rank)\n- Gold Merit: 50% waiver (95%+ in Class 12)\n- Silver Merit: 25% waiver (90-94%)\n- Bronze Merit: 10% waiver (85-89%)' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="hero-glow" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }} />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #00D4FF, transparent)', animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <Sparkles size={14} className="text-primary-400" />
              <span className="text-sm text-gray-300">Powered by Google Gemini AI</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <h1 className="section-title mb-6">
              Your Smart Campus<br />
              Companion for<br />
              <span className="gradient-text">Poornima University</span>
            </h1>

            <p className="section-subtitle mb-8 max-w-lg mx-auto lg:mx-0">
              AI-powered answers for admissions, courses, fees, scholarships, placements, hostel, and campus support — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chat" id="hero-try-demo" className="btn-primary text-base px-8 py-4">
                <MessageSquare size={18} />
                Try Demo Free
              </Link>
              <a
                href="https://poornima.org/admission"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4"
              >
                <GraduationCap size={18} />
                Explore Admissions
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { label: '5,000+ Students', icon: Users },
                { label: 'Gemini Powered', icon: Brain },
                { label: '20+ Topics', icon: BookOpen },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={14} className="text-primary-400" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-1 shadow-2xl" style={{ boxShadow: '0 0 60px rgba(108,99,255,0.2)' }}>
              <div className="rounded-[22px] overflow-hidden" style={{ background: '#0D0E24' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <Bot size={14} className="text-primary-400" />
                    <span className="text-xs text-gray-400 font-medium">PU Assistant AI</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>

                <div className="p-4 space-y-3 h-80 overflow-y-auto">
                  {demoMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.3 }}
                      className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-primary-600/30 text-primary-400'
                          : 'text-white'
                      }`} style={msg.role === 'assistant' ? { background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' } : {}}>
                        {msg.role === 'user' ? <UserIcon size={12} /> : <Bot size={12} />}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary-600/20 text-primary-100 rounded-tr-sm'
                          : 'glass text-gray-200 rounded-tl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="flex gap-2"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                      <Bot size={12} />
                    </div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </motion.div>
                </div>

                <div className="p-3 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ask about Poornima University..."
                    className="flex-1 text-xs bg-white/5 rounded-xl px-3 py-2 outline-none text-gray-300 placeholder-gray-600 border border-white/5"
                  />
                  <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs text-white flex items-center gap-2 animate-float">
              <Trophy size={12} className="text-yellow-400" />
              <span>#1 Campus AI Tool</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs text-white flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>4.9/5 Student Rating</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs"
        >
          <span>Scroll to explore</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    'NAAC Accredited', 'UGC Recognized', '5000+ Students', '300+ Recruiters',
    'AICTE Approved', 'ISO 9001:2015', '2100+ Placements', 'NIRF Ranked',
  ];

  return (
    <section className="py-8 border-y border-white/5 overflow-hidden">
      <div className="flex animate-[scroll_25s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-8 text-gray-500 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }} />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Admissions Guide',
      desc: 'Step-by-step admission help for all programs. Eligibility, documents, and deadlines at your fingertips.',
      gradient: 'from-violet-500/20 to-purple-500/10'
    },
    {
      icon: BookOpen,
      title: 'Course Finder',
      desc: 'Explore 50+ programs across Engineering, Management, Law, and Science with detailed curriculum info.',
      gradient: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      icon: Building,
      title: 'Fee & Scholarships',
      desc: 'Get complete fee structure, scholarship eligibility, and financial aid options instantly.',
      gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      icon: Trophy,
      title: 'Placement Insights',
      desc: 'Know about placement stats, top recruiters, salary packages, and career development programs.',
      gradient: 'from-orange-500/20 to-amber-500/10'
    },
    {
      icon: Users,
      title: 'Hostel & Campus',
      desc: 'Complete info about hostel facilities, mess, sports, transport, and campus amenities.',
      gradient: 'from-pink-500/20 to-rose-500/10'
    },
    {
      icon: Brain,
      title: 'Smart AI Assistant',
      desc: 'Understands Hinglish, handles typos, and gives structured answers like a real university advisor.',
      gradient: 'from-indigo-500/20 to-violet-500/10'
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">Platform Features</span>
          <h2 className="section-title mb-4">Everything You Need to Know<br />About <span className="gradient-text">Poornima University</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            One AI assistant covering every aspect of university life — from the first inquiry to graduation day.
          </p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
                className="card group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const WhySection = () => {
  const benefits = [
    { title: 'Instant Accurate Answers', desc: 'No more waiting in queues or searching through brochures. Get answers in seconds.', icon: Zap },
    { title: 'Always Up to Date', desc: "Admission deadlines, fee updates, placement records — all managed by the university team.", icon: Globe },
    { title: 'Safe & Secure', desc: 'Your data is protected. API keys never exposed. JWT-secured sessions throughout.', icon: Shield },
    { title: 'Understands You', desc: 'Works with Hinglish, spelling mistakes, and vague questions — just like a knowledgeable friend.', icon: Brain },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp}>
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">Why PU Assistant AI</span>
            <h2 className="section-title mb-6">Built for the Poornima<br /><span className="gradient-text">University Community</span></h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Thousands of students, parents, and aspirants visit Poornima University every year with questions. PU Assistant AI is designed to answer them instantly, accurately, and beautifully.
            </p>
            <Link to="/signup" className="btn-primary">
              Start for Free <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div {...stagger} className="space-y-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 } }}
                  className="flex gap-4 card"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))' }}>
                    <Icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm">{b.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const UseCasesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Students', icon: GraduationCap,
      scenarios: [
        'Chat with AI about exam schedules and results',
        'Get hostel booking and fee payment guidance',
        'Find scholarship eligibility instantly',
        'Access placement preparation resources',
        'Get course and assignment information',
      ]
    },
    {
      label: 'Parents', icon: Users,
      scenarios: [
        'Know complete fee structure & payment plan',
        'Understand hostel safety and facilities',
        'Track scholarship and financial aid options',
        'Get placement records and company visits',
        'Contact university departments directly',
      ]
    },
    {
      label: 'Aspirants', icon: BookOpen,
      scenarios: [
        'Compare courses and eligibility requirements',
        'Know the admission process step by step',
        'Understand campus and facilities virtually',
        'Get scholarship info before applying',
        'Connect with admissions counselors',
      ]
    },
    {
      label: 'Faculty', icon: Building,
      scenarios: [
        'Quick access to university policy documents',
        'Research resources and lab information',
        'Event scheduling and campus news',
        'Student support services overview',
        'Administration contacts and procedures',
      ]
    },
  ];

  return (
    <section id="use-cases" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">Use Cases</span>
          <h2 className="section-title mb-4">Built for <span className="gradient-text">Everyone</span> at Poornima</h2>
          <p className="section-subtitle max-w-xl mx-auto">Whether you're a student, parent, aspirant, or faculty — PU Assistant AI speaks your language.</p>
        </motion.div>

        <motion.div {...fadeUp}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'text-white shadow-lg shadow-primary/30'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                  style={activeTab === i ? { background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' } : {}}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card space-y-4"
            >
              {tabs[activeTab].scenarios.map((scenario, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{scenario}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-white/5">
                <Link to="/chat" className="btn-primary text-sm py-2.5">
                  Try as {tabs[activeTab].label} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const plans = [
    {
      name: 'Student Access',
      price: 'Free',
      period: 'Always free',
      desc: 'Everything a student needs to navigate Poornima University.',
      features: [
        'AI Chat with PU knowledge base',
        '50 messages per day',
        'Quick suggestion chips',
        'Chat history (5 sessions)',
        'FAQ access',
        'Mobile app ready',
      ],
      cta: 'Get Started Free',
      href: '/signup',
      highlight: false
    },
    {
      name: 'Premium Support',
      price: '₹99',
      period: 'per month',
      desc: 'Enhanced access for power users, alumni, and parents.',
      features: [
        'Everything in Student Access',
        'Unlimited messages',
        'Priority AI responses',
        'Unlimited chat history',
        'Saved knowledge bookmarks',
        'Email support',
        'Admission counselor connect',
      ],
      cta: 'Start Free Trial',
      href: '/signup',
      highlight: true
    },
    {
      name: 'Institution Admin',
      price: 'Custom',
      period: 'for university',
      desc: 'Full admin panel for university staff to manage knowledge base.',
      features: [
        'Admin dashboard',
        'Knowledge base management',
        'FAQ and notice management',
        'Analytics and insights',
        'Multi-admin support',
        'Priority support & SLA',
        'API access',
      ],
      cta: 'Contact Us',
      href: 'mailto:info@poornima.org',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">Pricing</span>
          <h2 className="section-title mb-4">Simple, <span className="gradient-text">Transparent</span> Pricing</h2>
          <p className="section-subtitle max-w-xl mx-auto">Access Poornima University's AI assistant at every level — from students to administration.</p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'border border-primary-500/50 shadow-2xl shadow-primary-500/20'
                  : 'glass'
              }`}
              style={plan.highlight ? { background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.05))' } : {}}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold text-white px-4 py-1.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">/{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={15} className="text-primary-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.highlight
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Arjun Sharma',
      role: 'B.Tech CSE, 2024',
      content: 'PU Assistant AI saved me hours of searching. I got all my scholarship details and admission info in minutes. This is genuinely amazing!',
      rating: 5
    },
    {
      name: 'Priya Mehta',
      role: 'MBA Student',
      content: 'As a parent, I was confused about fee structure. The AI gave me a complete breakdown in seconds. I wish this existed when we were applying!',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Aspiring Student',
      content: "I'm from a small town and had so many questions before applying. PU Assistant answered everything — from hostel facilities to placement packages!",
      rating: 5
    },
    {
      name: 'Dr. Neha Singh',
      role: 'Faculty, CSE Dept',
      content: 'The admin panel makes it easy to update FAQ content. Students no longer flood our emails with basic queries — the AI handles them brilliantly.',
      rating: 5
    },
    {
      name: 'Vikram Choudhary',
      role: 'B.Tech ECE, 2025',
      content: "It even understood my Hinglish questions! When I asked 'bhai hostel mein wifi hai kya?' it gave me a full breakdown. Mind-blowing!",
      rating: 5
    },
    {
      name: 'Sunita Agarwal',
      role: 'Parent, Jaipur',
      content: "My daughter was worried about placements. One conversation with PU Assistant and she had all the data she needed. Highly recommend to all parents.",
      rating: 5
    },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">Testimonials</span>
          <h2 className="section-title mb-4">Loved by the <span className="gradient-text">Poornima Community</span></h2>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
              className="card"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is PU Assistant AI?',
      a: 'PU Assistant AI is an intelligent chatbot platform built exclusively for Poornima University, Jaipur. It answers questions about admissions, courses, fees, scholarships, hostel, placements, and campus life using Google Gemini AI.'
    },
    {
      q: 'Is the information provided accurate and up-to-date?',
      a: 'Yes. The knowledge base is maintained by Poornima University staff and updated regularly. The AI answers only from verified university data. For any missing info, it directs you to the official contact.'
    },
    {
      q: 'Can I use this for admission guidance?',
      a: 'Absolutely! PU Assistant AI provides step-by-step admission guidance, eligibility criteria, required documents, deadline information, and scholarship details for all programs.'
    },
    {
      q: 'Does the AI understand Hindi or Hinglish?',
      a: 'Yes! The AI understands Hinglish (mix of Hindi and English) and handles spelling mistakes gracefully. You can ask questions naturally, like you would to a friend.'
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. All conversations are encrypted, passwords are hashed with bcrypt, and the Gemini API key is never exposed to the frontend. Your personal data is never shared with third parties.'
    },
    {
      q: 'Who can use PU Assistant AI?',
      a: 'Students, parents, admission aspirants, faculty, and visitors to Poornima University. Each user type gets a tailored experience with relevant quick actions and suggestions.'
    },
    {
      q: 'Can university staff manage the content?',
      a: 'Yes! The Admin Panel lets university staff update FAQs, notices, knowledge base entries, fee structures, and more — without any coding knowledge.'
    },
    {
      q: 'Is there a mobile app?',
      a: 'PU Assistant AI is a fully responsive Progressive Web App (PWA) that works perfectly on all mobile devices. No download needed — just open the browser and go!'
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-3 block">FAQ</span>
          <h2 className="section-title mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
        </motion.div>

        <motion.div {...stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={{ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 } }}
              className="card cursor-pointer select-none"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-medium text-white text-sm">{faq.q}</h4>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </div>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-gray-400 text-sm mt-3 leading-relaxed border-t border-white/5 pt-3"
                >
                  {faq.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.08))' }} />
    <div className="absolute inset-0 bg-dot-pattern opacity-20" />

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div {...fadeUp}>
        <Sparkles size={48} className="text-primary-400 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Explore<br />
          <span className="gradient-text">Poornima University</span>?
        </h2>
        <p className="section-subtitle mb-10 max-w-xl mx-auto">
          Join thousands of students and parents who use PU Assistant AI to get instant answers about campus, admissions, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" id="cta-signup" className="btn-primary text-base px-10 py-4">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <a
            href="https://poornima.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-10 py-4"
          >
            Visit Official Website
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <FeaturesSection />
      <WhySection />
      <UseCasesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
