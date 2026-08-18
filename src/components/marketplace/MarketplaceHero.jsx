import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, ShieldCheck, HeartHandshake, Truck, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const MarketplaceHero = ({ onExploreClick, onBecomeFarmerClick }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-emerald-500/10">
      
      {/* Sunrise Farm Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "linear-gradient(rgba(46, 125, 50, 0.82), rgba(27, 27, 27, 0.92)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Pitch Text */}
        <div className="lg:col-span-7 text-left space-y-6 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2.5"
          >
            <span className="bg-white/10 text-emerald-300 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1">
              <span>🌾 Direct from Farmers</span>
            </span>
            <span className="bg-white/10 text-emerald-300 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1">
              <span>📅 Preorder & Save</span>
            </span>
            <span className="bg-white/10 text-emerald-300 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1">
              <span>👥 Group Buy & Save</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6.5xl font-black tracking-tight leading-none"
          >
            Fresh Produce. <br />
            Better Prices. <br />
            <span className="text-[#4CAF50]">Stronger Farmers.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-emerald-100/80 leading-relaxed font-semibold max-w-xl"
          >
            FA-X connects farmers directly with customers through preorder, group buying and bulk purchasing to reduce wastage and guarantee better margins.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button 
              onClick={onExploreClick}
              variant="primary" 
              className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#2E7D32]/95 hover:to-[#4CAF50]/95 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 border-none"
            >
              <span>Shop Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
              onClick={onBecomeFarmerClick}
              variant="outline" 
              className="border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 cursor-pointer"
            >
              Become a Farmer
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Farmer Image & Floating Badges */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600" 
              alt="Smiling Farmer" 
              className="w-full h-[380px] object-cover rounded-[2.5rem] border border-white/10 shadow-2xl bg-emerald-950/30"
            />

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 text-dark font-bold text-[10px]"
            >
              <Sprout className="w-4.5 h-4.5 text-[#2E7D32]" />
              <span>✓ Fresh Produce</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute top-1/3 -right-6 bg-white/95 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 text-dark font-bold text-[10px]"
            >
              <HeartHandshake className="w-4.5 h-4.5 text-[#FF9800]" />
              <span>✓ No Middlemen</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
              className="absolute top-2/3 -left-6 bg-white/95 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 text-dark font-bold text-[10px]"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-[#2E7D32]" />
              <span>✓ Best Prices</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute -bottom-4 right-6 bg-white/95 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 text-dark font-bold text-[10px]"
            >
              <Truck className="w-4.5 h-4.5 text-purple-600" />
              <span>✓ Fast Delivery</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MarketplaceHero;
