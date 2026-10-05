import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Wheat, Carrot, Apple, Droplet, Milk, TestTube, Leaf, Tractor } from 'lucide-react';

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'grains', name: 'Grains & Cereals', icon: Wheat, color: 'bg-amber-50 text-amber-600', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', desc: 'Wheat, Rice, Millets & more' },
    { id: 'vegetables', name: 'Fresh Vegetables', icon: Carrot, color: 'bg-green-50 text-green-600', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400', desc: 'Daily fresh farm vegetables' },
    { id: 'fruits', name: 'Fresh Fruits', icon: Apple, color: 'bg-red-50 text-red-600', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', desc: 'Seasonal & exotic fruits' },
    { id: 'organic', name: 'Organic Products', icon: Leaf, color: 'bg-emerald-50 text-emerald-600', img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400', desc: '100% certified organic' },
    { id: 'pulses', name: 'Pulses & Dals', icon: TestTube, color: 'bg-orange-50 text-orange-600', img: 'https://images.unsplash.com/photo-1515543904379-3d7570073ff7?w=400', desc: 'Protein-rich pulses' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: Milk, color: 'bg-blue-50 text-blue-600', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', desc: 'Fresh milk, cheese, eggs' },
    { id: 'oilseeds', name: 'Oilseeds', icon: Droplet, color: 'bg-yellow-50 text-yellow-600', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', desc: 'Mustard, Sunflower, Groundnut' },
    { id: 'farming', name: 'Farm Essentials', icon: Tractor, color: 'bg-gray-50 text-gray-600', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c6913?w=400', desc: 'Seeds, Fertilizers, Tools' },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#11311F] mb-3">Shop by Category</h1>
        <p className="text-gray-600">Browse through our wide selection of fresh agricultural products sourced directly from farmers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div 
              key={idx} 
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 left-4 p-2.5 rounded-xl ${cat.color} backdrop-blur-md bg-white/90`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#11311F] group-hover:text-[#4CAF50] transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#4CAF50] transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
