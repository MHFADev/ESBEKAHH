import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Upload, Lock, Star, PeanutIcon, Crosshair, RoseIcon, TulipIcon, ButterflyIcon, Search, AlertTriangle, BlueElement, Trash2 } from './Icons';
import { ArchiveImage } from '../types';
import { CHARACTERS, DIRECTORY_PATH, DB_CONFIG } from '../constants';
import { dbService } from '../services/db';
import { apiService } from '../services/api';
import VisitorVisor from './VisitorVisor';
import VisionGallery from './VisionGallery';
import CustomAlert from './CustomAlert';

const compressImageToBase64 = (file: File, quality = 0.8, maxWidth = 800): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

interface DashboardProps {
  agentId: string;
  isReadOnly?: boolean;
  onLogout: () => void;
  images: ArchiveImage[];
  onAddImage: (img: ArchiveImage) => void;
  onDeleteImage?: (id: string | number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ agentId, isReadOnly = false, onLogout, images, onAddImage, onDeleteImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void, type: 'confirm' | 'alert'}>({
    isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'alert'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showAlert = (title: string, message: string, onConfirm: () => void, type: 'confirm' | 'alert' = 'confirm') => {
    setAlertConfig({ isOpen: true, title, message, onConfirm, type });
  };

  const handleDelete = async (imgId: string | number) => {
    showAlert(
      "DESTROY INTEL?", 
      "ARE YOU SURE YOU WANT TO PERMANENTLY ERASE THIS CLASSIFIED DOCUMENT? THIS ACTION CANNOT BE UNDONE.",
      async () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
        setIsDeleting(true);
        try {
          // Sync with server if it exists
          try {
            await apiService.deleteImage(imgId);
          } catch (e) {
            console.warn("Server deletion failed, continuing with local:", e);
          }
          await dbService.deleteArchive(imgId);
          onDeleteImage?.(imgId);
          setSelectedImage(null);
        } catch (error) {
          console.error("Deletion failed:", error);
          showAlert("MISSION FAILED", "COULD NOT DESTROY INTEL FROM SECURE DATABASE.", () => setAlertConfig(prev => ({ ...prev, isOpen: false })), 'alert');
        } finally {
          setIsDeleting(false);
        }
      }
    );
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;
    setIsEditing(true);
    try {
      await apiService.updateImage(selectedImage.id, { name: newTitle, description: newDesc });
      const updatedImage = { ...selectedImage, name: newTitle, description: newDesc };
      onAddImage(updatedImage);
      setSelectedImage(updatedImage);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      showAlert("MISSION FAILED", "COULD NOT UPDATE ARCHIVES.", () => setAlertConfig(prev => ({ ...prev, isOpen: false })), 'alert');
    } finally {
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl || !selectedFile) return;
    setIsUploading(true);
    try {
        const safeName = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'evidence';
        const ext = selectedFile.name.split('.').pop() || 'jpg';
        const finalFileName = `${safeName}_${Date.now()}.${ext}`;
        const thumbnailData = await compressImageToBase64(selectedFile, 0.6, 400);
        const originalData = await compressImageToBase64(selectedFile, 0.85, 1920);
        let uploadResponse;
        try {
          uploadResponse = await apiService.uploadImage({
            name: newTitle || `INTEL_REC_${Math.floor(Math.random() * 1000)}`,
            description: newDesc || 'No additional intelligence provided.',
            fileName: finalFileName,
            clearanceLevel: 'TOP SECRET',
            thumbnailData,
            originalData,
            uploaderId: agentId
          });
        } catch (e) {
          uploadResponse = { success: true, id: `local_${Date.now()}` };
        }
        const newImage: ArchiveImage = {
          id: uploadResponse.id,
          url: originalData,
          thumbnailUrl: thumbnailData,
          timestamp: new Date().toISOString(),
          clearanceLevel: 'TOP SECRET',
          name: newTitle || `INTEL_REC_${Math.floor(Math.random() * 1000)}`,
          description: newDesc || 'No additional intelligence provided.',
          fileName: finalFileName,
          virtualPath: DIRECTORY_PATH
        };
        try {
          const resOrig = await fetch(originalData);
          const blobOrig = await resOrig.blob();
          const resThumb = await fetch(thumbnailData);
          const blobThumb = await resThumb.blob();
          await dbService.insertArchive(newImage, blobOrig, blobThumb);
        } catch (e) { console.error(e); }
        onAddImage(newImage);
        setIsModalOpen(false);
    } catch (error) {
        console.error("Upload failed:", error);
        showAlert("MISSION FAILED", "COULD NOT TRANSMIT DATA TO ARCHIVES.", () => setAlertConfig(prev => ({ ...prev, isOpen: false })), 'alert');
    } finally { setIsUploading(false); }
  };

  const ImageGrid = useMemo(() => {
    if (images.length === 0) return null;
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12 w-full max-w-7xl">
        {images.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(img)}
            className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg border border-spy-red/20 bg-spy-dark"
          >
            <img src={img.thumbnailUrl || img.url} alt={img.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all loading-lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-spy-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <p className="text-[10px] font-mono text-spy-red tracking-widest truncate">{img.name}</p>
              <p className="text-[8px] font-mono text-white/40">{new Date(img.timestamp).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }, [images]);

  return (
    <div className="relative z-10 min-h-screen pb-20 overflow-x-hidden">
      <CustomAlert 
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        type={alertConfig.type}
        onCancel={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
      />
      {/* Header Bar */}
      <motion.header 
        initial={{ y: -50 }} animate={{ y: 0 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between transition-colors duration-500 ${
            isReadOnly ? 'bg-garden-pink/10 border-garden-pink/30' : 'bg-spy-navy/90 border-spy-red/30'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden ${isReadOnly ? 'bg-garden-pink' : 'bg-spy-dark border-spy-red'}`}>
             {isReadOnly ? <PeanutIcon className="w-8 h-8" /> : <span className="font-display font-bold text-xl">{agentId}</span>}
          </div>
          <div>
            <h2 className={`font-display text-lg leading-none ${isReadOnly ? 'text-garden-pink' : 'text-spy-cream'}`}>{isReadOnly ? "ANYA'S ALBUM" : 'WISE ARCHIVES'}</h2>
          </div>
        </div>
        <button onClick={onLogout} className={`p-2 font-bold ${isReadOnly ? 'text-garden-pink' : 'text-spy-cream'}`}><LogOut size={20} /></button>
      </motion.header>

      <main className="container mx-auto px-4 mt-12 relative">
        {!isReadOnly && (
          <div className="mb-16 text-center">
            <h3 className="text-5xl md:text-7xl font-display font-black tracking-widest text-spy-cream">ESBEKAHH</h3>
            <button onClick={() => setIsModalOpen(true)} className="mt-8 bg-spy-dark border border-spy-red text-spy-red px-10 py-5 rounded-sm flex items-center gap-4 mx-auto hover:bg-spy-red hover:text-spy-cream transition-all">
                <Upload size={24} /> <span className="font-display tracking-widest font-bold">ADD NEW INTEL</span>
            </button>
          </div>
        )}
        <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[600px]">
          {images.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <VisionGallery images={images} onImageSelect={setSelectedImage} />
              {ImageGrid}
            </div>
          ) : (
            <div className="py-32 text-center w-full">
              <Crosshair className="w-20 h-20 text-spy-red/20 mx-auto mb-8" />
              <h4 className="font-display text-4xl text-white/40 tracking-tighter uppercase">ARCHIVE_EMPTY</h4>
            </div>
          )}
        </div>

        {/* UPLOAD/EDIT MODAL */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isUploading && setIsModalOpen(false)} className="absolute inset-0 bg-black/80" />
                    <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} className="relative bg-spy-cream w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border-4 border-spy-dark">
                        <div className="bg-spy-red p-4 flex justify-between items-center text-spy-cream">
                            <h3 className="font-display font-bold text-xl tracking-widest uppercase">CLASSIFIED DOSSIER</h3>
                            <button onClick={() => !isUploading && setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={selectedFile ? handleSubmit : handleEditSubmit} className="p-8 space-y-6">
                            <div className="flex gap-8">
                                <div className="w-1/3 aspect-[3/4] border-2 border-dashed border-spy-dark/30 hover:border-spy-red cursor-pointer flex flex-col items-center justify-center bg-white/50 relative overflow-hidden" onClick={() => !isUploading && fileInputRef.current?.click()}>
                                    {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Upload className="text-spy-dark/30" />}
                                    <input type="file" ref={fileInputRef} onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) { setSelectedFile(file); const r = new FileReader(); r.onload = (ev) => setPreviewUrl(ev.target?.result as string); r.readAsDataURL(file); }
                                    }} className="hidden" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <input required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-white border-2 border-spy-dark px-3 py-2 font-mono" placeholder="CODENAME" />
                                    <textarea required rows={4} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full bg-white border-2 border-spy-dark px-3 py-2 font-hand text-xl" placeholder="DETAILS..." />
                                </div>
                            </div>
                            <button type="submit" disabled={isUploading} className="w-full bg-spy-dark text-spy-cream py-3 font-display font-bold tracking-widest hover:bg-spy-red transition-all">
                                {isUploading ? 'TRANSMITTING...' : 'UPLOAD TO DB'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* LIGHTBOX */}
        <AnimatePresence>
            {selectedImage && !isModalOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-3xl" onClick={() => setSelectedImage(null)}>
                    <div className="absolute top-6 right-6 z-[210] flex gap-4">
                        {!isReadOnly && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(selectedImage.id); }} className="bg-black/60 text-spy-red px-6 py-2 font-display font-bold text-sm border border-spy-red rounded-sm hover:bg-spy-red hover:text-white transition-all"><Trash2 size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); setNewTitle(selectedImage.name); setNewDesc(selectedImage.description || ''); setIsModalOpen(true); }} className="bg-spy-red text-spy-cream px-6 py-2 font-display font-bold text-sm rounded-sm hover:bg-white hover:text-spy-red transition-all">EDIT</button>
                          </>
                        )}
                    </div>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.url} className="max-h-[80vh] mx-auto border border-spy-red/20 shadow-2xl" />
                        <div className="bg-spy-dark/90 p-8 mt-4 border-t border-spy-red/20">
                            <h4 className="text-spy-cream font-display text-3xl uppercase">{selectedImage.name}</h4>
                            <p className="text-spy-cream/80 font-hand text-xl italic mt-2">{selectedImage.description}</p>
                            <div className="text-[9px] font-mono text-white/40 tracking-widest uppercase mt-4">DATE: {new Date(selectedImage.timestamp).toLocaleDateString()}</div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
