import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Wand2 } from 'lucide-react';

interface LoadingProgressProps {
  onComplete?: () => void;
}

export function LoadingProgress({ onComplete }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Analyzing your photo...');

  useEffect(() => {
    const statusUpdates = [
      { progress: 20, text: 'Analyzing your photo...' },
      { progress: 40, text: 'Detecting body features...' },
      { progress: 60, text: 'Processing Indian outfit details...' },
      { progress: 80, text: 'Applying traditional wear...' },
      { progress: 95, text: 'Finalizing your look...' },
      { progress: 100, text: 'Complete!' },
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < statusUpdates.length) {
        setProgress(statusUpdates[currentIndex].progress);
        setStatusText(statusUpdates[currentIndex].text);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 300);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-primary" />
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground/70">{statusText}</span>
          <span className="text-sm text-primary">{progress}%</span>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-foreground/60 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI is working its magic...</span>
        </motion.div>
      </div>
    </div>
  );
}
