import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const showcaseOutfits = [
  {
    id: 1,
    name: 'Summer Breeze',
    category: 'Casual',
    image: 'https://images.unsplash.com/photo-1595137976825-b906534240a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBjYXN1YWwlMjBvdXRmaXR8ZW58MXx8fHwxNzY0MzQwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹2,499',
  },
  {
    id: 2,
    name: 'Elegant Evening',
    category: 'Formal',
    image: 'https://images.unsplash.com/photo-1760083545495-b297b1690672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBvdXRmaXR8ZW58MXx8fHwxNzY0Mjk2NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹4,999',
  },
  {
    id: 3,
    name: 'Classic Black',
    category: 'Formal',
    image: 'https://images.unsplash.com/photo-1761499101317-e32c4ed50b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzdWl0JTIwYXR0aXJlfGVufDF8fHx8MTc2NDMzOTgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹5,499',
  },
  {
    id: 4,
    name: 'Street Style',
    category: 'Casual',
    image: 'https://images.unsplash.com/photo-1708317031389-1afe5ccc6f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0MzM5ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹1,999',
  },
  {
    id: 5,
    name: 'Festive Fusion',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1756483510900-ec43edbafb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY0MzI1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹3,999',
  },
  {
    id: 6,
    name: 'Party Perfect',
    category: 'Party',
    image: 'https://images.unsplash.com/photo-1754490899906-f793281ea1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRyZXNzJTIwb3V0Zml0fGVufDF8fHx8MTc2NDMzOTgzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹4,499',
  },
  {
    id: 7,
    name: 'Modern Chic',
    category: 'Casual',
    image: 'https://images.unsplash.com/photo-1739773375456-79be292cedb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwb3V0Zml0JTIwY2xvdGhlc3xlbnwxfHx8fDE3NjQzMzk4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹2,799',
  },
  {
    id: 8,
    name: 'Vibrant Colors',
    category: 'Festive',
    image: 'https://images.unsplash.com/photo-1763256293604-326f823c3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZlJTIwY29sb3JmdWwlMjBkcmVzc3xlbnwxfHx8fDE3NjQzMzk4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '₹3,299',
  },
];

export function OutfitShowcase() {
  const scrollToTryOn = () => {
    const element = document.getElementById('try-on');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Popular Outfits</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore our curated collection of trending outfits. Try any of them virtually before you buy!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseOutfits.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-foreground">
                      {outfit.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="mb-2">{outfit.name}</h4>
                  <div className="text-primary mb-4">{outfit.price}</div>
                  
                  <button
                    onClick={scrollToTryOn}
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Try This
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
