import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1,
      transition: { duration: 1 }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#111111]">
      {/* Background Color fallback */}
      <div className="absolute inset-0 bg-[#111111]" />

      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={current}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#111111] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
          <img
            src={HERO_SLIDES[current].image}
            alt={HERO_SLIDES[current].title}
            className="w-full h-full object-cover"
            onError={(e) => {
                // Fallback if image fails
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop";
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <motion.div
          key={`text-${current}`}
          initial="hidden"
          animate="visible"
          className="max-w-4xl pt-40 md:pt-24 pb-12"
        >
          <motion.div 
            custom={0.5} 
            variants={textVariants}
            className="flex items-center gap-4 mb-4 md:mb-6"
          >
            <div className="h-[2px] w-8 md:w-12 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            <span className="text-amber-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase font-heading text-shadow-lg">{HERO_SLIDES[current].subtitle}</span>
          </motion.div>

          <motion.h1 
            custom={0.7} 
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black leading-[0.95] text-white tracking-tighter mb-6 md:mb-8 drop-shadow-2xl"
          >
            {HERO_SLIDES[current].title.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
              {HERO_SLIDES[current].title.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.p 
            custom={0.9} 
            variants={textVariants}
            className="text-base md:text-2xl text-amber-100/90 max-w-xl md:max-w-2xl leading-relaxed mb-8 md:mb-12 font-light border-l-2 border-amber-500/50 pl-6 drop-shadow-lg"
          >
            {HERO_SLIDES[current].description}
          </motion.p>

          <motion.div custom={1.1} variants={textVariants} className="flex gap-4">
             <button 
                onClick={() => document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-amber-600 text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-amber-500 shadow-[0_0_20px_-5px_rgba(217,119,6,0.6)] text-xs md:text-sm"
             >
                 <span className="relative z-10 flex items-center gap-3">
                     Explore Collection
                     <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                 </span>
             </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Controls - Positioned to minimize conflict */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-30 flex gap-4 items-center">
        <button 
            onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="p-3 border border-white/20 hover:border-amber-500 text-white hover:text-amber-500 transition-colors bg-black/50 backdrop-blur-md rounded-full shadow-lg"
        >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
            onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-3 border border-white/20 hover:border-amber-500 text-white hover:text-amber-500 transition-colors bg-black/50 backdrop-blur-md rounded-full shadow-lg"
        >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="hidden md:flex gap-2 ml-4">
            {HERO_SLIDES.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-1 transition-all duration-500 rounded-full shadow-lg ${current === idx ? 'w-12 bg-amber-500' : 'w-4 bg-white/40'}`}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;