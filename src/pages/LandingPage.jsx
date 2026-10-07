import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Truck, Users, Leaf, Heart, 
  MapPin, Star, TrendingUp, Activity, CheckCircle, 
  ChevronRight, BarChart2, ShoppingCart, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Package, Clock, Zap
} from 'lucide-react';
import { dbService } from '../services/database';
import { useCart } from '../contexts/CartContext';
import { showToast } from '../components/ui/Toast';
import heroImage from '../assets/me.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart() || { addToCart: () => {} };

  const handleJoinGroupBuy = () => {
    const mockProduct = {
      id: "gb-wheat-1",
      title: "Organic MP Wheat",
      price: 155,
      images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200"],
      farmerName: "Ram Singh",
      farmerId: "farm123",
      isPreorder: false
    };
    addToCart(mockProduct, 5, 'groupbuy', 'camp-wheat-1');
    navigate('/cart');
  };

  const handlePreBook1 = () => {
    const mockProduct = {
      id: "pb-mango-1",
      title: "Fresh Alphonso Mangoes",
      price: 145,
      images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?w=200"],
      farmerName: "Ramesh Kumar",
      farmerId: "farm123",
      isPreorder: true,
      advancePct: 25
    };
    addToCart(mockProduct, 10, 'preorder');
    navigate('/cart');
  };

  const handlePreBook2 = () => {
    const mockProduct = {
      id: "pb-saffron-1",
      title: "Premium Saffron Extract",
      price: 1290,
      images: ["https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200"],
      farmerName: "Priya Spices",
      farmerId: "farm456",
      isPreorder: true,
      advancePct: 50
    };
    addToCart(mockProduct, 1, 'preorder');
    navigate('/cart');
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dbService.getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    
    // Animate progress bar for group buy
    const timer = setTimeout(() => setProgress(80), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = (product) => {
    addToCart(product, 1);
    showToast(`Added ${product.title} to cart`);
  };

  // -------------------------------------------------------------
  // MOCK DATA FOR SECTIONS
  // -------------------------------------------------------------
  const trendingProducts = [
    { title: 'Organic Sharbati Wheat', farmer: 'Ram Singh', loc: 'Punjab', rating: 4.8, reviews: 124, price: 55, oldPrice: 65, discount: 15, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
    { title: 'Premium Basmati Rice', farmer: 'Ali Khan', loc: 'Haryana', rating: 4.9, reviews: 312, price: 110, oldPrice: 140, discount: 21, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
    { title: 'Fresh Nashik Onion', farmer: 'Pawar Farms', loc: 'Maharashtra', rating: 4.5, reviews: 89, price: 35, oldPrice: 45, discount: 22, img: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400' },
    { title: 'Desi Potatoes', farmer: 'Kisan Hub', loc: 'UP', rating: 4.7, reviews: 210, price: 25, oldPrice: 35, discount: 28, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
    { title: 'Organic Red Tomato', farmer: 'Green Acres', loc: 'Karnataka', rating: 4.6, reviews: 156, price: 42, oldPrice: 50, discount: 16, img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400' },
    { title: 'Kachi Ghani Mustard Oil', farmer: 'Singh Mills', loc: 'Rajasthan', rating: 4.9, reviews: 420, price: 180, oldPrice: 220, discount: 18, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  ];

  const categories = [
    { name: 'Grains', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
    { name: 'Vegetables', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=200' },
    { name: 'Fruits', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200' },
    { name: 'Organic Products', img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=200' },
    { name: 'Pulses', img: 'https://images.unsplash.com/photo-1515543904379-3d7570073ff7?w=200' },
    { name: 'Dairy', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200' },
    { name: 'Oilseeds', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200' },
    { name: 'Farm Essentials', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c6913?w=200' },
  ];

  const farmers = [
    { name: 'Ramesh Kumar', loc: 'Junagadh, Gujarat', products: 'Mangoes, Wheat', rating: 4.9, orders: '1.2k+', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Sunita Devi', loc: 'Patna, Bihar', products: 'Organic Veggies', rating: 4.8, orders: '850+', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
    { name: 'Baldev Singh', loc: 'Ludhiana, Punjab', products: 'Basmati, Mustard', rating: 4.9, orders: '2.4k+', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' },
    { name: 'Meena Iyer', loc: 'Coimbatore, TN', products: 'Spices, Coconuts', rating: 4.7, orders: '600+', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  ];

  const combinedTrending = products.length > 0 
    ? [...products.map(p => ({
        ...p,
        loc: 'Verified Farm',
        rating: 4.8,
        reviews: 24,
        oldPrice: Math.floor(p.price * 1.2),
        discount: 20,
        img: p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400'
      })), ...trendingProducts].slice(0, 10)
    : trendingProducts;

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#11311F] text-white pt-20 pb-24 overflow-hidden">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current" preserveAspectRatio="none">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-[#4CAF50] mb-6 backdrop-blur-sm border border-white/10">
                <Leaf className="w-3.5 h-3.5" /> India's #1 Direct Agri-Market
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                From Farm to Your Door, <br/><span className="text-[#FFC107]">Fair & Fresh.</span>
              </h1>
              <p className="text-lg text-white/80 font-medium mb-10 leading-relaxed max-w-xl">
                Buy directly from farmers, discover better prices, join group purchases, and get fresh agricultural products delivered directly to your doorstep.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => navigate('/shop')} className="bg-[#4CAF50] hover:bg-[#3d8c40] text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2 transition-all shadow-lg shadow-[#4CAF50]/30 hover:-translate-y-0.5">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/register')} className="bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white/5">
                  Sell on FA-X
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-sm font-semibold text-white/70">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#4CAF50]" /> Verified Quality</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#4CAF50]" /> Fair Pricing</div>
              </div>
            </div>
            
            {/* Right Visual Composition */}
            <div className="flex-1 relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
              {/* Main Image Mask */}
              <div className="relative w-full max-w-md h-full rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl">
                <img src={heroImage} alt="Fresh Produce" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11311F] via-transparent to-transparent opacity-80"></div>
              </div>
              
              {/* Floating UI Cards */}
              <div className="absolute top-10 right-0 sm:right-10 bg-white text-[#11311F] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[bounce_4s_infinite]">
                <div className="bg-[#E8F3EA] p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-[#4CAF50]" /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                  <p className="text-sm font-black">Verified Farmer ✓</p>
                </div>
              </div>
              
              <div className="absolute bottom-20 -left-4 sm:left-4 bg-white text-[#11311F] px-5 py-4 rounded-2xl shadow-xl flex flex-col gap-1 animate-[bounce_5s_infinite_reverse]">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Live Price</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-[#4CAF50]">₹42<span className="text-sm text-gray-500 font-semibold">/kg</span></p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded w-max mt-1">
                  <TrendingUp className="w-3 h-3" /> -15% vs Market
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-[#11311F] border border-white/20 text-white p-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2 backdrop-blur-md">
                <div className="flex -space-x-3">
                  <img src="https://img.freepik.com/premium-photo/happy-smiling-indian-farmer-with-tractor-real-farming-life-rural-india_1257902-6315.jpg?w=996" className="w-8 h-8 rounded-full border-2 border-[#11311F]" alt="User"/>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-8 h-8 rounded-full border-2 border-[#11311F]" alt="User"/>
                  <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" className="w-8 h-8 rounded-full border-2 border-[#11311F]" alt="User"/>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black">1,250+</p>
                  <p className="text-[9px] font-semibold text-gray-400">Orders Today</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE TRENDING PRODUCTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Live Market</span>
            </div>
            <h2 className="text-3xl font-black text-[#11311F]">Trending Now</h2>
          </div>
          <button onClick={() => navigate('/shop')} className="text-sm font-bold text-[#4CAF50] hover:text-[#11311F] transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {combinedTrending.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-[260px] w-[260px] snap-start flex flex-col group relative">
              
              {/* Badges & Actions */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="bg-[#FF9800] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{product.discount}% OFF</span>
              </div>
              <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                <Heart className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="h-44 bg-gray-50 rounded-xl mb-4 overflow-hidden relative">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#4CAF50] uppercase flex items-center gap-1"><MapPin className="w-3 h-3"/> {product.loc}</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
                    <Star className="w-3 h-3 text-[#FFC107] fill-[#FFC107]"/> {product.rating}
                  </div>
                </div>
                <h3 className="font-bold text-[#11311F] text-base leading-tight mb-1 truncate">{product.title}</h3>
                <p className="text-[11px] text-gray-500 font-medium mb-4 flex items-center gap-1">By {product.farmer} <ShieldCheck className="w-3 h-3 text-blue-500" /></p>
                
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through font-medium">₹{product.oldPrice}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#11311F]">₹{product.price}</span>
                      <span className="text-[10px] font-semibold text-gray-500">/kg</span>
                    </div>
                  </div>
                  <button onClick={() => handleAdd(product)} className="bg-[#11311F] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#4CAF50] transition-colors shadow-md">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#11311F] mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-[#F8F9FA] flex items-center justify-center p-2 group-hover:bg-[#E8F3EA] group-hover:shadow-md transition-all duration-300">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#212121] text-center group-hover:text-[#4CAF50] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GROUP BUYING */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11311F] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          <div className="p-10 md:p-14 flex-1 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white" preserveAspectRatio="none"><polygon points="0,0 100,0 50,100" /></svg>
            </div>
            
            <span className="bg-[#FF9800] text-white text-[10px] font-black px-3 py-1.5 rounded-md w-max mb-6 uppercase tracking-wider shadow-sm">Community Deal</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Buy Together.<br/>Save More.
            </h2>
            <p className="text-white/70 font-medium text-sm max-w-md mb-10 leading-relaxed">
              Join group orders with your community to unlock wholesale prices directly from farmers. No middlemen, just massive savings.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl relative z-10 max-w-md">
              <div className="flex items-start gap-4 mb-6">
                <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200" alt="Wheat" className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"/>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg leading-tight">Organic MP Wheat</h3>
                  <p className="text-[#4CAF50] text-xs font-bold">Farmer: Ram Singh</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] text-white/60 font-bold uppercase mb-0.5">Individual Price</p>
                  <p className="text-white/40 text-lg font-bold line-through">₹55/kg</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#4CAF50] font-bold uppercase mb-0.5">Group Price</p>
                  <p className="text-white text-3xl font-black text-[#4CAF50]">₹42<span className="text-sm">/kg</span></p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-[11px] font-bold text-white mb-2">
                  <span>40 / 50 Joined</span>
                  <span className="text-[#FF9800]">Almost Funded!</span>
                </div>
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4CAF50] to-[#FF9800] rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+')] opacity-50"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-[10px] font-bold text-[#4CAF50] mb-6">🎉 ₹13/kg savings unlocked!</p>
              
              <button onClick={handleJoinGroupBuy} className="w-full bg-[#4CAF50] hover:bg-[#3d8c40] text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg">
                Join Group Now
              </button>
            </div>
          </div>
          
          <div className="hidden md:block w-2/5 relative">
            <img src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=800" alt="Community" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11311F] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 4.5 PRE-ORDER SEASONAL HARVESTS */}
      <section className="py-16 bg-[#F8F9FA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#FF9800] uppercase mb-2 block">Secure Your Supply</span>
              <h2 className="text-3xl font-black text-[#11311F]">Pre-Order Seasonal Harvests</h2>
            </div>
            <button onClick={() => navigate('/shop')} className="text-sm font-bold text-[#4CAF50] hover:text-[#11311F] transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-Order Card 1 */}
            <div className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="w-full sm:w-2/5 h-48 sm:h-auto rounded-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=400" alt="Alphonso Mangoes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#11311F] text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3 text-[#FF9800]" /> Harvest in 45 Days
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#E8F3EA] text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded">25% Advance</span>
                  <span className="text-[10px] font-bold text-gray-400"><MapPin className="inline w-3 h-3 mb-0.5" /> Ratnagiri, MH</span>
                </div>
                <h3 className="text-xl font-black text-[#11311F] mb-2 leading-tight">Premium Alphonso Mangoes</h3>
                <p className="text-xs text-gray-500 font-medium mb-4">Book directly from Shri Hari Orchards before the harvest season begins.</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Expected Price</p>
                    <p className="text-xl font-black text-[#11311F]">₹180<span className="text-xs text-gray-500 font-semibold">/kg</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Booking Amount</p>
                    <p className="text-lg font-black text-[#4CAF50]">₹45<span className="text-xs font-semibold">/kg</span></p>
                  </div>
                </div>
                
                <button onClick={handlePreBook1} className="w-full bg-[#11311F] hover:bg-[#4CAF50] text-white font-bold py-3 rounded-xl transition-colors shadow-md text-sm">
                  Pre-Book Now
                </button>
              </div>
            </div>

            {/* Pre-Order Card 2 */}
            <div className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="w-full sm:w-2/5 h-48 sm:h-auto rounded-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400" alt="Green Cardamom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#11311F] text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3 text-[#FF9800]" /> Harvest in 60 Days
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#E8F3EA] text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded">20% Advance</span>
                  <span className="text-[10px] font-bold text-gray-400"><MapPin className="inline w-3 h-3 mb-0.5" /> Idukki, KL</span>
                </div>
                <h3 className="text-xl font-black text-[#11311F] mb-2 leading-tight">Export Quality Green Cardamom</h3>
                <p className="text-xs text-gray-500 font-medium mb-4">Secure your supply of first-pick cardamom directly from Kerala estates.</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Expected Price</p>
                    <p className="text-xl font-black text-[#11311F]">₹1450<span className="text-xs text-gray-500 font-semibold">/kg</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Booking Amount</p>
                    <p className="text-lg font-black text-[#4CAF50]">₹290<span className="text-xs font-semibold">/kg</span></p>
                  </div>
                </div>
                
                <button onClick={handlePreBook2} className="w-full bg-[#11311F] hover:bg-[#4CAF50] text-white font-bold py-3 rounded-xl transition-colors shadow-md text-sm">
                  Pre-Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT FROM FARMERS */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-[#11311F] mb-3">Meet the Farmers Behind Your Food</h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">We believe in complete transparency. Connect directly with the verified farmers growing your food, read their stories, and support local agriculture.</p>
            </div>
            <button className="text-sm font-bold text-[#11311F] border border-[#11311F] px-6 py-2.5 rounded-full hover:bg-[#11311F] hover:text-white transition-all whitespace-nowrap">
              Explore Farmers
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmers.map((farmer, idx) => (
              <div key={idx} className="bg-[#f8f9fa] rounded-2xl p-5 border border-gray-100 hover:shadow-xl hover:border-[#4CAF50]/30 transition-all group text-center flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-[#E8F3EA] z-0"></div>
                
                <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-white shadow-md mb-4 mt-8">
                  <img src={farmer.img} alt={farmer.name} className="w-full h-full rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                </div>
                
                <h3 className="font-black text-[#11311F] text-lg mb-1 relative z-10">{farmer.name}</h3>
                <p className="text-[11px] font-bold text-[#4CAF50] uppercase mb-4 relative z-10"><MapPin className="inline w-3 h-3 mb-0.5" /> {farmer.loc}</p>
                
                <div className="w-full border-t border-gray-200 my-4"></div>
                
                <div className="w-full flex justify-between px-2 mb-4">
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Rating</p>
                    <p className="text-sm font-black text-[#11311F] flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#FFC107] fill-[#FFC107]"/> {farmer.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Orders</p>
                    <p className="text-sm font-black text-[#11311F]">{farmer.orders}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 font-medium mb-6">Grows: <span className="text-[#11311F] font-bold">{farmer.products}</span></p>
                
                <button className="w-full bg-white border border-gray-200 text-[#11311F] font-bold py-2.5 rounded-lg group-hover:bg-[#11311F] group-hover:text-white transition-colors shadow-sm">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW FA-X WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#11311F] mb-4">How FA-X Works</h2>
          <p className="text-sm text-gray-500 font-medium max-w-xl mx-auto">A seamless, transparent supply chain that benefits both farmers and consumers.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0 border-t-2 border-dashed border-gray-300"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
            {[
              { num: '01', title: 'Farmer Lists Products', desc: 'Verified farmers list their fresh harvest directly on our platform.', icon: <Leaf className="w-6 h-6 text-[#4CAF50]" /> },
              { num: '02', title: 'Customer Orders', desc: 'You buy individually or join group buys for wholesale prices.', icon: <ShoppingCart className="w-6 h-6 text-[#FF9800]" /> },
              { num: '03', title: 'FA-X Handles Delivery', desc: 'Our logistics partners pick up from farm and deliver to you.', icon: <Truck className="w-6 h-6 text-blue-500" /> },
              { num: '04', title: 'Farmer Gets Fair Price', desc: 'Farmers receive immediate, fair payment without middlemen cuts.', icon: <Heart className="w-6 h-6 text-red-500" /> }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-24 h-24 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 bg-[#E8F3EA] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">{step.icon}</div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#11311F] text-white rounded-full flex items-center justify-center text-xs font-black shadow-md border-2 border-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#11311F] mb-3">{step.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI PRICE PREDICTION */}
      <section className="py-20 bg-[#0B1B12] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4CAF50] via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-500/30">
                <Zap className="w-3.5 h-3.5" /> Powered by FA-X AI Engine
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                Know Tomorrow's<br/>Agricultural Price <span className="text-[#4CAF50]">Today.</span>
              </h2>
              <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed">
                Empowering both farmers and consumers with predictive analytics. Our AI analyzes market trends, weather data, and supply chain metrics to forecast prices accurately.
              </p>
              
              <button className="bg-white text-[#11311F] px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                Explore AI Market Insights <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="bg-gradient-to-b from-[#163622] to-[#0D2215] rounded-3xl p-8 border border-white/10 shadow-2xl relative">
                {/* Tech Accents */}
                <div className="absolute top-0 right-10 w-20 h-1 bg-[#4CAF50] rounded-b-full"></div>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Commodity Forecast</h3>
                    <p className="text-xl font-black text-white">Organic Wheat</p>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10">
                    Next 7 Days
                  </div>
                </div>
                
                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-white/50 text-[10px] font-bold uppercase mb-1">Current Price</p>
                    <p className="text-2xl font-medium text-white">₹42<span className="text-sm text-white/50">/kg</span></p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/20" />
                  <div>
                    <p className="text-[#4CAF50] text-[10px] font-bold uppercase mb-1">AI Predicted Price</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black text-[#4CAF50]">₹48<span className="text-sm font-medium">/kg</span></p>
                      <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +14.3%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Mock Chart Area */}
                <div className="h-32 w-full relative mb-8 flex items-end justify-between px-2">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,80 Q20,70 40,50 T80,20 L100,10 L100,100 L0,100 Z" fill="rgba(76, 175, 80, 0.1)" />
                    <path d="M0,80 Q20,70 40,50 T80,20 L100,10" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                  </svg>
                  {/* Chart Nodes */}
                  {[80, 75, 60, 50, 45, 30, 20, 10].map((h, i) => (
                    <div key={i} className="w-1.5 bg-white/20 rounded-t-full relative group" style={{ height: `${100-h}%` }}>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4CAF50] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[9px] text-white/50 font-bold uppercase mb-1">Market Demand</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-red-400"><ArrowUpRight className="w-3 h-3" /> High</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[9px] text-white/50 font-bold uppercase mb-1">Supply</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-blue-400"><ArrowDownRight className="w-3 h-3" /> Low</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[9px] text-white/50 font-bold uppercase mb-1">AI Confidence</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#4CAF50]"><ShieldCheck className="w-3 h-3" /> 92%</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. WHY FA-X */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#11311F] mb-4">Why Choose FA-X</h2>
            <p className="text-sm text-gray-500 font-medium max-w-xl mx-auto">We are rethinking agricultural commerce from the ground up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Direct Farmer Connection', desc: 'No middlemen. Deal directly with verified local farmers.', icon: <Users className="w-6 h-6 text-[#4CAF50]" /> },
              { title: 'Fair Prices', desc: 'Farmers get more, you pay less. A truly transparent pricing model.', icon: <Activity className="w-6 h-6 text-[#4CAF50]" /> },
              { title: 'Fresh & Organic', desc: 'Harvested daily and delivered fresh to ensure maximum nutritional value.', icon: <Leaf className="w-6 h-6 text-[#4CAF50]" /> },
              { title: 'Group Buying', desc: 'Pool orders with your community to unlock massive wholesale discounts.', icon: <ShoppingBag className="w-6 h-6 text-[#4CAF50]" /> },
              { title: 'AI Price Prediction', desc: 'Make informed decisions with our advanced predictive market AI.', icon: <BarChart2 className="w-6 h-6 text-[#4CAF50]" /> },
              { title: 'Reliable Delivery', desc: 'Track your order from the farm gate right to your doorstep.', icon: <Truck className="w-6 h-6 text-[#4CAF50]" /> }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-100 hover:shadow-lg transition-shadow flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:bg-[#4CAF50] group-hover:text-white transition-colors">
                  {React.cloneElement(feature.icon, { className: `w-6 h-6 ${feature.icon.props.className} group-hover:text-white transition-colors` })}
                </div>
                <div>
                  <h3 className="font-bold text-[#11311F] text-base mb-2">{feature.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER TRUST */}
      <section className="py-20 bg-[#F0F5F1] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { num: '10,000+', label: 'Happy Customers' },
              { num: '2,500+', label: 'Verified Farmers' },
              { num: '50,000+', label: 'Orders Delivered' },
              { num: '100+', label: 'Fresh Products' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-black text-[#4CAF50] mb-2 tracking-tight">{stat.num}</div>
                <div className="text-xs font-bold text-[#11311F] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[200px] text-gray-50 font-serif leading-none -mt-10 -mr-10 select-none">"</div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" />)}
              </div>
              <p className="text-xl md:text-2xl font-bold text-[#11311F] italic mb-8 leading-relaxed">
                "FA-X completely changed how our family shops for groceries. The produce is noticeably fresher because it comes straight from the farm, and the group buying feature saves us thousands every month. Highly recommended!"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Customer" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="text-left">
                  <h4 className="font-bold text-[#11311F] text-sm">Priya Sharma</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Customer for 2 years</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 bg-[#11311F] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Leaf className="w-12 h-12 text-[#4CAF50] mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">Let's Build a Fairer<br/>Agricultural Marketplace.</h2>
          <p className="text-lg text-white/70 font-medium mb-10">Shop smarter. Support farmers. Get better prices.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/shop')} className="w-full sm:w-auto bg-[#4CAF50] hover:bg-[#3d8c40] text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-[#4CAF50]/30 hover:-translate-y-0.5">
              Start Shopping
            </button>
            <button onClick={() => navigate('/register')} className="w-full sm:w-auto bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white/5">
              Join as Farmer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
