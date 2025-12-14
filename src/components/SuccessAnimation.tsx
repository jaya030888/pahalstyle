import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Download, Share2 } from 'lucide-react';

interface SuccessAnimationProps {
  onDownload?: () => void;
  onShare?: () => void;
  onTryAnother?: () => void;
}

export function SuccessAnimation({ 
  onDownload, 
  onShare, 
  onTryAnother 
}: SuccessAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-primary/20"
    >
      {/* Success Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="bg-gradient-to-br from-primary to-secondary p-2 rounded-full"
        >
          <Check className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="text-foreground flex items-center gap-2">
            Virtual Try-On Complete! 
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🎉
            </motion.span>
          </h4>
          <p className="text-foreground/60 text-sm">Looking stunning in Indian wear! Love this style? 🇮🇳</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDownload}
          className="px-4 py-3 bg-white rounded-xl flex items-center justify-center gap-2 hover:shadow-md transition-shadow border border-primary/10"
        >
          <Download className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Download</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShare}
          className="px-4 py-3 bg-white rounded-xl flex items-center justify-center gap-2 hover:shadow-md transition-shadow border border-primary/10"
        >
          <Share2 className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Share</span>
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onTryAnother}
        className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">Try Another Outfit</span>
      </motion.button>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 pt-4 border-t border-primary/10"
      >
        <p className="text-xs text-foreground/50 text-center">
          💡 Tip: Try different categories to find your perfect style!
        </p>
      </motion.div>
    </motion.div>
  );
}
