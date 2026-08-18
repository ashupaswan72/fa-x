import React from 'react';
import { 
  Leaf, Apple, Wheat, Coffee, Flame, Award, 
  Droplet, Nut, Sun, Sprout 
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: Leaf },
  { id: 'vegetables', name: 'Vegetables', icon: Leaf },
  { id: 'fruits', name: 'Fruits', icon: Apple },
  { id: 'grains', name: 'Grains & Pulses', icon: Wheat },
  { id: 'dairy', name: 'Dairy & Eggs', icon: Coffee },
  { id: 'rice-wheat', name: 'Rice & Wheat', icon: Wheat },
  { id: 'spices', name: 'Spices', icon: Flame },
  { id: 'organic', name: 'Organic', icon: Award },
  { id: 'oil-ghee', name: 'Oil & Ghee', icon: Droplet },
  { id: 'dry-fruits', name: 'Dry Fruits', icon: Nut },
  { id: 'flowers', name: 'Flowers', icon: Sun },
  { id: 'seeds', name: 'Seeds', icon: Sprout }
];

const CategorySidebar = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2 hidden lg:block">Categories Catalog</h3>
      
      {/* Horizontal Category Scroller with hover animation */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 scrollbar-none snap-x snap-mandatory">
        {CATEGORIES.map(category => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center space-x-2.5 px-4.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap snap-start shrink-0 hover:translate-x-0.5 lg:hover:translate-x-1 ${
                isActive 
                  ? 'bg-[#2E7D32] text-white shadow-lg shadow-emerald-900/10' 
                  : 'bg-white hover:bg-emerald-50/50 border border-emerald-500/5 text-dark'
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-emerald-50'}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2E7D32]'}`} />
              </div>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
export { CATEGORIES };
