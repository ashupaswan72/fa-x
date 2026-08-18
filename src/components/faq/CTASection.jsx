import React from 'react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const CTASection = ({ onExplore, onRegister }) => {
  return (
    <section className="bg-dark text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden border border-emerald-950 mt-16 max-w-4xl mx-auto shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white">
          Ready to Experience Fresh Farm Produce?
        </h2>
        <p className="text-xs text-emerald-200/70 font-semibold max-w-sm mx-auto">
          Reserve seasonal yields early, organize community buying clubs, or start selling directly from your agricultural fields.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Button 
          onClick={onExplore}
          variant="primary" 
          className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#2E7D32]/95 hover:to-[#4CAF50]/95 text-white font-bold px-8 py-3.5 rounded-xl cursor-pointer flex items-center space-x-1.5 border-none shadow-lg"
        >
          <span>Explore Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <Button 
          onClick={onRegister}
          variant="outline" 
          className="border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 cursor-pointer"
        >
          Become a Farmer
        </Button>
      </div>

    </section>
  );
};

export default CTASection;
