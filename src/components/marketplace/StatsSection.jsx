import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sprout, ShoppingBag, Globe, Smile } from 'lucide-react';

const stats = [
  { value: "15,000+", label: "Happy Customers", icon: Users, color: "text-[#2E7D32] bg-emerald-50" },
  { value: "4,000+", label: "Verified Farmers", icon: Sprout, color: "text-[#FF9800] bg-amber-50" },
  { value: "25,000+", label: "Orders Delivered", icon: ShoppingBag, color: "text-purple-650 bg-purple-50" },
  { value: "500+", label: "Villages Connected", icon: Globe, color: "text-blue-600 bg-blue-50" },
  { value: "99%", label: "Customer Satisfaction", icon: Smile, color: "text-emerald-900 bg-emerald-50" }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-[#2E7D32]/5 rounded-[2rem] border border-emerald-500/5 px-8 mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="text-center flex flex-col items-center space-y-2"
            >
              <div className={`p-3 rounded-2xl ${stat.color} inline-block`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-black text-dark leading-none">{stat.value}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
