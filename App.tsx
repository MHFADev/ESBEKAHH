import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { ViewState, ArchiveImage } from './types';
import { apiService } from './services/api';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [images, setImages] = useState<ArchiveImage[]>([]);

  useEffect(() => {
    const initDB = async () => {
      try {
        await apiService.initDatabase();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    initDB();
  }, []);

  const loadImages = async () => {
    try {
      const fetchedImages = await apiService.getImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Failed to load images:', error);
      setImages([]);
    }
  };

  const handleAddImage = (newImage: ArchiveImage) => {
    setImages(prev => [newImage, ...prev]);
  };

  const handleVisitorEntry = async () => {
    await loadImages();
    setIsReadOnly(true);
    setCurrentAgent('GUEST');
    setView('DASHBOARD');
  };

  const handleMemberEntry = () => {
    setView('LOGIN');
  };

  const handleLoginSuccess = async (agentId: string) => {
    await loadImages();
    setIsReadOnly(false);
    setCurrentAgent(agentId);
    setView('DASHBOARD');
  };

  const handleBackToLanding = () => {
    setView('LANDING');
    setCurrentAgent('');
  };

  return (
    <div className="min-h-screen bg-spy-dark text-garden-pink font-sans selection:bg-garden-rose selection:text-white relative">
      <Background />
      
      <AnimatePresence mode="wait">
        {view === 'LANDING' && (
           <motion.div
             key="landing"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
             transition={{ duration: 0.2 }}
             className="w-full"
           >
             <Landing 
                onVisitorEntry={handleVisitorEntry} 
                onMemberEntry={handleMemberEntry} 
             />
           </motion.div>
        )}

        {view === 'LOGIN' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackToLanding} />
          </motion.div>
        )}

        {view === 'DASHBOARD' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Dashboard 
              agentId={currentAgent} 
              isReadOnly={isReadOnly}
              onLogout={handleBackToLanding}
              images={images}
              onAddImage={handleAddImage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}