import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Wrench, FileCheck, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Vintage",
    desc: "Every vehicle undergoes a rigorous 150-point mechanical and aesthetic inspection by veteran mechanics."
  },
  {
    icon: Truck,
    title: "White Glove Delivery",
    desc: "From our garage to your driveway, enclosed transport ensures your classic arrives in showroom condition anywhere in India."
  },
  {
    icon: Wrench,
    title: "Lifetime Support",
    desc: "Access to our exclusive spare parts network and priority booking for annual maintenance services."
  },
  {
    icon: FileCheck,
    title: "Paperwork Sorted",
    desc: "We handle the RTO transfer, fitness renewal, and green tax. You just turn the key and drive."
  },
  {
    icon: Globe,
    title: "Sourcing Network",
    desc: "Can't find your dream model? Our scouts across 12 states will track down specific chassis for you."
  },
  {
    icon: Clock,
    title: "6-Month Warranty",
    desc: "Unheard of in the vintage market, we stand by our restoration quality with a comprehensive powertrain warranty."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#161616] relative border-b border-amber-900/10 overflow-hidden">
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <h3 className="text-[20vw] font-heading font-black text-white/[0.02] uppercase absolute -top-10 -left-10 leading-none whitespace-nowrap">Standards</h3>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 text-center">
             <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase block mb-4"
            >
                Why Choose Us
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-heading font-bold text-white"
            >
                The Gold Standard
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-8 border border-white/10 bg-[#1f1f1f] hover:bg-amber-900/[0.1] hover:border-amber-500/30 transition-all duration-300 group cursor-hover"
                >
                    <div className="w-12 h-12 bg-amber-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors">
                        <feature.icon className="w-6 h-6 text-amber-500 group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-amber-100 mb-3 group-hover:text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">{feature.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Features;