import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lock } from '../icons/index';

interface CustomAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'confirm' | 'alert';
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ 
  isOpen, title, message, type = 'confirm', onConfirm, onCancel, confirmText = 'CONFIRM' 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-spy-cream border-4 border-spy-dark p-6 max-w-sm w-full shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            style={{ backgroundImage: 'repeating-linear-gradient(#f5f5dc 0px, #f5f5dc 24px, #e5e5cc 25px)' }}
          >
            <div className="flex items-center gap-3 mb-4 border-b-2 border-spy-dark/10 pb-2">
              <AlertTriangle className="text-spy-red w-6 h-6" />
              <h3 className="font-display font-bold text-spy-dark tracking-widest uppercase">{title}</h3>
            </div>
            <p className="font-mono text-xs text-spy-dark/80 mb-6 leading-relaxed">
              {message}
            </p>
            <div className="flex justify-end gap-3">
              {type === 'confirm' && (
                <button 
                  onClick={onCancel}
                  className="px-4 py-2 font-display text-xs font-bold text-spy-dark border-2 border-spy-dark hover:bg-gray-200 transition-colors"
                >
                  ABORT
                </button>
              )}
              <button 
                onClick={onConfirm}
                className="px-6 py-2 bg-spy-dark text-spy-cream font-display text-xs font-bold tracking-widest hover:bg-spy-red transition-all shadow-[4px_4px_0px_rgba(239,68,68,1)] active:shadow-none active:translate-y-1"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
