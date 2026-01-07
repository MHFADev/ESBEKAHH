import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Upload, Lock, Star, PeanutIcon, Crosshair, RoseIcon, TulipIcon, ButterflyIcon, Search, AlertTriangle, BlueElement } from './Icons';
import { ArchiveImage } from '../types';
import { CHARACTERS, DIRECTORY_PATH, DB_CONFIG } from '../constants';
import { dbService } from '../services/db';
import { apiService } from '../services/api';
import VisitorVisor from './VisitorVisor';

// --- UTILITY: IMAGE COMPRESSOR & BLOB CONVERTER ---
const compressImageToBlob = (file: File, quality = 0.8, maxWidth = 800): Promise<Blob> => {
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

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error("Compression failed"));
                }, 'image/jpeg', quality);
            };

            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

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

                canvas.toDataURL('image/jpeg', quality);
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
}

const Dashboard: React.FC<DashboardProps> = ({ agentId, isReadOnly = false, onLogout, images, onAddImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);
  
  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // State
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsEditing(true);
    try {
      await apiService.updateImage(selectedImage.id, {
        name: newTitle,
        description: newDesc,
      });

      // Update local state
      const updatedImage = {
        ...selectedImage,
        name: newTitle,
        description: newDesc,
      };
      
      onAddImage(updatedImage);
      setSelectedImage(updatedImage);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Mission Failed: Could not update intel.");
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

        // 1. COMPRESSION PROCESS
        const thumbnailData = await compressImageToBase64(selectedFile, 0.6, 400);
        const originalData = await compressImageToBase64(selectedFile, 0.85, 1920);

        // 2. UPLOAD TO SUPABASE
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
          console.warn("Supabase upload failed, falling back to local IDB:", e);
          uploadResponse = { success: true, id: `local_${Date.now()}` };
        }

        // 3. CREATE LOCAL IMAGE OBJECT
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

        // 4. PERSIST TO LOCAL IDB (Safety fallback)
        try {
          const resOrig = await fetch(originalData);
          const blobOrig = await resOrig.blob();
          const resThumb = await fetch(thumbnailData);
          const blobThumb = await resThumb.blob();
          
          if (blobOrig.size < 100) {
            throw new Error("Generated original blob is too small/invalid");
          }
          
          await dbService.insertArchive(newImage, blobOrig, blobThumb);
        } catch (e) {
          console.error("Local storage failed:", e);
        }

        onAddImage(newImage);
        closeModal();

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Mission Failed: Could not save intel to archives.");
        setIsUploading(false);
    }
  };

  const openEditModal = (img: ArchiveImage) => {
    setSelectedImage(img);
    setNewTitle(img.name);
    setNewDesc(img.description || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsUploading(false);
    setIsEditing(false);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="relative z-10 min-h-screen pb-20 overflow-x-hidden">
      {/* Header Bar */}
      <motion.header 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between transition-colors duration-500 ${
            isReadOnly 
                ? 'bg-garden-pink/10 border-garden-pink/30 shadow-[0_4px_30px_rgba(255,183,197,0.1)]' 
                : 'bg-spy-navy/90 border-spy-red/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden shadow-lg ${
             isReadOnly ? 'bg-garden-pink border-white text-white' : 'bg-spy-dark border-spy-red text-spy-red'
          }`}>
             {isReadOnly ? <PeanutIcon className="w-8 h-8 animate-wiggle" /> : <span className="font-display font-bold text-xl">{agentId}</span>}
          </div>
          
          <div>
            <h2 className={`font-display text-lg leading-none ${isReadOnly ? 'text-garden-pink' : 'text-spy-cream'}`}>
              {isReadOnly ? 'ANYA\'S ALBUM' : 'WISE ARCHIVES'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               {isReadOnly ? (
                   <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-[10px] font-hand font-bold text-garden-tulip bg-garden-pink/10 px-2 rounded-full border border-garden-pink/20">
                           <ButterflyIcon className="w-3 h-3" />
                           <span>WAKU WAKU MODE</span>
                       </div>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/30">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[9px] font-mono text-green-400 tracking-widest uppercase">DB: RAILWAY CONNECTED</span>
                       </div>
                   </div>
               ) : (
                   <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-[10px] font-mono text-spy-red uppercase tracking-widest bg-spy-red/10 px-2 rounded-sm border border-spy-red/30">
                           <RoseIcon className="w-3 h-3" />
                           <span>Level 7</span>
                       </div>
                       <div className="hidden md:flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-spy-red/30">
                           <Lock className="w-2 h-2 text-spy-red" />
                           <span className="text-spy-red font-mono text-[10px] tracking-widest">POSTGRES: ACTIVE</span>
                       </div>
                   </div>
               )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-spy-red/30">
                <BlueElement className="w-4 h-4" />
                <Star className="w-4 h-4 fill-spy-red text-spy-red" />
                <span className="text-spy-red font-bold font-mono">8</span>
                <span className="text-spy-cream/40 text-xs">STELLA</span>
            </div>

            <button 
            onClick={onLogout}
            className={`p-2 transition-colors rounded-full flex items-center gap-2 font-bold ${
                isReadOnly ? 'text-garden-pink hover:bg-garden-pink/20' : 'text-spy-cream hover:bg-spy-red/20 hover:text-spy-red'
            }`}
            >
            <span className="hidden md:inline text-xs font-mono">{isReadOnly ? 'SLEEP TIME' : 'SIGN OUT'}</span>
            <LogOut size={20} />
            </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-12 relative">
        
        {isReadOnly ? (
          <VisitorVisor images={images} agentId={agentId} />
        ) : (
          <>
             <motion.img 
                src={CHARACTERS.loid_action}
                alt="Action"
                className="absolute top-0 right-0 w-[400px] opacity-10 pointer-events-none z-0"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.1 }}
             />
             <motion.img 
                src={CHARACTERS.anya_peace}
                alt="Anya"
                className="absolute bottom-10 left-10 w-[200px] opacity-20 pointer-events-none z-0"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.2 }}
             />

            <div className="mb-16 text-center relative z-10">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 blur-[80px] rounded-full -z-10 ${
                        isReadOnly ? 'bg-garden-pink/20' : 'bg-spy-red/10'
                    }`}
                />
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-spy-red fill-spy-red" />
                    <span className="text-xs font-serif font-bold text-spy-red tracking-[0.3em] uppercase">
                        Anak Kesayangan Bu Retno
                    </span>
                    <Star className="w-4 h-4 text-spy-red fill-spy-red" />
                </div>
                <h3 className={`text-5xl md:text-7xl font-display font-black tracking-widest mb-4 ${
                    isReadOnly ? 'text-garden-pink drop-shadow-[0_0_10px_rgba(255,183,197,0.5)]' : 'text-spy-cream'
                }`}>
                    ESBEKAHH
                </h3>
                <div className="flex justify-center items-center gap-4">
                    <div className={`h-[1px] w-12 ${isReadOnly ? 'bg-garden-tulip' : 'bg-spy-red'}`}></div>
                    <p className={`text-sm font-serif italic tracking-[0.3em] ${isReadOnly ? 'text-garden-tulip' : 'text-spy-red/60'}`}>
                        {isReadOnly ? "PEANUTS & PISTOLS" : "FOR THE SAKE OF WORLD PEACE"}
                    </p>
                    <div className={`h-[1px] w-12 ${isReadOnly ? 'bg-garden-tulip' : 'bg-spy-red'}`}></div>
                </div>
            </div>

            {/* Upload Trigger */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-16 text-center relative"
            >
                <div className="inline-block relative group cursor-pointer z-20">
                <div className="absolute inset-0 bg-spy-red blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="relative bg-spy-dark border border-spy-red text-spy-red px-10 py-5 rounded-sm flex items-center gap-4 transition-all group-hover:bg-spy-red group-hover:text-spy-cream overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-1">
                            <div className="w-2 h-2 bg-spy-red rounded-full animate-pulse"></div>
                        </div>
                        <Upload className="w-6 h-6" />
                        <span className="font-display tracking-widest font-bold">ADD NEW INTEL</span>
                    </button>
                </div>
            </motion.div>
          </>
        )}

        {/* UPLOAD MODAL */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isUploading && closeModal()}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 50, opacity: 0 }}
                        className="relative bg-spy-cream w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border-4 border-spy-dark"
                        style={{ backgroundImage: 'repeating-linear-gradient(#f5f5dc 0px, #f5f5dc 24px, #e5e5cc 25px)' }}
                    >
                        <div className="bg-spy-red p-4 flex justify-between items-center text-spy-cream">
                            <h3 className="font-display font-bold text-xl tracking-widest flex items-center gap-2">
                                <Lock className="w-5 h-5" /> CLASSIFIED DOSSIER
                            </h3>
                            <button onClick={() => !isUploading && closeModal()} className="hover:text-white font-bold disabled:opacity-50" disabled={isUploading}>CLOSE ×</button>
                        </div>

                        {/* Standard Form with Loader Overlay */}
                        <div className="relative">
                            {(isUploading || isEditing) && (
                                <div className="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <div className="w-16 h-16 border-4 border-spy-dark border-t-spy-red rounded-full animate-spin mb-4"></div>
                                    <p className="font-display font-bold text-spy-dark animate-pulse">
                                        {isUploading ? 'ENCRYPTING & UPLOADING...' : 'UPDATING ARCHIVES...'}
                                    </p>
                                    <p className="font-mono text-xs text-spy-red mt-2">DO NOT CLOSE</p>
                                </div>
                            )}

                            <form onSubmit={selectedFile ? handleSubmit : handleEditSubmit} className="p-8 space-y-6">
                                <div className="flex gap-8">
                                    <div className="w-1/3 flex flex-col gap-2">
                                        <div 
                                            onClick={() => !isUploading && !isEditing && !selectedImage && fileInputRef.current?.click()}
                                            className={`aspect-[3/4] border-2 border-dashed border-spy-dark/30 hover:border-spy-red cursor-pointer flex flex-col items-center justify-center bg-white/50 relative overflow-hidden group transition-all ${selectedImage ? 'cursor-default' : ''}`}
                                        >
                                            {previewUrl || (selectedImage && selectedImage.url) ? (
                                                <img src={previewUrl || selectedImage?.url} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-spy-dark/30 group-hover:text-spy-red mb-2 transition-colors" />
                                                    <span className="text-xs font-mono text-center text-spy-dark/50">CLICK TO ATTACH<br/>VISUAL INTEL</span>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" disabled={isUploading || isEditing} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold font-mono uppercase text-spy-red">Operation Codename</label>
                                            <input 
                                                type="text" 
                                                required
                                                disabled={isUploading || isEditing}
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                                className="w-full bg-white border-2 border-spy-dark px-3 py-2 font-mono text-spy-dark outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all"
                                                placeholder="ex: OPERATION STRIX"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold font-mono uppercase text-spy-red">Details</label>
                                            <textarea 
                                                required
                                                rows={4}
                                                disabled={isUploading || isEditing}
                                                value={newDesc}
                                                onChange={(e) => setNewDesc(e.target.value)}
                                                className="w-full bg-white border-2 border-spy-dark px-3 py-2 font-hand text-xl font-bold text-spy-dark outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all"
                                                placeholder="Write your observation here..."
                                            />
                                        </div>
                                        <div className="text-[10px] font-mono text-gray-500 bg-gray-100 p-2 rounded border border-gray-300 break-all">
                                            TARGET DB: {DB_CONFIG.url}:{DB_CONFIG.port}<br/>
                                            USER: {DB_CONFIG.user}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-spy-dark/10">
                                    <button 
                                        type="submit"
                                        disabled={(!previewUrl && !selectedImage) || isUploading || isEditing}
                                        className="bg-spy-dark text-spy-cream px-8 py-3 font-display font-bold tracking-widest hover:bg-spy-red disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_rgba(239,68,68,1)] hover:translate-y-1 transition-all active:translate-y-1 active:shadow-none"
                                    >
                                        {isUploading || isEditing ? 'TRANSMITTING...' : (selectedImage ? 'UPDATE INTEL' : 'UPLOAD TO DB')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* LIGHTBOX / FULL RES VIEWER */}
        <AnimatePresence>
            {selectedImage && !isModalOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-3xl"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute top-6 right-6 z-[210] flex gap-4">
                        {!isReadOnly && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(selectedImage);
                            }}
                            className="bg-spy-red text-spy-cream px-6 py-2 font-display font-bold text-sm hover:bg-white hover:text-spy-red transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] rounded-sm"
                          >
                            <Upload size={16} /> EDIT INTEL
                          </button>
                        )}
                        <button className="text-white/50 hover:text-spy-red transition-colors font-display text-2xl">CLOSE ×</button>
                    </div>

                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-6xl w-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* High Res Image Container */}
                        <div className="relative group overflow-hidden flex flex-col items-center justify-center w-full bg-spy-dark/40 rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-spy-red/20 backdrop-blur-md">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-spy-red to-transparent opacity-50"></div>
                            
                            <div className="relative p-2 md:p-4 w-full flex justify-center">
                                <img 
                                    src={selectedImage.url} 
                                    alt="High Res Intelligence" 
                                    className="max-h-[75vh] w-auto border border-white/5 shadow-[0_0_60px_rgba(239,68,68,0.05)] object-contain transition-all duration-700 ease-out"
                                    onLoad={(e) => {
                                      e.currentTarget.style.opacity = '1';
                                    }}
                                    onError={(e) => {
                                      console.error("Image failed to load:", selectedImage.url);
                                      if (selectedImage.thumbnailUrl && e.currentTarget.src !== selectedImage.thumbnailUrl) {
                                        e.currentTarget.src = selectedImage.thumbnailUrl;
                                      }
                                    }}
                                />
                                
                                {/* Corner Accents */}
                                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-spy-red/40"></div>
                                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-spy-red/40"></div>
                                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-spy-red/40"></div>
                                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-spy-red/40"></div>
                            </div>
                            
                            {/* Intelligence Overlay Card */}
                            <div className="w-full bg-gradient-to-t from-spy-dark/95 via-spy-dark/80 to-transparent p-8 pt-12 z-10 border-t border-spy-red/10 mt-[-60px]">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-spy-red animate-pulse rounded-full"></span>
                                            <h4 className="text-spy-cream font-display text-3xl md:text-4xl tracking-[0.25em] drop-shadow-lg uppercase">
                                                {selectedImage.name}
                                            </h4>
                                        </div>
                                        <p className="text-spy-cream/80 font-hand text-xl md:text-2xl max-w-3xl leading-relaxed italic border-l-2 border-spy-red/30 pl-4 py-1">
                                            {selectedImage.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                                        <div className="px-3 py-1 bg-spy-red/10 border border-spy-red/30 rounded-sm">
                                            <span className="text-[10px] font-mono text-spy-red tracking-[0.3em] uppercase">
                                                CLASSIFICATION: {selectedImage.clearanceLevel}
                                            </span>
                                        </div>
                                        <div className="text-[9px] font-mono text-white/40 tracking-widest uppercase flex items-center gap-2">
                                            <Crosshair size={10} className="text-spy-red/50" />
                                            INTEL_ID: {selectedImage.id.toString().substring(0, 12)}...
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            DATE: {new Date(selectedImage.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-spy-red to-transparent opacity-50"></div>
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
