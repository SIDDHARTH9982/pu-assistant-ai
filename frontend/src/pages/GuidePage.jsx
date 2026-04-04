import { motion } from 'framer-motion';
import { Database, Bot, Zap, ArrowRight, Layout, Server, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GuidePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const steps = [
    {
      icon: <Database size={24} className="text-gray-400" />,
      title: 'Knowledge Retrieval',
      desc: 'Searches Poornima Universitys dedicated database for accurate, up-to-date context.'
    },
    {
      icon: <Cpu size={24} className="text-gray-400" />,
      title: 'Processing',
      desc: 'Context is injected into the prompt using our custom RAG architecture.'
    },
    {
      icon: <Bot size={24} className="text-gray-400" />,
      title: 'Generation',
      desc: 'Google Gemini AI crafts a precise response tailored specifically to the university.'
    }
  ];

  const stack = [
    { label: 'Frontend', name: 'React + Vite', icon: <Layout size={20} /> },
    { label: 'Backend', name: 'Node.js', icon: <Server size={20} /> },
    { label: 'Database', name: 'MongoDB', icon: <Database size={20} /> },
    { label: 'AI Engine', name: 'Gemini Pro', icon: <Zap size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 font-sans selection:bg-white/10 pt-24 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="pb-16 border-b border-white/10 mb-16"
        >
          <div className="inline-block px-3 py-1 border border-white/10 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 text-gray-400">
            System Guide ///
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            PU Assistant Architecture
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            An industrial-grade RAG (Retrieval-Augmented Generation) system designed specifically for Poornima University. Built for speed, accuracy, and reliability.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeIn}
          className="mb-24"
        >
          <h2 className="text-2xl font-semibold text-white mb-10 tracking-tight">System Workflow</h2>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-[28px] left-[15%] w-[70%] border-t border-dashed border-white/10 -z-10"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="bg-[#0f0f15] border border-white/5 p-8 rounded-2xl relative group hover:border-white/20 transition-colors duration-300">
                <div className="w-14 h-14 bg-[#1a1a24] rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-white/5 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed text-balance">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stack.map((tech, idx) => (
              <div key={idx} className="border border-white/10 p-6 rounded-xl flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                <div className="text-gray-500 mb-4">{tech.icon}</div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{tech.label}</div>
                  <div className="text-white font-medium">{tech.name}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default GuidePage;
