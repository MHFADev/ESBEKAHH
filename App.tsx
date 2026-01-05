import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { ViewState, ArchiveImage } from './types';
import { MOCK_IMAGES, HIDDEN_ARCHIVES, DIRECTORY_PATH } from './constants';
import { dbService } from './services/db';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  
  // Shared State for Images
  const [images, setImages] = useState<ArchiveImage[]>([]);

  // Initialize DB and Load Data
  useEffect(() => {
    const loadFromDB = async () => {
        try {
            await dbService.connect();
            const storedImages = await dbService.getAllArchives();
            
            if (storedImages.length > 0) {
                setImages(storedImages);
            } else {
                // Initial Seed if DB is empty (First time load)
                const seedImages = MOCK_IMAGES.map((url, i) => ({
                    id: `mock-${i}`,
                    url,
                    thumbnailUrl: url,
                    timestamp: new Date().toISOString(),
                    clearanceLevel: (i % 2 === 0 ? 'TOP SECRET' : 'CLASSIFIED') as any,
                    name: `MISSION_PHOTO_00${i + 1}`,
                    fileName: `evidence_batch_${i + 1}.jpg`,
                    virtualPath: DIRECTORY_PATH,
                    description: 'Intelligence recovered from Operation Strix field work.'
                }));
                setImages(seedImages);
            }
        } catch (e) {
            console.error("Failed to load from DB:", e);
        }
    };
    loadFromDB();
  }, []);

  const handleAddImage = (newImage: ArchiveImage) => {
    setImages(prev => [newImage, ...prev]);
  };

  const handleVisitorEntry = async () => {
    // Reload from DB to ensure visitor sees latest data
    const freshData = await dbService.getAllArchives();
    if (freshData.length > 0) setImages(freshData);

    setIsReadOnly(true);
    setCurrentAgent('GUEST');
    setView('DASHBOARD');
  };

  const handleMemberEntry = () => {
    setView('LOGIN');
  };

  const handleLoginSuccess = async (agentId: string) => {
     // Reload from DB
    const freshData = await dbService.getAllArchives();
    if (freshData.length > 0) setImages(freshData);

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