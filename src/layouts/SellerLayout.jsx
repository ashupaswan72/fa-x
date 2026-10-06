import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, X, Search, Bell, MessageSquare, Home, ShoppingBag, 
  Package, PlusCircle, Layers, CreditCard, Wallet, Users, 
  Star, Megaphone, BarChart3, Leaf, HelpCircle, Settings, 
  HeadphonesIcon, CheckCircle2, ChevronDown, Map
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SellerLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/farmer', icon: Home },
    { name: 'Orders', path: '/farmer/orders', icon: ShoppingBag, badge: 12 },
    { name: 'Products', path: '/farmer/products', icon: Package },
    { name: 'Add New Product', path: '/farmer/add-product', icon: PlusCircle },
    { name: 'Inventory', path: '/farmer/inventory', icon: Layers },
    { name: 'Payments', path: '/farmer/payments', icon: CreditCard },
    { name: 'Payouts', path: '/farmer/payouts', icon: Wallet },
    { name: 'Customers', path: '/farmer/customers', icon: Users },
    { name: 'Reviews & Ratings', path: '/farmer/reviews', icon: Star },
    { name: 'Marketing Tools', path: '/farmer/marketing', icon: Megaphone },
    { name: 'Analytics', path: '/farmer/analytics', icon: BarChart3 },
    { name: 'Farm Requests', path: '/farmer/requests', icon: Leaf },
    { name: 'Support Tickets', path: '/farmer/support', icon: MessageSquare, badge: 2 },
    { name: 'Farm Logistics & GIS', path: '/farmer/gis', icon: Map },
    { name: 'Account Settings', path: '/profile', icon: Settings },
    { name: 'Notifications', path: '/farmer/notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header (Only visible on small screens) */}
      <div className="md:hidden bg-white h-16 w-full flex items-center justify-between px-4 shadow-sm z-40 sticky top-0 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-1">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <img src={logoImg} alt="FA-X Logo" className="h-8 w-auto bg-white rounded shadow-sm" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Sidebar (Dark Green) */}
      <AnimatePresence>
        {(isOpen || !window.matchMedia("(max-width: 768px)").matches) && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className={`w-[260px] bg-[#0A6C35] flex flex-col h-screen fixed md:sticky top-0 z-50 flex-shrink-0 shadow-2xl md:shadow-none overflow-hidden`}
          >
            {/* Sidebar Header / Logo */}
            <div className="h-20 flex items-center px-6 shrink-0 border-b border-white/10">
              <Link to="/" className="flex flex-col text-white">
                <img src={logoImg} alt="FA-X Logo" className="h-12 w-auto bg-white rounded-md p-1 shadow-sm" />
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3 hide-scrollbar space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link 
                    key={idx}
                    to={link.path}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                      isActive 
                        ? 'bg-white text-[#0A6C35] shadow-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#0A6C35]' : 'text-white/70 group-hover:text-white'}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-[#0A6C35] text-white' : 'bg-green-600 text-white'}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 shrink-0 mt-auto border-t border-white/10">
              <div className="px-3 mb-2">
                <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Need Help?</p>
                <p className="text-[10px] text-white/70 mt-0.5">We're here to help you</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 py-2.5 rounded-lg text-sm font-semibold transition-colors mb-2">
                <HeadphonesIcon className="w-4 h-4" />
                <span>Contact Support</span>
              </button>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-100 hover:bg-red-500/40 border border-red-500/30 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        
        {/* Desktop Header (White) */}
        <header className="hidden md:flex h-20 bg-white border-b border-gray-100 px-6 items-center justify-between shrink-0 sticky top-0 z-30">
          
          <div className="flex items-center gap-4 flex-1">
             <button className="text-gray-400 hover:text-gray-600">
               <Menu className="w-6 h-6" />
             </button>
             <div className="relative w-full max-w-md">
               <input 
                 type="text" 
                 placeholder="Search orders, products, customers..." 
                 className="w-full h-10 pl-4 pr-10 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A6C35]/20 focus:border-[#0A6C35] transition-all"
               />
               <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">8</span>
              </button>
              <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
              </button>
            </div>

            <div className="h-8 w-px bg-gray-200"></div>

            <button onClick={handleLogout} className="flex items-center gap-3 group text-left">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-100">
                 <img src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} alt="Seller" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#0A6C35] transition-colors">{currentUser?.name || 'Ramesh Kumar'}</span>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 mt-0.5">
                  Verified Seller <CheckCircle2 className="w-3 h-3 fill-green-100" />
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-2 group-hover:text-gray-600" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>

      </div>
    </div>
  );
};

export default SellerLayout;
