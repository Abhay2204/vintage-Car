import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Award, History, Zap, Calendar, User, Phone, Power, Camera, MapPin } from 'lucide-react';
import { Car } from '../types';

interface CarDetailsProps {
  car: Car | null;
  onClose: () => void;
  onAddToCart: (car: Car) => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'book'>('details');
  const [engineStarted, setEngineStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(car?.image);

  if (!car) return null;

  // Mock Gallery Images (using variations of the main image or placeholder for demo)
  const galleryImages = [
    car.image,
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop', // Workshop/Interior vibe
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop', // Rear vibe
  ];

  const handleIgnition = () => {
    setEngineStarted(!engineStarted);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  const ignitionVariant = {
    idle: { scale: 1 },
    rumble: {
      x: [0, -2, 2, -2, 2, 0],
      y: [0, -1, 1, -1, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a0500]/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0, rotateX: -10 }}
          animate={engineStarted ? "rumble" : "idle"}
          variants={ignitionVariant}
          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: 100, opacity: 0, rotateX: 10 }}
          className="relative w-full max-w-6xl bg-[#120a05] overflow-hidden shadow-[0_0_50px_-12px_rgba(217,119,6,0.3)] border border-amber-900/30 flex flex-col md:flex-row max-h-[95vh] rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent z-20" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2 bg-black/50 rounded-full hover:bg-amber-600 hover:text-black transition-colors border border-white/10 cursor-hover group"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>

          {/* Visual Section */}
          <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-black group flex flex-col">
            <div className="relative flex-1 overflow-hidden">
                <img
                    src={currentImage || car.image}
                    alt={car.name}
                    className={`w-full h-full object-cover opacity-90 transition-transform duration-[5s] ${engineStarted ? 'scale-105' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#120a05] via-transparent to-transparent" />
                
                {/* Ignition Button */}
                <div className="absolute bottom-8 right-8 z-30">
                    <button 
                        onClick={handleIgnition}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md transition-all cursor-hover ${engineStarted ? 'bg-amber-600/20 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'bg-black/60 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Power className={`w-5 h-5 ${engineStarted ? 'animate-pulse' : ''}`} />
                        <span className="uppercase tracking-widest text-xs font-bold">{engineStarted ? 'Running' : 'Start'}</span>
                    </button>
                </div>

                <div className="absolute bottom-8 left-8">
                    <span className="text-amber-500 font-bold tracking-widest text-sm mb-2 block">{car.year} COLLECTION</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{car.name}</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span>Available in Mumbai</span>
                    </div>
                </div>
            </div>

            {/* Mini Gallery Strip */}
            <div className="h-24 bg-[#0a0500] border-t border-white/5 flex items-center px-6 gap-4 overflow-x-auto no-scrollbar">
                {galleryImages.map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentImage(img)}
                        className={`relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden border transition-all cursor-hover ${currentImage === img ? 'border-amber-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt="View" />
                        {idx === 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/50"><Camera className="w-4 h-4 text-white" /></div>}
                    </button>
                ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/5 p-6 md:p-10 overflow-y-auto bg-[#120a05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative">
            
            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-white/10 mb-8">
                <button 
                    onClick={() => setActiveTab('details')}
                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors cursor-hover relative ${activeTab === 'details' ? 'text-amber-500' : 'text-gray-600 hover:text-white'}`}
                >
                    Specifications
                    {activeTab === 'details' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500" />}
                </button>
                <button 
                    onClick={() => setActiveTab('book')}
                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-colors cursor-hover relative ${activeTab === 'book' ? 'text-amber-500' : 'text-gray-600 hover:text-white'}`}
                >
                    Test Drive
                    {activeTab === 'book' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500" />}
                </button>
            </div>

            {activeTab === 'details' ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div className="mb-8 border-l-2 border-amber-600 pl-4 py-1">
                        <p className="text-amber-100/80 text-lg leading-relaxed font-light italic">"{car.description}"</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {Object.entries(car.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center border-b border-white/5 pb-3 group">
                                <span className="text-xs uppercase text-amber-700 tracking-widest group-hover:text-amber-500 transition-colors">{key}</span>
                                <span className="text-lg font-heading text-white">{value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center border-b border-white/5 pb-3 pt-2">
                            <span className="text-xs uppercase text-amber-700 tracking-widest">Price</span>
                            <span className="text-3xl font-heading text-amber-500">₹ {car.price.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <History className="w-5 h-5 text-amber-600" />
                            <span>Original Papers & RC</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <Check className="w-5 h-5 text-amber-600" />
                            <span>150-Point Certified</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <Award className="w-5 h-5 text-amber-600" />
                            <span>6-Month Warranty</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-auto">
                         <button
                            onClick={() => onAddToCart(car)}
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors cursor-hover"
                        >
                            Add to Garage
                        </button>
                        <button
                            onClick={() => setActiveTab('book')}
                            className="flex-1 py-4 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] cursor-hover text-[10px] md:text-xs"
                        >
                            Inquire Now
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full flex flex-col">
                    <p className="text-gray-400 mb-8 font-light">
                        Experience the legend firsthand. Schedule a private viewing at our heritage facility.
                    </p>
                    
                    <form className="space-y-6 flex-1" onSubmit={(e) => { e.preventDefault(); alert('Request sent! Our concierge will call you shortly.'); }}>
                        <div className="space-y-1 group">
                            <label className="text-[10px] uppercase tracking-widest text-amber-700 font-bold group-focus-within:text-amber-500 transition-colors">Full Name</label>
                            <div className="flex items-center border-b border-white/20 pb-2 group-focus-within:border-amber-500 transition-colors">
                                <User className="w-4 h-4 text-gray-500 mr-3 group-focus-within:text-amber-500" />
                                <input type="text" className="bg-transparent w-full text-white outline-none font-serif placeholder-gray-700 cursor-none" placeholder="Maharaja of..." />
                            </div>
                        </div>

                         <div className="space-y-1 group">
                            <label className="text-[10px] uppercase tracking-widest text-amber-700 font-bold group-focus-within:text-amber-500 transition-colors">Phone</label>
                            <div className="flex items-center border-b border-white/20 pb-2 group-focus-within:border-amber-500 transition-colors">
                                <Phone className="w-4 h-4 text-gray-500 mr-3 group-focus-within:text-amber-500" />
                                <input type="tel" className="bg-transparent w-full text-white outline-none font-serif placeholder-gray-700 cursor-none" placeholder="+91..." />
                            </div>
                        </div>

                         <div className="space-y-1 group">
                            <label className="text-[10px] uppercase tracking-widest text-amber-700 font-bold group-focus-within:text-amber-500 transition-colors">Preferred Date</label>
                            <div className="flex items-center border-b border-white/20 pb-2 group-focus-within:border-amber-500 transition-colors">
                                <Calendar className="w-4 h-4 text-gray-500 mr-3 group-focus-within:text-amber-500" />
                                <input type="date" className="bg-transparent w-full text-white outline-none font-serif text-gray-400 cursor-none" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 py-5 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(217,119,6,0.3)] flex items-center justify-center gap-2 cursor-hover"
                        >
                            <Zap className="w-5 h-5 fill-black" />
                            Request Drive
                        </button>
                    </form>
                </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarDetails;