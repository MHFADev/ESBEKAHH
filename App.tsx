import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { ViewState, ArchiveImage } from './types';
import { dbService } from './services/db';
import { apiService } from './services/api';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [images, setImages] = useState<ArchiveImage[]>([]);

  const loadImages = async () => {
    try {
      const localData = await dbService.getAllArchives();
      if (localData && localData.length > 0) setImages(localData);
      await apiService.initDatabase();
      const fetchedImages = await apiService.getImages();
      if (fetchedImages && fetchedImages.length > 0) setImages(fetchedImages);
    } catch (e) {
      console.error("Failed to load images:", e);
    }
  };

  useEffect(() => {
    loadImages();
    // Simple real-time sync (poll every 30s)
    const interval = setInterval(loadImages, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAddImage = (newImage: ArchiveImage) => {
    setImages(prev => {
      const exists = prev.find(img => img.id === newImage.id);
      if (exists) return prev.map(img => img.id === newImage.id ? newImage : img);
      return [newImage, ...prev];
    });
  };

  const handleDeleteImage = (id: string | number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleVisitorEntry = async () => {
    await loadImages();
    setIsReadOnly(true);
    setCurrentAgent('GUEST');
    setView('DASHBOARD');
  };

  const handleLoginSuccess = async (agentId: string) => {
    await loadImages();
    setIsReadOnly(false);
    setCurrentAgent(agentId);
    setView('DASHBOARD');
  };

  return (
    <div className="min-h-screen bg-spy-dark text-garden-pink font-sans selection:bg-garden-rose selection:text-white relative">
      <Background />
      <AnimatePresence mode="wait">
        {view === 'LANDING' && (
           <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}>
             <Landing onVisitorEntry={handleVisitorEntry} onMemberEntry={() => setView('LOGIN')} />
           </motion.div>
        )}
        {view === 'LOGIN' && (
          <motion.div key="login" initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}>
            <Login onLoginSuccess={handleLoginSuccess} onBack={() => setView('LANDING')} />
          </motion.div>
        )}
        {view === 'DASHBOARD' && (
          <motion.div key="dashboard" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 50 }}>
            <Dashboard 
              agentId={currentAgent} 
              isReadOnly={isReadOnly}
              onLogout={() => { setView('LANDING'); setCurrentAgent(''); }}
              images={images}
              onAddImage={handleAddImage}
              onDeleteImage={handleDeleteImage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
