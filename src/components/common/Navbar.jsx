import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Search, ShoppingCart, Bell, ChevronDown, User, Leaf } from 'lucide-react';

const Navbar = () => {
  const { currentUser } = useAuth() || {};
  const { cartItems } = useCart() || { cartItems: [] };
  const safeCartItems = cartItems || [];
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const notifRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDashboardRedirect = () => {
    if (!currentUser) return;
    if (currentUser.role === 'farmer') navigate('/farmer');
    else if (currentUser.role === 'admin') navigate('/admin');
    else if (currentUser.role === 'delivery') navigate('/delivery');
    else navigate('/customer');
  };

  return (
    <nav className="bg-[#EABE4F] px-4 md:px-8 py-3 sticky top-0 z-50 flex items-center justify-between shadow-sm">
      {/* 1. Logo */}
      <Link to="/" className="flex flex-col shrink-0">
        <div className="flex items-start">
          <span className="text-3xl font-black text-[#1B4332] tracking-tighter leading-none">FA-X</span>
          <Leaf className="w-4 h-4 text-[#2E7D32] -ml-1 -mt-1 transform -rotate-12" />
        </div>
        <span className="text-[9px] font-black tracking-[0.2em] text-[#1B4332]/80 mt-0.5">FARMERS TO YOU</span>
      </Link>

      {/* 2. Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="flex w-full bg-white rounded-full p-1 shadow-sm border border-black/5 overflow-hidden h-11 items-center">
          <button className="flex items-center gap-1 px-4 text-xs font-bold text-gray-600 hover:text-dark h-full border-r border-gray-200 shrink-0">
            All Categories <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <input 
            type="text" 
            placeholder="Search fresh produce, grains & more..." 
            className="flex-1 px-4 text-sm focus:outline-none text-dark bg-transparent h-full placeholder:text-gray-400 font-medium"
          />
          <button className="h-full px-5 bg-[#1B4332] text-white rounded-full hover:bg-[#1B4332]/90 transition-colors flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        
        {/* Become Farmer Button */}
        {!currentUser && (
          <Link to="/register" className="hidden lg:flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#1B4332]/90 transition-colors shadow-sm">
            <User className="w-4 h-4" /> Become Farmer
          </Link>
        )}

        {/* Auth Links */}
        {currentUser ? (
          <button onClick={handleDashboardRedirect} className="text-sm font-bold text-[#1B4332] hover:text-[#1B4332]/70 transition-colors">
            Dashboard
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-[#1B4332] hover:text-[#1B4332]/70 transition-colors">Login</Link>
            <Link to="/register" className="text-sm font-bold text-[#1B4332] hover:text-[#1B4332]/70 transition-colors">Register</Link>
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-[#1B4332] hover:bg-black/5 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {safeCartItems.length > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-[#1B4332] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#EABE4F]">
                {safeCartItems.length}
              </span>
            )}
          </Link>
          
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#1B4332] hover:bg-black/5 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#EABE4F]"></span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-[#1B4332]">Notifications</h3>
                  <button className="text-[10px] text-emerald-600 font-bold hover:underline">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">New Preorder Available!</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Alphonso mangoes are now open for preorder.</p>
                  </div>
                  <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">Order Shipped</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Your order #1001 is on the way.</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">Welcome to FA-X</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Farm fresh produce delivered to you.</p>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-gray-100 bg-gray-50">
                  <button className="text-[10px] font-bold text-[#1B4332] hover:underline">View All</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative hidden lg:block" ref={langRef}>
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 border border-black/10 hover:border-black/20 rounded-md px-2 py-1 text-xs font-bold text-[#1B4332] transition-colors bg-white/50"
          >
            EN <ChevronDown className="w-3.5 h-3.5" />
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
              {['English (EN)', 'हिंदी (HI)', 'ગુજરાતી (GU)', 'मराठी (MR)'].map((lang, idx) => (
                <button 
                  key={idx}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#1B4332] transition-colors"
                  onClick={() => setShowLangMenu(false)}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
