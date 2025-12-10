import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import CarDetails from './components/CarDetails';
import Cart from './components/Cart';

import Features from './components/Features';
import Reviews from './components/Reviews';
import StoryModal from './components/StoryModal';
import SmoothScroll from './components/SmoothScroll';
import { FilmGrain, CustomCursor } from './components/UiEnhancements';
import { CARS } from './constants';
import { Car, CartItem } from './types';
import { motion, useScroll, useTransform } from 'framer-motion';

const App: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [scrollRange, setScrollRange] = useState(0);
  
  // Refs for scroll animations
  const showroomRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: showroomRef,
    offset: ["start start", "end end"]
  });

  // Calculate the exact scroll distance needed
  useEffect(() => {
    const updateScrollRange = () => {
      if (scrollContainerRef.current) {
        const totalWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Calculate how much we need to scroll to see the end
        // Subtract viewport width but add some padding (e.g., 48px) to keep the last item clearly visible
        const range = totalWidth - viewportWidth + 48;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    // Update on mount, filter change, and resize
    updateScrollRange();
    // Small timeout to ensure DOM is rendered with correct widths after filter change
    const timer = setTimeout(updateScrollRange, 100);
    
    window.addEventListener('resize', updateScrollRange);
    return () => {
        window.removeEventListener('resize', updateScrollRange);
        clearTimeout(timer);
    };
  }, [filter, CARS]);

  // Transform vertical scroll to horizontal movement using pixels
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);
  
  // Parallax opacity for the title as we scroll deep into the list
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]); 
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  // Parallax for background text
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const addToCart = (car: Car) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === car.id);
      if (existing) {
        return prev.map(item =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...car, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredCars = filter === 'All' 
    ? CARS 
    : CARS.filter(car => car.category === filter);

  const categories = ['All', ...Array.from(new Set(CARS.map(c => c.category)))];

  // Modern Restoration Steps Data
  const restorationSteps = [
    { title: "The Hunt", desc: "Scouting original chassis from remote villages and single owners." },
    { title: "The Heart Transplant", desc: "Complete engine teardown and rebuild using authentic OEM components." },
    { title: "The Royal Treatment", desc: "Stripping down to bare metal, premium paint, and hand-stitched leather." },
    { title: "The Seal of Approval", desc: "100-point mechanical inspection and fitness certification before handover." }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <SmoothScroll>
    <div className="bg-[#111111] text-white selection:bg-amber-500 selection:text-black font-sans cursor-none">
      <CustomCursor />
      <FilmGrain />
      <Navbar 
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="h-screen w-full relative z-10">
        <Hero />
      </section>

      {/* Marquee - Branding */}
      <div className="bg-[#1a1a1a] py-8 border-y border-amber-900/10 overflow-hidden relative z-20 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.5)]">
        <div className="flex gap-16 whitespace-nowrap opacity-60">
            <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="flex gap-32 items-center"
            >
                {[...Array(3)].map((_, i) => (
                    <React.Fragment key={i}>
                         <span className="text-xl font-heading font-bold tracking-[0.3em] uppercase text-amber-700">Hindustan Motors</span>
                         <span className="w-2 h-2 rounded-full bg-amber-800" />
                         <span className="text-xl font-heading font-bold tracking-[0.3em] uppercase text-amber-700">Premier</span>
                         <span className="w-2 h-2 rounded-full bg-amber-800" />
                         <span className="text-xl font-heading font-bold tracking-[0.3em] uppercase text-amber-700">Maruti Udyog</span>
                         <span className="w-2 h-2 rounded-full bg-amber-800" />
                         <span className="text-xl font-heading font-bold tracking-[0.3em] uppercase text-amber-700">Mahindra</span>
                         <span className="w-2 h-2 rounded-full bg-amber-800" />
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
      </div>

      {/* Showroom Section - Horizontal Scroll */}
      <section ref={showroomRef} id="showroom" className="relative h-[400vh] bg-[#111111] z-10">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-b border-amber-900/10">
            
            {/* Background Typography - Centered */}
            <motion.div 
                style={{ y: bgTextY }}
                className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center"
            >
                <h3 className="text-[15vw] font-heading font-black text-white/[0.02] uppercase leading-none whitespace-nowrap">Inventory</h3>
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 mb-8 flex-shrink-0 relative z-10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-4 border-b border-white/10">
                    <motion.div
                        style={{ opacity: headerOpacity, scale: headerScale, y: headerY }}
                        className="origin-bottom-left"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-8 bg-amber-500" />
                            <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase">Inventory</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-heading font-bold text-white leading-none">The Royal Garage</h2>
                    </motion.div>
                    
                    {/* Filters */}
                    <motion.div 
                        style={{ opacity: headerOpacity }}
                        className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar"
                    >
                        {categories.map((cat) => (
                            <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border cursor-hover ${
                                filter === cat 
                                ? 'bg-amber-600 border-amber-600 text-black' 
                                : 'bg-transparent border-white/20 text-gray-400 hover:border-amber-500 hover:text-amber-500'
                            }`}
                            >
                            {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Horizontal Moving Track */}
            <div className="w-full relative pl-6 md:pl-12 flex items-center z-10">
                <motion.div 
                    ref={scrollContainerRef}
                    style={{ x }}
                    className="flex gap-8 w-max pr-12 py-12"
                >
                    {filteredCars.map((car, idx) => (
                        <CarCard 
                            key={car.id}
                            car={car} 
                            onSelect={setSelectedCar}
                            onAddToCart={addToCart}
                        />
                    ))}
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-4 left-12 flex items-center gap-2 text-amber-500/50 text-xs uppercase tracking-widest pointer-events-none"
                >
                    <div className="w-12 h-[1px] bg-amber-500/50" />
                    Scroll Down to Explore
                </motion.div>
            </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />

      {/* Resurrection Protocol - Process */}
      <section id="services" className="py-32 bg-[#161616] relative flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 z-10">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="mb-24 relative"
            >
                <div className="absolute -top-12 md:-top-48 left-0 w-full flex items-center justify-center pointer-events-none select-none">
                    <h3 className="text-6xl md:text-[15rem] font-heading font-black text-white/[0.03] uppercase whitespace-nowrap">Process</h3>
                </div>
                <div className="relative">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Our Craft</span>
                    <h4 className="text-4xl md:text-6xl font-heading font-bold text-white max-w-2xl leading-tight">The Resurrection Protocol</h4>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-0 border-t border-amber-900/20">
                {restorationSteps.map((step, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative border-b border-amber-900/20 py-16 hover:bg-amber-900/[0.1] transition-all duration-500 cursor-hover"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10">
                            <div className="flex items-baseline gap-8 md:w-1/2">
                                <span className="text-6xl font-heading font-black text-amber-900/40 group-hover:text-amber-600 transition-colors duration-500">
                                    0{index + 1}
                                </span>
                                <h5 className="text-2xl md:text-4xl font-heading font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                                    {step.title}
                                </h5>
                            </div>
                            <div className="md:w-1/2 md:pl-12">
                                <p className="text-lg text-gray-400 group-hover:text-amber-100/90 transition-colors duration-300 font-light leading-relaxed max-w-xl">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="py-32 bg-[#111111] flex items-center relative overflow-hidden">
         {/* Background Typography - Centered */}
         <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center">
             <h3 className="text-[20vw] font-heading font-black text-white/[0.02] uppercase leading-none">Legacy</h3>
         </div>

         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50 z-0" />
         
         <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-20 items-center">
                <div className="w-full md:w-1/2">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-6 border border-amber-500/20 rotate-3 z-0" />
                        <div className="absolute -inset-6 border border-white/10 -rotate-2 z-0" />
                        <img 
                            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Vintage Mechanic Workshop" 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop";
                            }}
                            className="relative z-10 w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                        />
                    </motion.div>
                </div>
                <div className="w-full md:w-1/2">
                    <motion.div
                         initial={{ opacity: 0, x: 50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-500 text-sm font-bold tracking-[0.4em] uppercase block mb-6">Legacy</span>
                        <h3 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-[0.9] text-white">
                            Preserving <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">India's Soul</span>
                        </h3>
                        <p className="text-gray-300 leading-loose mb-10 text-lg font-light max-w-lg border-l-2 border-amber-900/50 pl-6">
                            From the bustling streets of Calcutta to the winding roads of Ooty, these machines moved a nation. Desi Classics is dedicated to keeping these stories alive, one engine at a time.
                        </p>
                        <button 
                            onClick={() => setIsStoryOpen(true)}
                            className="cursor-hover px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                        >
                            Read Our Story
                        </button>
                    </motion.div>
                </div>
            </div>
         </div>
      </section>
      
      {/* Reviews Section */}
      <Reviews />

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-amber-500/20 py-24 relative overflow-hidden flex flex-col justify-center">
        {/* Decorative huge text - Centered */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
             <h1 className="text-[10rem] md:text-[20rem] font-heading font-black text-white whitespace-nowrap leading-none">VINTAGE</h1>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Join the <span className="text-amber-500">Club</span></h2>
                    <p className="text-gray-300 mb-10 max-w-md text-lg leading-relaxed">
                        Get exclusive access to new inventory drops, private auctions, and restoration stories before they go public.
                    </p>
                    <div className="flex w-full max-w-md bg-white/10 border border-white/20 focus-within:border-amber-500 transition-colors p-1 group">
                        <input 
                            type="email" 
                            placeholder="email@example.com" 
                            className="bg-transparent w-full px-6 py-4 text-white outline-none placeholder-gray-500 font-sans cursor-none" 
                        />
                        <button className="cursor-hover bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest px-8 transition-colors">
                            Join
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-12 pt-4">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                     >
                        <h4 className="text-amber-500 font-bold uppercase tracking-widest mb-8 text-sm">Explore</h4>
                        <ul className="space-y-4 text-gray-400 font-light">
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Inventory</li>
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Restoration</li>
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Sold Cars</li>
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Journal</li>
                        </ul>
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                     >
                        <h4 className="text-amber-500 font-bold uppercase tracking-widest mb-8 text-sm">Legal</h4>
                        <ul className="space-y-4 text-gray-400 font-light">
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Privacy Policy</li>
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Terms of Service</li>
                            <li className="cursor-hover hover:text-white hover:translate-x-2 transition-all cursor-pointer">Shipping Policy</li>
                        </ul>
                     </motion.div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                <p>&copy; 2024 Desi Classics. Made in India.</p>
                <div className="flex gap-8 mt-6 md:mt-0">
                     <span className="cursor-hover hover:text-amber-500 cursor-pointer transition-colors">Instagram</span>
                     <span className="cursor-hover hover:text-amber-500 cursor-pointer transition-colors">Twitter</span>
                     <span className="cursor-hover hover:text-amber-500 cursor-pointer transition-colors">YouTube</span>
                </div>
            </div>
        </div>
      </footer>

      {/* Overlays */}
      <CarDetails 
        car={selectedCar} 
        onClose={() => setSelectedCar(null)}
        onAddToCart={addToCart}
      />
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
      />

    </div>
    </SmoothScroll>
  );
};

export default App;