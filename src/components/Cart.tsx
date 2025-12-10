import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Key } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0500] z-[70] shadow-2xl border-l border-amber-900/30 flex flex-col"
          >
            {/* Header - Fixed Height, High Z-Index */}
            <div className="flex-none p-6 border-b border-amber-900/30 flex justify-between items-center bg-[#0a0500] relative z-20">
              <h2 className="text-xl font-serif font-bold text-amber-500">Your Garage</h2>
              <button onClick={onClose} className="text-amber-700 hover:text-amber-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable List - Auto Height */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10"
            >
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-amber-900/50">
                  <p className="font-serif text-xl">Garage Empty</p>
                  <button onClick={onClose} className="mt-4 text-amber-500 underline hover:text-amber-400">
                    Find a Classic
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    className="flex gap-4 bg-[#120a05] p-3 border border-amber-900/20 hover:border-amber-500/50 transition-colors group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop";
                      }}
                      className="w-24 h-24 object-cover sepia-[0.3] group-hover:sepia-0 transition-all"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-serif font-bold text-amber-100 text-lg">{item.name}</h4>
                      <p className="text-xs text-amber-700 mb-1">{item.brand}</p>
                      <p className="text-amber-500 font-mono">₹ {item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors self-center p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Footer - Fixed Height, High Z-Index */}
            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-none p-6 bg-[#0a0500] border-t border-amber-900/30 relative z-20 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-amber-700 uppercase tracking-widest text-sm">Total Value</span>
                  <span className="text-2xl font-serif font-bold text-amber-500">₹ {total.toLocaleString()}</span>
                </div>
                <button className="w-full py-4 bg-amber-600 text-black font-black uppercase tracking-widest hover:bg-amber-500 transition-colors flex items-center justify-center gap-2">
                  <Key className="w-5 h-5" />
                  Secure These Classics
                </button>
                <p className="text-center text-[10px] text-amber-800 mt-4">
                    Price excludes registration & restoration fees.
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;