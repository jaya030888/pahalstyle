import React from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TryOnSection } from './components/TryOnSection';
import { OutfitShowcase } from './components/OutfitShowcase';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TryOnSection />
      <OutfitShowcase />
      <HowItWorks />
      <About />
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
