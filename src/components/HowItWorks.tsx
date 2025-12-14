import React from 'react';
import { motion } from 'motion/react';
import { Upload, Palette, Eye, ShoppingBag } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Upload Your Photo',
    description: 'Simply upload a clear photo of yourself. Our system works best with front-facing photos.',
    icon: Upload,
    color: 'from-primary to-purple-400',
  },
  {
    id: 2,
    title: 'Choose an Outfit',
    description: 'Browse through our extensive collection and select the outfit you want to try on.',
    icon: Palette,
    color: 'from-secondary to-pink-400',
  },
  {
    id: 3,
    title: 'See Instant Results',
    description: 'Watch as the outfit is virtually placed on your photo. See how it looks in real-time!',
    icon: Eye,
    color: 'from-accent to-blue-400',
  },
  {
    id: 4,
    title: 'Buy with Confidence',
    description: 'Love what you see? Purchase the outfit knowing exactly how it will look on you.',
    icon: ShoppingBag,
    color: 'from-primary to-secondary',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">How It Works</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Get started with PahalStyle in just 4 simple steps. Try before you buy has never been easier!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-x-4"></div>
                )}

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all h-full">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              const element = document.getElementById('try-on');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-xl transition-all"
          >
            Start Your Virtual Try-On
          </button>
        </motion.div>
      </div>
    </section>
  );
}
