import React from 'react';

const CATEGORIES = [
  { id: 'general', name: 'General' },
  { id: 'customer', name: 'Customer' },
  { id: 'farmer', name: 'Farmer' },
  { id: 'preorders', name: 'Preorders' },
  { id: 'groupbuy', name: 'Group Buy' },
  { id: 'bulkorders', name: 'Bulk Orders' },
  { id: 'payments', name: 'Payments' },
  { id: 'delivery', name: 'Delivery' },
  { id: 'account', name: 'Account' },
  { id: 'security', name: 'Security' }
];

const FAQCategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-none snap-x snap-mandatory max-w-4xl mx-auto px-2 justify-start sm:justify-center">
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap snap-start shrink-0 ${
              isActive 
                ? 'bg-[#2E7D32] text-white shadow-md shadow-emerald-900/10' 
                : 'bg-white hover:bg-emerald-50/50 border border-emerald-500/5 text-dark'
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default FAQCategoryTabs;
export { CATEGORIES };
