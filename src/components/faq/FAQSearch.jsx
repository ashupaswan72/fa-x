import React from 'react';
import { Search } from 'lucide-react';

const FAQSearch = ({ query, onChange }) => {
  return (
    <div className="relative max-w-xl mx-auto w-full z-10">
      <input 
        type="text" 
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your question (e.g. Preorder, Group Buy)..." 
        className="w-full bg-white border border-emerald-500/10 rounded-2xl px-6 py-4 pl-12 text-xs sm:text-sm focus:outline-none focus:border-primary text-dark shadow-lg shadow-emerald-950/5"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-3.5" />
    </div>
  );
};

export default FAQSearch;
