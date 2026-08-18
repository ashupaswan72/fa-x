import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, ShoppingBag, Wallet, Heart, Package, 
  Settings, Users, ShieldAlert, Award, FileSpreadsheet, 
  CheckSquare, ChevronRight, Menu, X, LogOut, HelpCircle, Star, MessageSquare, Truck, Bell, MapPin, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getLinks = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'farmer':
        return [
          { name: 'Dashboard', path: '/farmer', icon: LayoutDashboard },
          { name: 'Notifications', path: '/farmer/notifications', icon: Bell },
          { name: 'My Inventory', path: '/farmer/inventory', icon: Package },
          { name: 'Orders Manager', path: '/farmer/orders', icon: ShoppingBag },
          { name: 'Group Buys', path: '/farmer/group-buys', icon: FileSpreadsheet },
          { name: 'Market Insights', path: '/farmer/market-insights', icon: TrendingUp },
          { name: 'Sales Analytics', path: '/farmer/analytics', icon: Award },
          { name: 'Customer Feedback', path: '/farmer/reviews', icon: Star },
          { name: 'Profile & KYC', path: '/farmer/kyc', icon: CheckSquare },
          { name: 'Help & Support', path: '/farmer/support', icon: HelpCircle }
        ];
      case 'admin':
        return [
          { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'Farmer Management', path: '/admin/verification', icon: ShieldAlert },
          { name: 'Product Management', path: '/admin/products', icon: Package },
          { name: 'Order Management', path: '/admin/orders', icon: ShoppingBag },
          { name: 'Delivery & Logistics', path: '/admin/logistics', icon: Truck },
          { name: 'Platform Reviews', path: '/admin/reviews', icon: Star },
          { name: 'Support Desk', path: '/admin/support', icon: MessageSquare },
          { name: 'Marketing & Content', path: '/admin/campaigns', icon: FileSpreadsheet },
          { name: 'Payment Settings', path: '/admin/payments', icon: Wallet },
          { name: 'System Settings', path: '/admin/settings', icon: Settings }
        ];
      case 'delivery':
        return [
          { name: 'Driver Dashboard', path: '/delivery', icon: LayoutDashboard },
          { name: 'Active Routes', path: '/delivery/routes', icon: MapPin },
          { name: 'My Earnings', path: '/delivery/earnings', icon: Wallet },
          { name: 'Help & Support', path: '/delivery/support', icon: HelpCircle }
        ];
      default: // customer
        return [
          { name: 'My Dashboard', path: '/customer', icon: LayoutDashboard },
          { name: 'Order History', path: '/customer/orders', icon: ShoppingBag },
          { name: 'Local Farm Explorer', path: '/customer/gis', icon: MapPin },
          { name: 'Digital Wallet', path: '/customer/wallet', icon: Wallet },
          { name: 'Wishlist', path: '/customer/wishlist', icon: Heart },
          { name: 'Help & Support', path: '/customer/support', icon: HelpCircle }
        ];
    }
  };

  const menuLinks = getLinks();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile top navigation */}
      <div className="md:hidden bg-white border-b border-emerald-50 px-4 py-3 flex items-center justify-between z-20">
        <span className="text-lg font-black text-dark flex items-center space-x-1">
          <span>🌾</span>
          <span>FA-X Dashboard</span>
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-dark focus:outline-none">
          {isOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
        </button>
      </div>

      {/* Sidebar navigation */}
      <AnimatePresence>
        {(isOpen || !window.matchMedia("(max-width: 768px)").matches) && (
          <motion.aside 
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className={`w-[260px] bg-white border-r border-emerald-500/10 flex flex-col h-screen fixed md:sticky top-0 z-30 flex-shrink-0`}
          >
            {/* Top Identity block */}
            <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
                alt="Avatar" 
                className="w-10 h-10 rounded-xl object-cover border border-emerald-500/10"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-dark truncate leading-tight">{currentUser?.name}</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-0.5">{currentUser?.role}</span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
              {menuLinks.map(link => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-primary text-white shadow-md shadow-emerald-800/10' 
                        : 'text-dark hover:bg-emerald-50/50 hover:text-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 stroke-[2]" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : 'opacity-30'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Log Out button */}
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Dashboard body */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
