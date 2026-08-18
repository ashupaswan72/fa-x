import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Star, Award } from 'lucide-react';
import { showToast } from '../ui/Toast';

const FarmerCard = ({ farmer }) => {
  const handleVisitStore = () => {
    showToast(`Navigating to ${farmer.name}'s virtual farm store! 👨🌾`, "info");
  };

  return (
    <Card className="border border-emerald-500/5 p-6 space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden group bg-white">
      
      <div className="flex items-center space-x-4">
        <img 
          src={farmer.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
          alt={farmer.name} 
          className="w-14 h-14 rounded-2xl object-cover bg-emerald-50 border border-emerald-500/10"
        />
        
        <div>
          <div className="flex items-center space-x-1">
            <h4 className="font-black text-sm text-dark leading-tight">{farmer.name}</h4>
            <Award className="w-4 h-4 text-primary" title="Verified Producer" />
          </div>
          <p className="text-[10px] text-gray-400 font-bold mt-0.5">📍 Village: {farmer.village || "Bihar"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-500 bg-emerald-50/20 border border-emerald-500/5 p-3 rounded-xl">
        <div>
          <p className="text-[8px] uppercase tracking-wider text-gray-400">Experience</p>
          <p className="text-dark font-black">{farmer.experience || "8+ Years"}</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] uppercase tracking-wider text-gray-400">Listed Crops</p>
          <p className="text-dark font-black">{farmer.cropsCount || "5 Active"}</p>
        </div>
      </div>

      <div className="pt-2.5 border-t border-gray-50 flex justify-between items-center">
        <div className="flex items-center text-amber-500 text-[10.5px] font-black">
          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
          <span>4.9 (48 ratings)</span>
        </div>

        <Button 
          onClick={handleVisitStore}
          variant="outline" 
          size="sm"
          className="border-emerald-500/10 hover:bg-emerald-50 text-[#2E7D32] rounded-xl cursor-pointer py-1.5"
        >
          Visit Store
        </Button>
      </div>

    </Card>
  );
};

export default FarmerCard;
