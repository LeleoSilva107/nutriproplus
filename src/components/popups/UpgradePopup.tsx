'use client';

import { motion } from 'framer-motion';
import { X, Crown, Zap } from 'lucide-react';

interface UpgradePopupProps {
  onClose: () => void;
}

export function UpgradePopup({ onClose }: UpgradePopupProps) {
  const handleUpgrade = (plan: 'pro' | 'elite') => {
    const urls = {
      pro: 'https://pay.kiwify.com.br/VVE5mFN',
      elite: 'https://pay.kiwify.com.br/om08STx',
    };
    window.open(urls[plan], '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 max-w-md w-full border-2 border-gray-200 dark:border-gray-800 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Conteúdo Exclusivo</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Este recurso é exclusivo dos membros PRO e ELITE. Deseja desbloquear agora?
          </p>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleUpgrade('pro')}
            className="w-full bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            <Zap className="w-5 h-5" />
            Assinar Plano PRO
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleUpgrade('elite')}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            <Crown className="w-5 h-5" />
            Assinar Plano ELITE
          </motion.button>

          <button
            onClick={onClose}
            className="w-full text-gray-600 dark:text-gray-400 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Agora não
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
