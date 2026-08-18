import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import { Star, MessageCircle, User } from 'lucide-react';

const FarmerReviews = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (currentUser) {
        try {
          const farmerRevs = await dbService.getFarmerReviews(currentUser.uid);
          setReviews(farmerRevs);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReviews();
  }, [currentUser]);

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-50 pb-4">
        <div>
          <h1 className="text-3xl font-black text-dark flex items-center space-x-2">
            <Star className="w-8 h-8 text-primary fill-primary" />
            <span>Customer Feedback</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            See what customers are saying about your produce and service.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-emerald-50/50 px-6 py-3 rounded-2xl border border-emerald-500/10 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg Rating</p>
            <p className="text-2xl font-black text-dark">{avgRating} <span className="text-sm text-gray-400 font-bold">/ 5.0</span></p>
          </div>
          <div className="w-px h-8 bg-emerald-500/10"></div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Reviews</p>
            <p className="text-2xl font-black text-dark">{reviews.length}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(rev => (
            <Card key={rev.id} className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-sm">{rev.customerName}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">{formatDate(rev.createdAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-dark leading-relaxed font-medium">"{rev.comment}"</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
          <MessageCircle className="w-12 h-12 text-emerald-600/30 mx-auto" />
          <h3 className="font-bold text-dark text-sm">No reviews yet</h3>
          <p className="text-[11px] text-gray-400">Deliver more orders successfully to start earning customer feedback and ratings!</p>
        </div>
      )}
    </div>
  );
};

export default FarmerReviews;
