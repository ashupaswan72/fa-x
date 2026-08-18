import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Star, Calendar, ShoppingBag, Sprout, Users } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/helpers';
import { showToast } from '../ui/Toast';

const ProductCard = ({ product, onAddToCart, onBuyNow, onPreorder, onGroupBuy, wishlist = [], onToggleWishlist }) => {
  const isFavorite = wishlist.includes(product.id);
  const [sharing, setSharing] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    setSharing(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      showToast("Link copied to clipboard! 📋", "success");
    } else {
      showToast("Sharing is not supported on this browser.", "info");
    }
    setTimeout(() => setSharing(false), 800);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="flex flex-col h-full"
    >
      <Card className="flex flex-col justify-between h-full border border-emerald-500/5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group bg-white">
        
        {/* Badges & Actions */}
        <div className="relative">
          <img 
            src={product.images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"} 
            alt={product.title} 
            className="w-full h-44 object-cover rounded-2xl bg-emerald-50"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
            {product.isOrganic && (
              <span className="bg-[#2E7D32] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm flex items-center space-x-0.5">
                <Sprout className="w-2.5 h-2.5" />
                <span>Organic</span>
              </span>
            )}
            
            {product.isPreorder ? (
              <span className="bg-[#FF9800] text-dark px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm flex items-center space-x-0.5">
                <Calendar className="w-2.5 h-2.5" />
                <span>Preorder ({product.advancePct || 20}%)</span>
              </span>
            ) : product.groupBuyCampaign ? (
              <span className="bg-purple-650 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm flex items-center space-x-0.5">
                <Users className="w-2.5 h-2.5" />
                <span>Group Buy</span>
              </span>
            ) : (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm flex items-center space-x-0.5">
                <ShoppingBag className="w-2.5 h-2.5" />
                <span>Buy Now</span>
              </span>
            )}
          </div>

          {/* Favorite & Share Buttons */}
          <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 z-10">
            <button 
              onClick={handleToggleFav}
              className={`p-2 rounded-xl backdrop-blur-md border shadow transition-all cursor-pointer ${
                isFavorite 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-white/80 border-white/20 text-gray-500 hover:text-red-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              disabled={sharing}
              className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/20 text-gray-500 hover:text-[#2E7D32] hover:bg-white transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                👨‍🌾 {product.farmerName || "Rahul G."} ({product.village || "Junagadh"})
              </span>
              
              <div className="flex items-center text-amber-500 text-[10px] font-bold">
                <Star className="w-3 h-3 fill-current mr-0.5" />
                <span>4.8 (12 reviews)</span>
              </div>
            </div>

            <h4 className="font-black text-sm text-dark leading-tight">{product.title}</h4>
            <p className="text-[10.5px] text-gray-400 font-medium leading-relaxed mt-1">{product.description}</p>
          </div>

          <div className="space-y-3 pt-2.5 border-t border-gray-50 mt-2.5">
            
            {/* Harvest & Stock details */}
            <div className="grid grid-cols-2 gap-2 text-[9.5px] text-gray-500 font-semibold">
              <div>
                <p className="text-[8px] uppercase tracking-wider text-gray-400">Harvest Date</p>
                <p className="text-dark font-bold">{product.harvestDate}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-wider text-gray-400">Available Stock</p>
                <p className="text-dark font-bold">{product.stock} kg</p>
              </div>
            </div>

            {/* Price & Action Triggers */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Price / kg</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-base font-black text-primary">{formatPrice(product.price)}</span>
                  {product.discountPrice && (
                    <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.discountPrice)}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {product.isPreorder ? (
                <Button 
                  onClick={() => onPreorder(product)}
                  variant="primary" 
                  size="sm"
                  className="bg-[#FF9800] hover:bg-[#FF9800]/95 text-dark font-bold rounded-xl cursor-pointer"
                >
                  Reserve Now
                </Button>
              ) : product.groupBuyCampaign ? (
                <Button 
                  onClick={() => onGroupBuy(product)}
                  variant="primary" 
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Join Group Buy
                </Button>
              ) : (
                <div className="flex space-x-1.5">
                  <Button 
                    onClick={() => onAddToCart(product)}
                    variant="outline" 
                    size="sm"
                    className="p-2 border-emerald-500/10 hover:bg-emerald-50 text-[#2E7D32] rounded-xl cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => onBuyNow(product)}
                    variant="primary" 
                    size="sm"
                    className="bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>

      </Card>
    </motion.div>
  );
};

export default ProductCard;
