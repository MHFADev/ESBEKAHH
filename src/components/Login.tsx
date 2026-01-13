import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AlertTriangle, Star, Bomb, RoseIcon, TulipIcon, BlueElement, PeanutIcon } from './Icons';
import { ALLOWED_AGENTS, MASTER_KEY } from '../constants';

interface LoginProps {
  onLoginSuccess: (agentId: string) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // REMOVED ARTIFICIAL DELAY - INSTANT LOGIN
    // await new Promise(resolve => setTimeout(resolve, 1500)); 

    const isValidUser = ALLOWED_AGENTS.includes(agentId);
    const isValidKey = password === MASTER_KEY;

    if (isValidUser && isValidKey) {
      onLoginSuccess(agentId);
    } else {
      setError(true);
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        className="w-full max-w-md perspective-1000"
      >
        {/* Folder Tab Look */}
        <div className="w-1/2 h-8 bg-spy-cream rounded-t-lg ml-0 border-t border-l border-r border-spy-dark/10 relative -mb-1 z-0 translate-y-1">
            <span className="text-[10px] font-mono text-spy-dark/50 p-2 font-bold">CONFIDENTIAL</span>
        </div>

        {/* Paper Dossier Card */}
        <motion.div
          animate={error ? { x: [-5, 5, -5, 5, 0], rotate: [0, -1, 1, 0] } : {}}
          className="bg-spy-cream text-spy-dark rounded-b-lg rounded-tr-lg p-8 shadow-2xl relative overflow-hidden border-l-4 border-l-spy-red"
          style={{ backgroundImage: 'repeating-linear-gradient(#f5f5dc 0px, #f5f5dc 24px, #e5e5cc 25px)' }}
        >
            {/* Top Secret Stamp */}
            <div className="absolute top-4 right-4 border-4 border-spy-red/30 rounded px-2 py-1 -rotate-12 pointer-events-none">
                <span className="text-spy-red/30 font-black text-xl font-display uppercase tracking-widest">
                    TOP SECRET
                </span>
            </div>

            <div className="text-center mb-8">
                <div className="flex justify-center gap-6 mb-4">
                    <BlueElement className="w-8 h-8 opacity-50" />
                    <BlueElement className="w-8 h-8 opacity-50" />
                </div>
                <h1 className="text-3xl font-display font-bold text-spy-dark border-b-2 border-spy-dark pb-2 inline-block">
                    MISSION: LOGIN
                </h1>
                <p className="font-mono text-xs mt-2 text-spy-dark/70">
                    TARGET: ESBEKAHH ARCHIVES
                </p>
            </div>

            <AnimatePresence mode="wait">
                {error ? (
                        <motion.div
                           key="error"
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0 }}
                           className="flex flex-col items-center justify-center mb-6"
                        >
                           <PeanutIcon className="w-24 h-24 text-spy-dark mb-2" />
                           <p className="font-hand text-xl text-spy-dark font-bold">Heh. Wrong Password.</p>
                           <button 
                               onClick={() => setError(false)}
                               className="mt-2 text-xs underline text-spy-red hover:text-spy-dark"
                           >
                               TRY AGAIN
                           </button>
                        </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div className="relative group">
                            <label className="block text-xs font-bold font-mono uppercase mb-1">Agent Codename</label>
                            <input
                                type="text"
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-spy-dark/20 focus:border-spy-green px-2 py-2 font-mono outline-none transition-colors placeholder:text-spy-dark/20"
                                placeholder="007"
                            />
                            <div className="absolute right-2 bottom-2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                <Bomb className="w-4 h-4 text-spy-green" />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-xs font-bold font-mono uppercase mb-1">Cipher Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-spy-dark/20 focus:border-spy-green px-2 py-2 font-mono outline-none transition-colors"
                                placeholder="••••"
                            />
                            <div className="absolute right-2 bottom-2 text-spy-dark/40">
                                <Lock className="w-4 h-4" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-spy-dark text-spy-cream font-bold py-3 px-4 rounded-sm hover:bg-spy-green transition-all shadow-lg flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                                    <Star className="w-5 h-5 fill-spy-gold text-spy-gold" />
                                </motion.div>
                            ) : (
                                <>
                                    <span>INFILTRATE SYSTEM</span>
                                    <Star className="w-4 h-4 group-hover:fill-spy-gold group-hover:text-spy-gold transition-colors" />
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
          
            <div className="mt-6 border-t border-spy-dark/10 pt-4 text-center">
                <button 
                    onClick={onBack}
                    className="text-xs font-mono text-spy-dark/50 hover:text-spy-red transition-colors"
                >
                    ABORT MISSION
                </button>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;