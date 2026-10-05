import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { dbService } from '../services/database';
import { useCart } from '../contexts/CartContext';
import { showToast } from '../components/ui/Toast';
import { ShoppingCart, Search, Filter, ArrowRight, Leaf, Loader2 } from 'lucide-react';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart() || { addToCart: () => {} };
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'organic', name: 'Organic' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'spices', name: 'Spices' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    
    const query = searchParams.get('search');
    if (query) setSearchQuery(query);
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await dbService.getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.title} to cart!`, 'success');
  };

  // Filter logic
  const filteredProducts = products.filter(p => {
    // Basic fallback category matching logic based on strings since our demo data might have different string formats
    const matchesCategory = activeCategory === 'all' || 
      (p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()));
      
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#11311F] mb-2">Marketplace</h1>
          <p className="text-gray-600">Fresh from farms to your doorstep.</p>
        </div>
        
        {/* Search */}
        <div className="w-full md:w-auto relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) {
                searchParams.set('search', e.target.value);
              } else {
                searchParams.delete('search');
              }
              setSearchParams(searchParams);
            }}
            className="w-full md:w-80 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-[#11311F] mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Categories
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-left whitespace-nowrap text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-[#4CAF50] text-white shadow-md shadow-[#4CAF50]/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#4CAF50]" />
              <p>Loading fresh products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#11311F] mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your category or search filters.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); searchParams.delete('category'); searchParams.delete('search'); setSearchParams(searchParams); }}
                className="bg-[#11311F] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#11311F]/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#4CAF50]/30 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-50">
                    <img src={product.images[0] || 'https://via.placeholder.com/300'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.isOrganic && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Leaf className="w-3 h-3" /> ORGANIC
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#11311F] line-clamp-1 group-hover:text-[#4CAF50] transition-colors">{product.title}</h3>
                      <span className="font-black text-[#11311F]">₹{product.price}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-3">{product.farmerName}</p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                      <span className="text-xs font-semibold text-gray-500">
                        {product.minOrderQty} kg min
                      </span>
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#11311F] hover:bg-[#4CAF50] hover:text-white transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
