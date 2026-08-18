import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Users, Timer, Sparkles } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

const GroupBuyCard = ({ campaign, onJoin }) => {
  const progressPct = Math.min(100, Math.floor((campaign.currentMembers / campaign.targetMembers) * 100));

  return (
    <Card className="border border-purple-500/10 p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden group bg-white">
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="space-y-3.5">
        <div className="flex justify-between items-start">
          <span className="bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Save {campaign.discountPct}%</span>
          </span>

          <div className="flex items-center space-x-1 text-gray-400 text-[10px] font-semibold">
            <Timer className="w-3.5 h-3.5 text-purple-600" />
            <span>2 days remaining</span>
          </div>
        </div>

        <div>
          <h4 className="font-black text-sm text-dark leading-tight">{campaign.productTitle || "Fresh Crop Campaign"}</h4>
          <p className="text-[10px] text-gray-400 font-bold mt-0.5">Organized by Farmer Rahul G.</p>
        </div>

        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[10px] font-black text-dark">
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>{campaign.currentMembers} / {campaign.targetMembers} Buyers Joined</span>
            </span>
            <span className="text-purple-700 font-black">{progressPct}%</span>
          </div>
          <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full w-[0%]" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center mt-2.5">
        <div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Group Price</span>
          <span className="text-base font-black text-purple-700">₹32/kg</span>
        </div>

        <Button 
          onClick={() => onJoin(campaign)}
          variant="primary" 
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer"
        >
          Join Group Buy
        </Button>
      </div>

    </Card>
  );
};

export default GroupBuyCard;
