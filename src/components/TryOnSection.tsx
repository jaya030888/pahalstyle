import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Sparkles, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LoadingProgress } from './LoadingProgress';
import { ErrorState } from './ErrorState';
import { SuccessAnimation } from './SuccessAnimation';
import { generateVirtualTryOn } from '../services/virtualTryOnApi';
import { toast } from 'sonner@2.0.3';

// Static outfit data - Authentic Indian Outfits
const outfitCategories = {
  holi: [
    {
      id: 'holi-1',
      name: 'White Kurta Set',
      image: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMGZhc2hpb259ZW58MXx8fHwxNzY0MjU4OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'holi-2',
      name: 'Colorful Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1668371679302-a8ec781e876e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjB3ZWFyfGVufDF8fHx8MTc2NDI0MTQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'holi-3',
      name: 'Traditional Indian Dress',
      image: 'https://images.unsplash.com/photo-1721972246217-91f90127cfc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzfGVufDF8fHx8MTc2NDMwOTIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ],
  diwali: [
    {
      id: 'diwali-1',
      name: 'Elegant Saree',
      image: 'https://images.unsplash.com/photo-1552109871-d159448eb560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMGZhc2hpb258ZW58MXx8fHwxNzY0MzE5NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'diwali-2',
      name: 'Royal Lehenga',
      image: 'https://images.unsplash.com/photo-1760461805241-dba33224ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZWhlbmdhJTIwb3V0Zml0fGVufDF8fHx8MTc2NDM0MzQyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'diwali-3',
      name: 'Festive Anarkali',
      image: 'https://images.unsplash.com/photo-1599584082894-52c6d8fc48c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhbmFya2FsaSUyMGRyZXNzfGVufDF8fHx8MTc2NDM0MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ],
  formal: [
    {
      id: 'formal-1',
      name: 'Traditional Kurta',
      image: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMGZhc2hpb258ZW58MXx8fHwxNzY0MjU4OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'formal-2',
      name: 'Designer Saree',
      image: 'https://images.unsplash.com/photo-1552109871-d159448eb560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMGZhc2hpb258ZW58MXx8fHwxNzY0MzE5NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'formal-3',
      name: 'Indo-Western',
      image: 'https://images.unsplash.com/photo-1668371679302-a8ec781e876e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjB3ZWFyfGVufDF8fHx8MTc2NDI0MTQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ],
  casual: [
    {
      id: 'casual-1',
      name: 'Casual Kurta',
      image: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBrdXJ0YSUyMGZhc2hpb258ZW58MXx8fHwxNzY0MjU4OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'casual-2',
      name: 'Everyday Ethnic',
      image: 'https://images.unsplash.com/photo-1721972246217-91f90127cfc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzfGVufDF8fHx8MTc2NDMwOTIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'casual-3',
      name: 'Comfortable Traditional',
      image: 'https://images.unsplash.com/photo-1668371679302-a8ec781e876e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjB3ZWFyfGVufDF8fHx8MTc2NDI0MTQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ],
};

type Category = keyof typeof outfitCategories;

export function TryOnSection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('holi');
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryOutfit, setRetryOutfit] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setSelectedOutfit(null);
    setProcessedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTryOnOutfit = async (outfitImage: string) => {
    if (!uploadedImage) {
      toast.error('Please upload your photo first');
      return;
    }

    setSelectedOutfit(outfitImage);
    setIsProcessing(true);
    setProcessedImage(null);
    setError(null);
    setRetryOutfit(outfitImage);

    try {
      const result = await generateVirtualTryOn({
        userImage: uploadedImage,
        outfitImage: outfitImage,
        category: selectedCategory,
      });

      if (result.success && result.resultImage) {
        setProcessedImage(result.resultImage);
        setError(null);
        toast.success('Virtual try-on complete!', {
          description: `Processed in ${result.processingTime}ms`,
        });
      } else {
        const errorMsg = result.error || 'Processing failed. Please try again.';
        setError(errorMsg);
        toast.error('Try-on failed', {
          description: errorMsg,
        });
      }
    } catch (error) {
      console.error('Try-on error:', error);
      const errorMsg = 'Network error. Please check your connection and try again.';
      setError(errorMsg);
      toast.error('Something went wrong', {
        description: errorMsg,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    if (retryOutfit) {
      handleTryOnOutfit(retryOutfit);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `pahalstyle-tryon-${Date.now()}.jpg`;
      link.click();
      toast.success('Image downloaded!', {
        description: 'Your virtual try-on has been saved',
      });
    }
  };

  const handleShare = async () => {
    if (processedImage) {
      try {
        // Try native sharing if available
        if (navigator.share) {
          await navigator.share({
            title: 'My PahalStyle Virtual Try-On',
            text: 'Check out how I look in this outfit! 👗✨',
            url: window.location.href,
          });
          toast.success('Shared successfully!');
        } else {
          // Fallback: copy link
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied!', {
            description: 'Share the link with your friends',
          });
        }
      } catch (error) {
        console.error('Share error:', error);
      }
    }
  };

  const handleTryAnother = () => {
    setProcessedImage(null);
    setSelectedOutfit(null);
    setError(null);
  };

  const categories = [
    { id: 'holi', label: 'Holi Special', icon: '🎨', desc: 'Kurta & Ethnic' },
    { id: 'diwali', label: 'Diwali Festive', icon: '🪔', desc: 'Saree & Lehenga' },
    { id: 'formal', label: 'Formal Wear', icon: '👔', desc: 'Traditional' },
    { id: 'casual', label: 'Casual', icon: '👕', desc: 'Everyday Indian' },
  ];

  return (
    <section id="try-on" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Virtual Try-On Studio</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Upload your photo and try on different outfits instantly. See how you look before making a purchase!
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/70">
                Powered by AI • Realistic virtual try-on in seconds
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
              <span className="text-sm text-foreground/70">
                🇮🇳 Featuring Authentic Indian Outfits
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Upload & Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="mb-6">Your Photo</h3>
              
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
                >
                  <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-foreground/70 mb-4">Click to upload your photo</p>
                  
                  <div className="mb-4 space-y-2">
                    <p className="text-sm text-foreground/70">
                      📸 <strong>For Best Results:</strong>
                    </p>
                    <ul className="text-sm text-foreground/60 space-y-1 text-left max-w-xs mx-auto">
                      <li>✓ Full body or half-body photo</li>
                      <li>✓ Clear, well-lit image</li>
                      <li>✓ Plain background preferred</li>
                      <li>✓ Face camera directly</li>
                    </ul>
                  </div>
                  
                  <p className="text-foreground/50 text-sm">PNG, JPG up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                    {/* Show loading overlay during processing */}
                    {isProcessing ? (
                      <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                        <LoadingProgress />
                      </div>
                    ) : error ? (
                      <div className="w-full h-[500px] flex items-center justify-center bg-muted/30">
                        <ErrorState message={error} onRetry={handleRetry} />
                      </div>
                    ) : (
                      <>
                        <img
                          src={processedImage || uploadedImage}
                          alt={processedImage ? 'Virtual Try-On Result' : 'Uploaded'}
                          className="w-full h-[500px] object-cover"
                        />
                        
                        {/* Show AI badge on processed image */}
                        {processedImage && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">AI Generated</span>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-3 -right-3 bg-destructive text-white rounded-full p-2 hover:scale-110 transition-transform shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {processedImage && !isProcessing && !error && (
                    <SuccessAnimation
                      onDownload={handleDownload}
                      onShare={handleShare}
                      onTryAnother={handleTryAnother}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Categories & Outfits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="mb-6">Choose Category</h3>
              
              {/* Category Tabs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`p-4 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'bg-muted/50 text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm">{category.label}</div>
                    <div className={`text-xs mt-1 ${
                      selectedCategory === category.id ? 'text-white/80' : 'text-foreground/60'
                    }`}>
                      {category.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Outfits Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4>Select Indian Outfit</h4>
                  <span className="text-xs text-foreground/60 bg-accent/20 px-3 py-1 rounded-full">
                    {outfitCategories[selectedCategory].length} options
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {outfitCategories[selectedCategory].map((outfit) => (
                    <motion.div
                      key={outfit.id}
                      whileHover={{ scale: uploadedImage && !isProcessing ? 1.05 : 1 }}
                      whileTap={{ scale: uploadedImage && !isProcessing ? 0.95 : 1 }}
                      onClick={() => {
                        if (uploadedImage && !isProcessing) {
                          handleTryOnOutfit(outfit.image);
                        }
                      }}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                        selectedOutfit === outfit.image
                          ? 'border-primary shadow-lg'
                          : 'border-transparent hover:border-primary/30'
                      } ${!uploadedImage || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={outfit.image}
                          alt={outfit.name}
                          className="w-full h-48 object-cover"
                        />
                        {selectedOutfit === outfit.image && isProcessing && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <p className="text-sm text-foreground/80">{outfit.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {!uploadedImage && (
                  <div className="mt-4 p-4 bg-accent/20 rounded-xl text-center">
                    <p className="text-foreground/70">👆 Upload your photo first to try on outfits</p>
                  </div>
                )}

                {isProcessing && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl text-center">
                    <p className="text-foreground/70">✨ AI is processing your virtual try-on...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
