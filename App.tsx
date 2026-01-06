import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { ViewState, ArchiveImage } from './types';
import { MOCK_IMAGES, HIDDEN_ARCHIVES, DIRECTORY_PATH } from './constants';
import { dbService } from './services/db';
import { apiService } from './services/api';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  
  // Shared State for Images
  const [images, setImages] = useState<ArchiveImage[]>([]);

  // Initialize DB and Load Data
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Coba load dari Local IndexedDB dulu (cepat & offline friendly)
        const localData = await dbService.getAllArchives();
        if (localData && localData.length > 0) {
          setImages(localData);
        }

        // Kemudian coba sync/load dari Supabase
        await apiService.initDatabase();
        const fetchedImages = await apiService.getImages();
        if (fetchedImages && fetchedImages.length > 0) {
          setImages(fetchedImages);
        }
      } catch (e) {
        console.error("Failed to load images:", e);
      }
    };
    loadImages();
  }, []);

  const handleAddImage = (newImage: ArchiveImage) => {
    setImages(prev => [newImage, ...prev]);
  };

  const handleVisitorEntry = async () => {
    try {
      const freshData = await apiService.getImages();
      if (freshData && freshData.length > 0) setImages(freshData);
    } catch (e) {
      console.error("Failed to reload images:", e);
    }
    setIsReadOnly(true);
    setCurrentAgent('GUEST');
    setView('DASHBOARD');
  };

  const handleMemberEntry = () => {
    setView('LOGIN');
  };

  const handleLoginSuccess = async (agentId: string) => {
    try {
      const freshData = await apiService.getImages();
      if (freshData && freshData.length > 0) setImages(freshData);
    } catch (e) {
      console.error("Failed to reload images:", e);
    }
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