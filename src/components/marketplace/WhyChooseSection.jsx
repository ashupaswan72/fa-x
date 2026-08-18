import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { 
  Sprout, Percent, UserCheck, TrendingUp, 
  ShieldCheck, Truck, MapPin, Layers 
} from 'lucide-react';

const FEATURES = [
  { title: "Fresh Produce", desc: "Crops are harvested after booking and dispatched directly within hours.", icon: Sprout, color: "text-[#2E7D32] bg-emerald-50" },
  { title: "Best Prices", desc: "No Mandi broker commissions means lower pricing for urban buyers.", icon: Percent, color: "text-[#FF9800] bg-amber-50" },
  { title: "Verified Farmers", desc: "Every producer profile is backed by verified KYC and coordinates.", icon: UserCheck, color: "text-purple-650 bg-purple-50" },
  { title: "AI Price Prediction", desc: "Algorithm dashboards forecast local market valuation trends.", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
  { title: "Secure Payments", desc: "UPI and cards held securely in escrow wallets until quality check.", icon: ShieldCheck, color: "text-emerald-900 bg-emerald-50" },
  { title: "Fast Delivery", desc: "Temperature-controlled fleet dispatches preserve delicate crop yields.", icon: Truck, color: "text-[#2E7D32] bg-emerald-50" },
  { title: "Live Tracking", desc: "Interactive map pins track logistics from field dispatches to doorsteps.", icon: MapPin, color: "text-[#FF9800] bg-amber-50" },
  { title: "Bulk Discounts", desc: "Purchase wholesale batches for schools, hotels, and retail outlets.", icon: Layers, color: "text-purple-650 bg-purple-50" }
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#FF9800] text-xs font-black uppercase tracking-widest">Platform Benefits</span>
        <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tight">Why Choose FA-X?</h2>
        <p className="text-xs text-gray-500 font-semibold leading-relaxed">
          FA-X replaces outdated logistics chains with digital tools, safeguarding both crop yields and household pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col h-full"
            >
              <Card className="flex-grow p-6 border border-emerald-500/5 hover:shadow-md transition-shadow space-y-4 bg-white">
                <div className={`p-3 rounded-2xl ${feat.color} inline-block`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-black text-sm text-dark">{feat.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">{feat.desc}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseSection;
export { WhyChooseSection };
