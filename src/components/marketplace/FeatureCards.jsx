import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ShoppingBag, Calendar, Users, ArrowRight } from 'lucide-react';

const FeatureCards = ({ onBuyNowClick, onPreorderClick, onGroupBuyClick }) => {
  return (
    <section className="py-16 space-y-12 bg-[#F8FFF8]">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#FF9800] text-xs font-black uppercase tracking-widest font-sans">Shop By Your Need</span>
        <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tight">Three Purchasing Methods</h2>
        <p className="text-xs text-gray-500 font-semibold leading-relaxed">
          Select from our three direct-access purchasing models designed to match crop availability with your budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* BUY NOW (Green) */}
        <motion.div 
          whileHover={{ y: -6 }}
          className="flex flex-col h-full"
        >
          <Card className="flex-grow p-8 border border-emerald-500/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-6 bg-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="space-y-4">
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl inline-block">
                <ShoppingBag className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Buy Now</span>
                <h3 className="text-lg font-black text-dark">Buy Now</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Sourced from ready-to-ship, active inventory harvested by verified farmers. Ideal for daily household consumption.
                </p>
              </div>
            </div>
            <Button 
              onClick={onBuyNowClick}
              variant="primary" 
              className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold rounded-xl py-3 flex items-center justify-center space-x-1.5 cursor-pointer border-none"
            >
              <span>Shop Instantly</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </motion.div>

        {/* PREORDER (Orange) */}
        <motion.div 
          whileHover={{ y: -6 }}
          className="flex flex-col h-full"
        >
          <Card className="flex-grow p-8 border border-amber-500/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-6 bg-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
            <div className="space-y-4">
              <div className="bg-amber-100 text-amber-950 p-4 rounded-2xl inline-block">
                <Calendar className="w-6 h-6 text-[#FF9800]" />
              </div>
              <div className="space-y-2">
                <span className="bg-amber-100 text-amber-950 border border-amber-200 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Reserve Pre-Harvest</span>
                <h3 className="text-lg font-black text-dark">Preorder</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Reserve fresh yields weeks before harvest by paying a 20-30% deposit today. Locks in current prices and secures supply.
                </p>
              </div>
            </div>
            <Button 
              onClick={onPreorderClick}
              variant="primary" 
              className="w-full bg-[#FF9800] hover:bg-[#FF9800]/95 text-dark font-bold rounded-xl py-3 flex items-center justify-center space-x-1.5 cursor-pointer border-none"
            >
              <span>Reserve Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </motion.div>

        {/* GROUP BUY (Purple) */}
        <motion.div 
          whileHover={{ y: -6 }}
          className="flex flex-col h-full"
        >
          <Card className="flex-grow p-8 border border-purple-500/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-6 bg-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
            <div className="space-y-4">
              <div className="bg-purple-100 text-purple-800 p-4 rounded-2xl inline-block">
                <Users className="w-6 h-6 text-purple-650" />
              </div>
              <div className="space-y-2">
                <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Group Buy</span>
                <h3 className="text-lg font-black text-dark">Group Buy</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Pool orders with other community buyers. Once target capacity is met, bulk volume discounts unlock automatically.
                </p>
              </div>
            </div>
            <Button 
              onClick={onGroupBuyClick}
              variant="primary" 
              className="w-full bg-purple-650 hover:bg-purple-700 text-white font-bold rounded-xl py-3 flex items-center justify-center space-x-1.5 cursor-pointer border-none"
            >
              <span>Join Group Buy</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default FeatureCards;
export { FeatureCards };
