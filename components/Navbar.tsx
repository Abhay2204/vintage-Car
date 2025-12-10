import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Heritage', href: '#heritage' },
    { name: 'Collection', href: '#showroom' },
    { name: 'Restoration', href: '#services' },
    { name: 'Concierge', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'bg-[#111111]/90 backdrop-blur-md py-4 border-amber-900/30 shadow-2xl' 
            : 'bg-transparent py-8 border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <Crown className="w-8 h-8 text-amber-500 relative z-10" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-heading font-bold tracking-[0.2em] text-amber-50 leading-none">DESI</span>
                <span className="text-xs md:text-sm font-heading font-bold tracking-[0.4em] text-amber-600 leading-none">CLASSICS</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium uppercase tracking-[0.15em] text-amber-100/60 hover:text-amber-500 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:bg-amber-900/20 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 text-amber-200 group-hover:text-amber-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#111111]">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 text-amber-200"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#111111] flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-2 text-amber-500 hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-heading font-bold text-amber-100 hover:text-amber-500 tracking-widest uppercase transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <div className="absolute bottom-12 text-amber-900/40 text-xs tracking-[0.5em] uppercase">
                Est. 1947
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;