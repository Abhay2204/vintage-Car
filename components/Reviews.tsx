import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Vikram Malhotra",
    location: "Mumbai",
    car: "Premier Padmini S1",
    text: "Buying a Padmini was a childhood dream. Desi Classics didn't just sell me a car; they sold me a time machine. The restoration detail is absolutely factory-spec.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Aditi Rao",
    location: "Bangalore",
    car: "Contessa Classic",
    text: "I was skeptical about buying a vintage car online. But the video consultation and the 'Ignition' feature gave me chills. The car runs smoother than my modern sedan.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Col. Sher Singh (Retd)",
    location: "Chandigarh",
    car: "Ambassador Grand",
    text: "Solid iron. That's what I wanted. The team found me a pristine 1998 model. Driving it feels like commanding a tank again. Jai Hind!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-24 bg-[#111111] relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 transform -rotate-12">
             <Quote className="w-64 h-64 text-amber-500" />
          </div>
          {/* Background Typography */}
          <div className="absolute bottom-[-5%] right-[-5%] transform -rotate-2">
             <h3 className="text-[25vw] font-heading font-black text-white/[0.7] uppercase leading-none opacity-50">Voices</h3>
          </div>
       </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
             >
                <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase block mb-4">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">Garage Stories</h2>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center gap-2 mt-4 md:mt-0"
             >
                 <div className="flex text-amber-500">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                 </div>
                 <span className="text-gray-400 text-sm font-bold tracking-widest uppercase ml-2">5.0 Average Rating</span>
             </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-[#1a1a1a] border border-amber-900/20 p-8 relative group hover:border-amber-500/40 transition-colors"
                >
                    <div className="absolute -top-4 -right-4 bg-amber-600 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                        Verified Owner
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" />
                        <div>
                            <h4 className="font-serif font-bold text-white leading-none mb-1">{review.name}</h4>
                            <p className="text-xs text-amber-600 uppercase tracking-wider">{review.location}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex text-amber-500 mb-2 text-xs">
                             {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                        <p className="text-gray-300 font-light leading-relaxed italic">"{review.text}"</p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Purchased: <span className="text-amber-700">{review.car}</span></span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;