import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Heart, Star, ShieldCheck, ChevronRight, CheckCircle2, QrCode } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../contexts/CartContext';
import { showToast } from '../components/ui/Toast';

const LandingPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart() || { addToCart: () => {} };

  const handleAdd = (product) => {
    addToCart(product, 1, 'standard');
    showToast(`Added ${product.title} to cart!`, 'success');
  };

  const categories = [
    { name: 'Vegetables', img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&q=80' },
    { name: 'Fruits', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80' },
    { name: 'Grains', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
    { name: 'Dairy', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80' },
    { name: 'Organic', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80' },
    { name: 'Seeds', img: 'https://images.unsplash.com/photo-1536585149372-97b4ec9701b2?w=400&q=80' },
    { name: 'Fertilizers', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&q=80' },
    { name: 'Farm Equipment', img: 'https://images.unsplash.com/photo-1592982537447-6f2da0c0c66b?w=400&q=80' },
  ];

  const features = [
    { icon: '🚜', title: 'Direct from Farmers' },
    { icon: '💰', title: 'Better Prices' },
    { icon: '🍃', title: 'Fresh & Natural' },
    { icon: '🔒', title: 'Secure Payments' },
    { icon: '🚚', title: 'Fast Delivery' },
    { icon: '✅', title: 'Quality Assurance' },
    { icon: '📈', title: 'AI Price Prediction' },
    { icon: '✂️', title: 'No Middlemen' },
  ];

  const marketPrices = [
    { name: 'Tomato', price: '₹42/kg', change: '12%', up: false },
    { name: 'Onion', price: '₹28/kg', change: '8%', up: false },
    { name: 'Potato', price: '₹22/kg', change: '5%', up: false },
    { name: 'Rice', price: '₹60/kg', change: '6%', up: false },
    { name: 'Wheat', price: '₹24/kg', change: '3%', up: false },
    { name: 'Sugarcane', price: '₹320/ton', change: '4%', up: true },
  ];

  const displayProducts = (MOCK_PRODUCTS || []).slice(0, 4);

  return (
    <div className="bg-[#FAF8F1] min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-[#E8F3EA] rounded-[40px] overflow-hidden mx-4 sm:mx-6 lg:mx-8">
          <img 
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2000&auto=format&fit=crop" 
            alt="Farmer Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8F3EA] via-[#E8F3EA]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl pt-12 pb-16 px-8">
          <h1 className="text-5xl md:text-7xl font-black text-[#11311F] leading-[1.1] tracking-tight mb-6">
            Fresh Produce<br/>Direct From<br/>Farmers
          </h1>
          <p className="text-base md:text-lg text-[#11311F]/80 font-medium max-w-md mb-8 leading-relaxed">
            Connecting farmers and consumers for a healthier tomorrow. Fresh. Natural. Direct.
          </p>
          
          <div className="flex items-center gap-4 mb-16">
            <button className="bg-[#11311F] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#11311F]/90 transition-colors shadow-lg">
              <ShoppingBag className="w-4 h-4" /> Shop Now <ChevronRight className="w-4 h-4" />
            </button>
            <Link to="/register" className="bg-[#F4D03F] text-[#11311F] px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#F4D03F]/90 transition-colors shadow-lg">
              <User className="w-4 h-4" /> Become a Farmer <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-2xl">🚜</span><span className="text-xs font-bold text-[#11311F] leading-tight">Direct from<br/>Farmers</span></div>
            <div className="flex items-center gap-2"><span className="text-2xl">🍃</span><span className="text-xs font-bold text-[#11311F] leading-tight">Fresh &<br/>Natural</span></div>
            <div className="flex items-center gap-2"><span className="text-2xl">💰</span><span className="text-xs font-bold text-[#11311F] leading-tight">Better Prices</span></div>
            <div className="flex items-center gap-2"><span className="text-2xl">🌱</span><span className="text-xs font-bold text-[#11311F] leading-tight">Sustainable<br/>Future</span></div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-2xl font-black text-[#11311F]">Shop by Category</h2>
          <button className="text-xs font-bold text-[#11311F] hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="relative pt-12 group cursor-pointer">
              <div className="bg-[#2D4A3A] rounded-2xl h-24 flex items-end justify-center pb-4 transition-transform group-hover:bg-[#1B3528]">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="absolute top-0 w-20 h-20 object-cover rounded-full border-4 border-[#FAF8F1] shadow-md group-hover:-translate-y-2 transition-transform duration-300"
                />
                <span className="text-white text-[11px] font-bold tracking-wide">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FRESH PICKS FROM OUR FARMERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-black text-[#11311F]">Fresh Picks from Our Farmers</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-dark">{'<'}</button>
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-dark">{'>'}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <div key={product.id} className="bg-[#Fdfdfb] border border-[#E8F3EA] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative">
              {product.isOrganic && (
                <span className="absolute top-4 left-4 bg-[#4CAF50] text-white text-[9px] font-bold px-2 py-1 rounded-md z-10">Organic</span>
              )}
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-rose-500 z-10">
                <Heart className="w-4 h-4" />
              </button>
              
              <div className="h-48 rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                <img src={product.images?.[0] || categories[0].img} alt={product.title} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              
              <h3 className="font-bold text-[#11311F] text-sm leading-tight mb-1">{product.title}</h3>
              <p className="text-[10px] font-semibold text-gray-500 mb-2">{product.farmerName} - {product.village || 'Maharashtra'}</p>
              
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-3 h-3 text-[#F4D03F] fill-[#F4D03F]" />
                <span className="text-[10px] font-bold text-[#11311F]">{product.rating || '4.8'}</span>
                <span className="text-[10px] text-gray-400">({Math.floor(Math.random() * 500) + 100})</span>
              </div>
              
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#11311F]">₹{product.price}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">/kg</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 line-through">₹{Math.floor(product.price * 1.3)}</span>
                    <span className="text-[9px] font-bold bg-[#11311F] text-white px-1.5 py-0.5 rounded">25% OFF</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#4CAF50] flex items-center gap-1">
                  <span className="w-4 h-4 bg-[#E8F3EA] rounded-full flex items-center justify-center">⏰</span> 1-2 Days Delivery
                </span>
                <button 
                  onClick={() => handleAdd(product)}
                  className="bg-[#2D4A3A] hover:bg-[#1B3528] text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE FA-X */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#E8F3EA] border-b">
        <h2 className="text-xl font-black text-[#11311F] mb-6">Why Choose FA-X?</h2>
        <div className="flex flex-wrap gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white border border-[#E8F3EA] rounded-full px-5 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-xl">{f.icon}</span>
              <span className="text-xs font-bold text-[#11311F]">{f.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIVE MARKET PRICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 relative w-full">
            
            <div className="flex items-center justify-between w-full md:w-auto shrink-0 z-10">
              <h2 className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                Live Market Prices
              </h2>
              {/* Mobile LIVE Badge */}
              <div className="md:hidden bg-[#11311F] text-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest uppercase">Live</span>
              </div>
            </div>

            <div className="flex-1 w-full overflow-hidden relative bg-amber-500/10 border border-amber-200 rounded-full py-1.5 px-2 shadow-inner" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              <div className="flex animate-marquee gap-3 hover:[animation-play-state:paused]">
                {[...marketPrices, ...marketPrices].map((item, i) => (
                  <div key={i} className="bg-white border border-amber-200 rounded-full px-4 py-1.5 flex items-center gap-3 shrink-0 shadow-sm mx-1 cursor-pointer hover:shadow-md hover:border-amber-500 transition-all">
                    <span className="text-xs font-bold text-gray-500">{item.name}</span>
                    <span className="text-xs font-black text-[#11311F]">{item.price}</span>
                    <span className={`text-[10px] font-bold flex items-center ${item.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {item.up ? '▲' : '▼'} {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop LIVE Badge */}
            <div className="hidden md:flex bg-[#11311F] text-white rounded-full px-3 py-2 items-center gap-2 shrink-0 shadow-sm z-10 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Live</span>
            </div>

          </div>
        </section>

      {/* 6. FOR FARMERS & HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* For Farmers Banner */}
          <div className="bg-[#1B4332] rounded-3xl p-10 relative overflow-hidden text-white flex flex-col justify-center">
            <div className="absolute right-[-20%] bottom-[-10%] w-[60%] h-[120%] bg-[#2D4A3A] rotate-12 rounded-3xl opacity-50"></div>
            
            <div className="relative z-10 max-w-sm">
              <h2 className="text-3xl font-black mb-3">For Farmers</h2>
              <p className="text-sm font-medium text-white/80 mb-8 leading-relaxed">
                Grow your business. Reach more customers. Earn more.
              </p>
              
              <ul className="space-y-3 mb-8">
                {['Higher Earnings', 'Direct Customers', 'Easy Product Management', 'Loan Support', 'AI Recommendations', 'Analytics Dashboard'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#F4D03F]" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link to="/register" className="inline-flex bg-[#F4D03F] text-[#11311F] px-6 py-3.5 rounded-xl font-bold text-sm items-center gap-2 hover:bg-[#F4D03F]/90 transition-colors shadow-lg">
                <User className="w-4 h-4" /> Become a Farmer <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Phone Mockup Placeholder */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[240px] h-[480px] bg-black rounded-[32px] border-4 border-gray-800 shadow-2xl hidden md:block overflow-hidden p-2">
              <div className="w-full h-full bg-[#11311F] rounded-[24px] p-4 flex flex-col">
                <div className="h-4 w-1/2 bg-gray-800 rounded-full mx-auto mb-6"></div>
                <div className="flex-1 bg-gradient-to-b from-emerald-900/50 to-transparent rounded-xl p-4 border border-emerald-500/20">
                  <p className="text-[10px] text-emerald-400 font-bold mb-1">Today's Earnings</p>
                  <p className="text-2xl font-black text-white mb-4">₹ 45,250</p>
                  <div className="flex items-end gap-2 h-24 mb-4">
                    {[3, 5, 4, 7, 6, 8, 10].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-500 rounded-t-md opacity-80" style={{ height: `${h * 10}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works & Testimonial */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#F0EDDF] rounded-3xl p-10 flex-1">
              <h2 className="text-xl font-black text-[#11311F] mb-8">How It Works</h2>
              
              <div className="flex justify-between items-start relative px-4">
                <div className="absolute top-8 left-10 right-10 border-t-2 border-dashed border-[#11311F]/20"></div>
                
                {[
                  { icon: '🛒', label: 'Browse & Select', step: 1 },
                  { icon: '🛍️', label: 'Place Order', step: 2 },
                  { icon: '📦', label: 'Farmer Packs', step: 3 },
                  { icon: '🚚', label: 'Delivered Fresh', step: 4 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 w-20">
                    <div className="w-16 h-16 rounded-full bg-[#2D4A3A] flex items-center justify-center text-2xl mb-3 shadow-lg border-4 border-[#F0EDDF]">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black text-[#11311F]/50 mb-1">{item.step}</span>
                    <span className="text-[10px] font-bold text-[#11311F] text-center leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 flex-1 border border-[#E8F3EA] shadow-sm flex flex-col justify-center">
              <h2 className="text-xl font-black text-[#11311F] mb-6">What Our Customers Say</h2>
              <div className="relative px-8">
                <span className="absolute left-0 top-0 text-4xl text-[#1B4332]/20 font-serif">"</span>
                <p className="text-sm font-semibold text-[#11311F]/80 italic mb-4 leading-relaxed">
                  FA-X has made buying fresh produce so easy and reliable. The quality is amazing and it supports our farmers too!
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#F4D03F] fill-[#F4D03F]" />)}
                </div>
                <p className="text-xs font-bold text-[#11311F]">Anjali Sharma</p>
                <p className="text-[10px] text-gray-400 font-semibold">Pune</p>
                <span className="absolute right-0 bottom-0 text-4xl text-[#1B4332]/20 font-serif rotate-180">"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STATS BAR */}
      <section className="bg-[#11311F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            {[
              { icon: '👨‍🌾', num: '50K+', label: 'Farmers' },
              { icon: '😊', num: '1M+', label: 'Happy Customers' },
              { icon: '📦', num: '2M+', label: 'Orders Delivered' },
              { icon: '📍', num: '500+', label: 'Cities' },
              { icon: '🛒', num: '100K+', label: 'Products' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-3xl opacity-80">{stat.icon}</span>
                <div>
                  <div className="text-xl font-black text-white">{stat.num}</div>
                  <div className="text-[10px] font-bold text-white/60 tracking-wider uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. APP DOWNLOAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-[#E8F3EA] to-[#Fdfdfb] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between border border-[#E8F3EA] shadow-sm relative overflow-hidden">
          
          <div className="flex items-center gap-8 relative z-10 w-full md:w-auto mb-8 md:mb-0">
            {/* Phone Image Placeholder */}
            <div className="w-32 h-64 bg-white rounded-[20px] shadow-xl border-4 border-gray-100 hidden sm:block p-2">
               <div className="w-full h-full bg-[#E8F3EA] rounded-[12px] flex items-center justify-center text-xs font-bold text-[#11311F]/50 text-center px-2">App Preview</div>
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-[#11311F] mb-1">Get the FA-X App</h2>
              <p className="text-xs font-bold text-gray-500 mb-6">Freshness at your fingertips</p>
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#11311F]" />
                </div>
                <div className="space-y-2">
                  <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 w-32 hover:bg-black/80 transition-colors">
                    <span className="text-xl">🍎</span>
                    <div className="text-left">
                      <div className="text-[8px] font-bold opacity-80">Download on the</div>
                      <div className="text-xs font-black">App Store</div>
                    </div>
                  </button>
                  <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 w-32 hover:bg-black/80 transition-colors">
                    <span className="text-xl">▶️</span>
                    <div className="text-left">
                      <div className="text-[8px] font-bold opacity-80">GET IT ON</div>
                      <div className="text-xs font-black">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center md:text-right">
            <h2 className="text-2xl font-black text-[#11311F] mb-4 max-w-xs ml-auto">Building a Stronger Agriculture Tomorrow</h2>
            <Link to="/register" className="inline-flex bg-[#F4D03F] text-[#11311F] px-8 py-3 rounded-xl font-bold text-sm items-center gap-2 hover:bg-[#F4D03F]/90 transition-colors shadow-md">
              Join FA-X Today
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
