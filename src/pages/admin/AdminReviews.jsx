import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import { Star, MessageCircle, User, ShieldCheck } from 'lucide-react';

const AdminReviews = () => {
  const [farmerReviews, setFarmerReviews] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('farmer'); // 'farmer' or 'product'

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const fRevs = await dbService.getAllFarmerReviews();
        const pRevs = await dbService.getAllReviews();
        setFarmerReviews(fRevs);
        setProductReviews(pRevs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReviews();
  }, []);

  const activeReviews = activeTab === 'farmer' ? farmerReviews : productReviews;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-dark flex items-center space-x-2">
          <Star className="w-8 h-8 text-primary fill-primary" />
          <span>Platform Reviews & Moderation</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Monitor all customer feedback for farmers and products across the marketplace.
        </p>
      </div>

      <div className="flex border-b border-gray-100 space-x-8">
        <button 
          onClick={() => setActiveTab('farmer')}
          className={`pb-4 text-sm font-bold transition-all ${
            activeTab === 'farmer' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-400 hover:text-dark'
          }`}
        >
          Farmer Reviews ({farmerReviews.length})
        </button>
        <button 
          onClick={() => setActiveTab('product')}
          className={`pb-4 text-sm font-bold transition-all ${
            activeTab === 'product' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-400 hover:text-dark'
          }`}
        >
          Product Reviews ({productReviews.length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading reviews database...</div>
      ) : activeReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeReviews.map(rev => (
            <Card key={rev.id} className="space-y-3">
              <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-sm">{activeTab === 'farmer' ? rev.customerName : rev.userName}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">{formatDate(rev.createdAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-3 h-3 ${star <= rev.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              
              {activeTab === 'farmer' && (
                <div className="text-[10px] font-bold text-primary bg-emerald-50 inline-block px-2 py-0.5 rounded-full">
                  Target Farmer ID: {rev.farmerId}
                </div>
              )}
              {activeTab === 'product' && (
                <div className="text-[10px] font-bold text-amber-700 bg-amber-50 inline-block px-2 py-0.5 rounded-full">
                  Target Product ID: {rev.productId}
                </div>
              )}

              <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 mt-2">
                <p className="text-xs text-dark leading-relaxed font-medium">"{rev.comment}"</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
          <ShieldCheck className="w-12 h-12 text-emerald-600/30 mx-auto" />
          <h3 className="font-bold text-dark text-sm">No reviews found</h3>
          <p className="text-[11px] text-gray-400">There is no feedback available in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
