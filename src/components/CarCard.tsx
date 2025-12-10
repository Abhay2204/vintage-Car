import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { Plus, ArrowRight, Gauge, Cog } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  onAddToCart: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelect, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative w-[320px] md:w-[400px] flex-shrink-0 bg-[#222222] border border-white/10 hover:border-amber-500/50 transition-colors duration-500 flex flex-col h-[580px] overflow-hidden rounded-sm"
    >
      {/* Image Container */}
      <div 
        className="relative h-[65%] overflow-hidden cursor-pointer bg-[#1a1a1a]"
        onClick={() => onSelect(car)}
      >
        <div className="absolute top-4 left-4 z-20">
             <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-600 text-black shadow-lg backdrop-blur-md">
                {car.year}
            </span>
        </div>
        
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          src={imgError ? "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" : car.image}
          onError={() => setImgError(true)}
          alt={car.name}
          className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.1]"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent opacity-90" />
        
        {/* Hover Quick Stats Reveal */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/80 backdrop-blur-md border-t border-amber-900/30 flex justify-between items-center z-20">
             <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-amber-100">{car.specs.topSpeed}</span>
             </div>
             <div className="flex items-center gap-2">
                <Cog className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-amber-100">{car.specs.engine}</span>
             </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-8 flex flex-col flex-1 border-t border-amber-900/20 bg-[#222222]">
        {/* Decorative Line */}
        <div className="absolute top-0 right-8 w-[1px] h-12 bg-amber-500/20" />

        <div className="mb-auto mt-2">
            <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em]">{car.brand}</p>
                <p className="text-lg font-heading font-bold text-amber-500">₹ {(car.price / 100000).toFixed(2)}L</p>
            </div>
            
            <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-amber-500 transition-colors duration-300">{car.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{car.description}</p>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
            <button 
                onClick={() => onSelect(car)}
                className="flex-1 group/btn flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 py-3 px-4"
            >
                View Specs
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform text-amber-500" />
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(car);
                }}
                className="w-10 h-10 flex items-center justify-center bg-amber-600 text-black hover:bg-amber-500 transition-all shadow-[0_0_15px_-5px_rgba(245,158,11,0.5)]"
                aria-label="Add to cart"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;