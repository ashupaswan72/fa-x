import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Leaf, Search, User, LogOut, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import logoImg from '../../assets/logo.jpg';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart() || { cartItems: [] };
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate('/login');
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/categories' },
    { label: 'Group Buying', path: '/group-buying' },
    { label: 'Farmers', path: '/farmers' },
    { label: 'AI Market', path: '/ai-market' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      {/* Top Utility Bar (Mobile Hidden) */}
      <div className="hidden md:flex justify-between items-center px-4 md:px-8 py-1.5 bg-[#0a2312] text-white text-[10px] font-medium tracking-wide w-full">
        <p>India's Premium Direct-to-Consumer Agricultural Marketplace</p>
        <div className="flex items-center gap-4">
          <Link to="/register" className="hover:text-[#4CAF50] transition-colors">Sell on FA-X</Link>
          <a href="tel:1800-FAX-FARM" className="hover:text-[#4CAF50] transition-colors">1800-FAX-FARM</a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            className="md:hidden text-[#11311F]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="flex items-center gap-1.5">
            <img src={logoImg} alt="FA-X Logo" className="h-10 rounded shadow-sm" />
          </Link>
        </div>

        {/* Location & Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-3xl items-center gap-4 mx-8">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#11311F] cursor-pointer hover:text-[#4CAF50] transition-colors shrink-0 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
            <MapPin className="w-4 h-4 text-[#4CAF50]" />
            <span className="truncate max-w-[120px]">Deliver to: Delhi</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <form onSubmit={handleSearch} className="flex-1 flex shadow-sm border border-gray-200 rounded-lg overflow-hidden bg-gray-50 focus-within:bg-white focus-within:border-[#4CAF50] focus-within:ring-2 focus-within:ring-[#4CAF50]/20 transition-all">
            <input 
              type="text" 
              placeholder="Search for fresh vegetables, grains, farmers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-sm focus:outline-none text-[#11311F] placeholder:text-gray-400"
            />
            <button type="submit" className="bg-[#4CAF50] text-white px-5 hover:bg-[#3d8c40] transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 shrink-0">
          
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to={currentUser.role === 'farmer' ? '/farmer' : currentUser.role === 'admin' ? '/admin' : '/customer'} className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-[#4CAF50] transition-colors group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-[#E8F3EA] transition-colors">
                  <User className="w-4 h-4 text-[#11311F] group-hover:text-[#4CAF50]" />
                </div>
                <span className="text-[10px] font-bold text-[#11311F]">Account</span>
              </Link>
              <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 text-red-500 hover:text-red-700 transition-colors group cursor-pointer">
                <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-700" />
                </div>
                <span className="text-[10px] font-bold text-red-600">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold text-[#11311F] hover:text-[#4CAF50] transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-[#11311F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#11311F]/90 transition-colors shadow-sm">
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-[#4CAF50] transition-colors group relative">
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-[#E8F3EA] transition-colors relative">
              <ShoppingCart className="w-4 h-4 text-[#11311F] group-hover:text-[#4CAF50]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9800] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm border border-white">
                {cartItems?.length || 0}
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#11311F]">Cart</span>
          </Link>

        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:block bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-8 h-12">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={idx} 
                to={link.path} 
                className={`text-sm font-bold relative transition-colors h-full flex items-center ${isActive ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#11311F]'}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#4CAF50] rounded-t-md"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Search Bar (Only visible on small screens) */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="flex w-full shadow-sm border border-gray-200 rounded-lg overflow-hidden bg-gray-50 focus-within:bg-white focus-within:border-[#4CAF50]">
          <input 
            type="text" 
            placeholder="Search FA-X..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
          <button type="submit" className="bg-[#4CAF50] text-white px-4 hover:bg-[#3d8c40]">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-50">
          <div className="p-4 bg-gray-50 flex items-center gap-2 text-sm font-semibold text-[#11311F]">
            <MapPin className="w-4 h-4 text-[#4CAF50]" /> Deliver to: Delhi (Select)
          </div>
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-gray-700 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 hover:text-[#4CAF50]"
            >
              {link.label}
              <ChevronDown className="w-4 h-4 -rotate-90 text-gray-400" />
            </Link>
          ))}
          {!currentUser ? (
            <div className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-white border border-gray-200 text-[#11311F] px-4 py-2.5 rounded-lg text-sm font-bold">Login</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-[#11311F] text-white px-4 py-2.5 rounded-lg text-sm font-bold">Sign Up</Link>
            </div>
          ) : (
            <div className="p-4 bg-gray-50">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors border border-red-100">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
