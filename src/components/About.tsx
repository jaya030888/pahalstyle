import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: Sparkles,
    title: 'Innovative Technology',
    description: 'Using cutting-edge virtual try-on technology to bring the fitting room to your home.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We care about your shopping experience and want you to love what you buy.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'See how outfits look on you in seconds, not days of waiting for delivery.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your photos are processed locally and never stored on our servers.',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763872038252-e6c4e0a11067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MzIyMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="PahalStyle Technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-primary">10,000+</div>
                  <p className="text-foreground/70">Happy Customers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">About PahalStyle</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-foreground/80">
                PahalStyle was born from a simple observation: In offline shopping, you can try clothes before buying. 
                But in online shopping, you have to wait for delivery, try at home, and often face the hassle of returns.
              </p>
              
              <p className="text-foreground/80">
                We're bridging this gap by bringing the fitting room experience to your screen. Our virtual try-on 
                technology lets you see exactly how an outfit will look on you before you make a purchase decision.
              </p>
              
              <p className="text-foreground/80">
                No more guessing, no more returns, no more disappointment. Just confident online shopping with 
                the assurance of knowing how you'll look.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-muted/50 rounded-xl p-4 hover:bg-muted transition-colors"
                  >
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <h4 className="mb-2">{feature.title}</h4>
                    <p className="text-foreground/70 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
