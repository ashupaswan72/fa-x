import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Sparkles } from 'lucide-react';
import { showToast } from '../ui/Toast';

const OfferSection = ({ onOfferClick }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  const handleClaim = (cropName) => {
    showToast(`Seasonal code applied for ${cropName}! Proceeding to cart. 🎟️`, "success");
    if (onOfferClick) onOfferClick();
  };

  return (
    <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#2E7D32]/5 rounded-3xl border border-emerald-500/5 p-8 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF9800]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="lg:col-span-5 space-y-6">
        <span className="bg-[#FF9800]/15 text-[#FF9800] border border-[#FF9800]/15 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Special Offer Section</span>
        </span>
        
        <h2 className="text-3xl font-black tracking-tight text-dark leading-none">
          Harvest Rush Deals <br />
          <span className="text-[#2E7D32]">Ending Soon</span>
        </h2>

        <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-sm">
          Claim early preorder discounts and group buy spots on premium organic yields before harvest window closes.
        </p>

        <div className="flex items-center space-x-3 pt-2">
          <div className="flex flex-col items-center bg-white border border-emerald-500/10 p-3 rounded-2xl w-14 shadow-sm">
            <span className="text-lg font-black text-dark leading-none">{formatNum(timeLeft.hours)}</span>
            <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">Hrs</span>
          </div>
          <span className="text-dark font-black text-lg">:</span>
          <div className="flex flex-col items-center bg-white border border-emerald-500/10 p-3 rounded-2xl w-14 shadow-sm">
            <span className="text-lg font-black text-dark leading-none">{formatNum(timeLeft.minutes)}</span>
            <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">Min</span>
          </div>
          <span className="text-dark font-black text-lg">:</span>
          <div className="flex flex-col items-center bg-white border border-emerald-500/10 p-3 rounded-2xl w-14 shadow-sm">
            <span className="text-lg font-black text-dark leading-none">{formatNum(timeLeft.seconds)}</span>
            <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">Sec</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        
        <Card className="border border-emerald-500/10 p-5 bg-white space-y-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">Preorder Deal</span>
            <span className="text-[#FF9800] text-xs font-black">Save 30%</span>
          </div>
          <div>
            <h4 className="font-black text-sm text-dark leading-none">Organic Alphonso Mangoes</h4>
            <p className="text-[9.5px] text-gray-400 font-bold mt-1">Direct from Devgad fields</p>
          </div>
          <Button 
            onClick={() => handleClaim("Alphonso Mangoes")}
            variant="outline" 
            size="sm"
            className="w-full border-emerald-500/10 hover:bg-emerald-50 text-[#2E7D32] font-bold py-2 rounded-xl text-xs cursor-pointer"
          >
            Claim Offer
          </Button>
        </Card>

        <Card className="border border-emerald-500/10 p-5 bg-white space-y-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">Group Buy Deal</span>
            <span className="text-purple-650 text-xs font-black">Save 25%</span>
          </div>
          <div>
            <h4 className="font-black text-sm text-dark leading-none">Pure Himalayan Honey</h4>
            <p className="text-[9.5px] text-gray-400 font-bold mt-1">Direct from verified keepers</p>
          </div>
          <Button 
            onClick={() => handleClaim("Himalayan Honey")}
            variant="outline" 
            size="sm"
            className="w-full border-emerald-500/10 hover:bg-emerald-50 text-[#2E7D32] font-bold py-2 rounded-xl text-xs cursor-pointer"
          >
            Claim Offer
          </Button>
        </Card>

      </div>

    </section>
  );
};

export default OfferSection;
export { OfferSection };
