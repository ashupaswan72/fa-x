import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Calendar } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

const PreorderCard = ({ product, onReserve }) => {
  const advancePrice = Math.floor(product.price * (product.advancePct / 100));
  const remainingPrice = product.price - advancePrice;

  return (
    <Card className="border border-amber-500/10 p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden group bg-white">
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />

      <div className="space-y-3.5">
        <div className="flex justify-between items-start">
          <span className="bg-amber-100 text-amber-950 border border-amber-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1">
            <Calendar className="w-2.5 h-2.5" />
            <span>Preorder crop</span>
          </span>

          <span className="bg-[#2E7D32]/10 text-primary border border-emerald-500/5 px-2 py-0.5 rounded text-[8px] font-black uppercase">
            {product.advancePct}% Advance
          </span>
        </div>

        <div>
          <h4 className="font-black text-sm text-dark leading-tight">{product.title || "Pre-Harvest Yield"}</h4>
          <p className="text-[10px] text-gray-400 font-bold mt-0.5">Estimated Harvest: <span className="text-dark font-black">{product.harvestDate}</span></p>
        </div>

        <div className="bg-amber-50/20 border border-amber-500/5 rounded-xl p-3 text-[10px] space-y-2 font-semibold">
          <div className="flex justify-between items-center text-gray-500">
            <span>Pay Advance Today ({product.advancePct}%)</span>
            <span className="text-dark font-black">{formatPrice(advancePrice)} / kg</span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span>Pay Post-Harvest Balance ({100 - product.advancePct}%)</span>
            <span className="text-dark font-black">{formatPrice(remainingPrice)} / kg</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center mt-2.5">
        <div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Total Price</span>
          <span className="text-base font-black text-dark">{formatPrice(product.price)}</span>
        </div>

        <Button 
          onClick={() => onReserve(product)}
          variant="primary" 
          size="sm"
          className="bg-[#FF9800] hover:bg-[#FF9800]/95 text-dark font-bold rounded-xl cursor-pointer"
        >
          Reserve Now
        </Button>
      </div>

    </Card>
  );
};

export default PreorderCard;
