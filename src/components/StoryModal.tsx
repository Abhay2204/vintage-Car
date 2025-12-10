import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-0 md:p-8 bg-black/95 backdrop-blur-md"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-[#0a0604] w-full max-w-5xl h-full md:h-[90vh] border border-amber-900/30 shadow-2xl overflow-hidden relative flex flex-col"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2 bg-black/50 rounded-full hover:bg-amber-600 text-white hover:text-black transition-colors border border-white/10"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Panel - Sticky Image */}
                    <div className="hidden md:block w-1/3 h-full relative">
                        <img 
                            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover filter sepia-[0.3] brightness-75"
                            alt="Vintage Workshop"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-8 right-8">
                             <h2 className="text-4xl font-heading font-black text-white leading-none mb-4">EST. <br/><span className="text-amber-500">1947</span></h2>
                             <p className="text-sm text-gray-400 font-serif italic">"Preserving the soul of the machine."</p>
                        </div>
                    </div>

                    {/* Right Panel - Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                         <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase block mb-6">Our Journey</span>
                         <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">The Resurrection of <br/> Indian Motoring</h3>
                         
                         <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed font-serif">
                            <p>
                                <span className="text-5xl float-left mr-3 mt-[-10px] text-amber-600 font-heading">I</span>t began with a simple memory. The smell of petrol and old leather in my grandfather's Ambassador. The way the heavy door thudded shut, sealing us in a capsule of silence and strength. For decades, these cars were not just vehicles; they were members of the Indian family.
                            </p>
                            <p>
                                But as the millennium turned, plastic replaced metal. Speed replaced character. The legends—the Ambassadors, the Padminis, the Contessas—were abandoned in rust and ruin, traded for fuel efficiency and air conditioning.
                            </p>
                            <div className="my-12 pl-6 border-l-4 border-amber-600 italic text-amber-100/80 text-xl">
                                "We realized we weren't just losing cars. We were losing our history."
                            </div>
                            <p>
                                <strong>Desi Classics</strong> was born out of a stubborn refusal to let that history die. We started in a small shed in Kolkata, hunting down chassis numbers that had been written off. We tracked down retired mechanics who knew how to tune a carburetor by ear. We scoured the markets of Chor Bazaar for original chrome detailing.
                            </p>
                            <p>
                                Today, we are more than a dealership. We are custodians. Every car that leaves our garage is stripped to its bare metal bones and rebuilt. We add modern reliability—better cooling, disc brakes, rust protection—without sacrificing a single ounce of its vintage soul.
                            </p>
                            <p>
                                When you drive a Desi Classic, you aren't just driving a car. You are driving a piece of India that refuses to be forgotten.
                            </p>
                            
                            <img 
                                src="https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=1200&auto=format&fit=crop"
                                className="w-full h-64 object-cover my-8 rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                                alt="Maruti 800"
                            />

                            <h4 className="text-2xl font-bold text-white mt-12 mb-4 font-heading">The Promise</h4>
                            <p>
                                We don't sell restoration projects. We sell turnkey time machines. Whether it's the diplomat's Ambassador or the movie star's Contessa, we ensure that the legacy lives on—one engine fire at a time.
                            </p>
                         </div>
                         
                         <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                            <div className="text-xs uppercase tracking-widest text-amber-700">The Founders</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Signature_sample.svg/1200px-Signature_sample.svg.png" className="h-12 invert opacity-50" alt="Signature" />
                         </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryModal;