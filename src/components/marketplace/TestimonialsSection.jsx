import React from 'react';
import Card from '../ui/Card';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Ananya Paswan",
    role: "Culinary Chef • Radisson Hotels",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
    rating: 5,
    comment: "FA-X preordering completely changed how we procure fresh seasonal vegetables. Locking the tomato base prices weeks before harvest gives our kitchens budget predictability, and the quality is outstanding."
  },
  {
    name: "Vikram ",
    role: "Organic Wholesaler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    rating: 5,
    comment: "Sourcing Basmati rice and forest honey directly through B2B channels saved us 12% in Mandi commissions. Complete transparency on farmer coordinates and profiles builds true brand trust."
  },
  {
    name: "Aditi Roy",
    role: "Community Pool Leader",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
    rating: 5,
    comment: "Our housing community regularly pools cart orders in the Group Buying section. We easily hit the 20-buyer tomato campaign targets, reducing our household weekly bills significantly."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 space-y-12 bg-[#F8FFF8]">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#FF9800] text-xs font-black uppercase tracking-widest">Testimonials</span>
        <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tight">What Our Buyers Say</h2>
        <p className="text-xs text-gray-500 font-semibold leading-relaxed">
          Read success stories from leading culinary hotel chains, community neighborhood groups, and organic distributors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev, idx) => (
          <Card key={idx} className="border border-emerald-500/5 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative bg-white">
            <p className="text-xs text-gray-500 font-semibold leading-relaxed italic">"{rev.comment}"</p>
            
            <div className="flex items-center space-x-3.5 pt-4 border-t border-gray-50 mt-2">
              <img 
                src={rev.avatar} 
                alt={rev.name} 
                className="w-10 h-10 rounded-full object-cover border border-emerald-500/10" 
              />
              <div>
                <h4 className="text-xs font-black text-dark leading-tight">{rev.name}</h4>
                <p className="text-[9.5px] text-gray-400 font-bold mt-0.5">{rev.role}</p>
                <div className="flex text-amber-500 space-x-0.5 mt-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
export { REVIEWS };
