import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, X, Search, Bell, MessageSquare, Store, Download, UserCircle, 
  LayoutDashboard, TrendingUp, ShoppingBag, Package, Users, UsersRound,
  Megaphone, CreditCard, Truck, RefreshCcw, Star, FileSpreadsheet,
  Settings, HelpCircle, ShieldCheck, ScrollText, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Sales Overview', path: '/admin/sales', icon: TrendingUp },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Farmers / Sellers', path: '/admin/verification', icon: Users },
    { name: 'Customers', path: '/admin/customers', icon: UsersRound },
    { name: 'Marketing', path: '/admin/campaigns', icon: Megaphone },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Logistics', path: '/admin/logistics', icon: Truck },
    { name: 'Returns & Refunds', path: '/admin/returns', icon: RefreshCcw },
    { name: 'Reviews & Ratings', path: '/admin/reviews', icon: Star },
    { name: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Support Tickets', path: '/admin/support', icon: HelpCircle },
    { name: 'System Users', path: '/admin/users', icon: ShieldCheck },
    { name: 'Audit Logs', path: '/admin/audit', icon: ScrollText },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* 1. TOP HEADER (Dark Green #11311F) */}
      <header className="bg-[#11311F] h-16 w-full flex items-center justify-between px-4 sm:px-6 shadow-md z-40 sticky top-0 border-b border-amber-500/20">
        
        {/* Left: Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-white/10 p-1.5 rounded-md transition-colors lg:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="hidden lg:block cursor-pointer hover:bg-white/10 p-1.5 rounded-md transition-colors" onClick={() => setIsOpen(!isOpen)}>
             <Menu className="w-6 h-6 text-white" />
          </div>
          <Link to="/" className="flex flex-col text-white pl-2">
            <div className="flex items-center">
              <span className="text-3xl font-black tracking-tighter italic">FAX</span>
              <Leaf className="w-5 h-5 ml-0.5 -mt-2 rotate-12" fill="white" />
            </div>
            <span className="text-[9px] tracking-[0.1em] font-medium leading-none -mt-1 opacity-90">Farm Access Exchange</span>
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Search for orders, customers, products..." 
            className="w-full h-10 pl-4 pr-12 rounded-md bg-white border-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm shadow-inner"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4 sm:gap-6 text-white shrink-0">
          
          <div className="hidden sm:flex items-center gap-5 relative">
            <button onClick={() => toggleDropdown('alerts')} className="flex flex-col items-center gap-0.5 group relative">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium opacity-90">Alerts</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 text-black text-[8px] font-bold rounded-full flex items-center justify-center">8</span>
            </button>
            {activeDropdown === 'alerts' && (
              <div className="absolute top-12 right-24 w-64 bg-white rounded-lg shadow-xl border border-amber-100 overflow-hidden text-gray-800 z-50">
                <div className="p-3 border-b border-gray-100 font-bold text-sm bg-gray-50 text-[#11311F]">Alerts (8)</div>
                <div className="p-4 text-xs font-medium text-gray-500 text-center hover:bg-gray-50 cursor-pointer">
                  System maintenance scheduled for 2:00 AM.
                </div>
                <div className="p-4 border-t border-gray-100 text-xs font-medium text-gray-500 text-center hover:bg-gray-50 cursor-pointer">
                  24 products are running out of stock.
                </div>
              </div>
            )}

            <button onClick={() => toggleDropdown('messages')} className="flex flex-col items-center gap-0.5 group relative">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium opacity-90">Messages</span>
            </button>
            {activeDropdown === 'messages' && (
              <div className="absolute top-12 right-12 w-64 bg-white rounded-lg shadow-xl border border-amber-100 overflow-hidden text-gray-800 z-50">
                <div className="p-3 border-b border-gray-100 font-bold text-sm bg-gray-50 text-[#11311F]">Messages</div>
                <div className="p-4 text-xs font-medium text-gray-500 text-center">
                  You have no new messages.
                </div>
              </div>
            )}

            <button onClick={() => toggleDropdown('seller')} className="flex flex-col items-center gap-0.5 group relative">
              <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium opacity-90">Seller Panel</span>
            </button>
            {activeDropdown === 'seller' && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-xl border border-amber-100 overflow-hidden text-gray-800 z-50">
                 <Link to="/admin/verification" onClick={() => setActiveDropdown(null)} className="block p-3 text-sm font-semibold hover:bg-amber-50 hover:text-amber-700 text-gray-700">View Sellers</Link>
                 <Link to="/admin/campaigns" onClick={() => setActiveDropdown(null)} className="block p-3 text-sm font-semibold hover:bg-amber-50 hover:text-amber-700 border-t border-gray-100 text-gray-700">Seller Campaigns</Link>
              </div>
            )}

            <button onClick={() => {
                alert('Reports are generating. A download link will be emailed to you.');
                setActiveDropdown(null);
            }} className="flex flex-col items-center gap-0.5 group relative">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium opacity-90">Download Reports</span>
            </button>
          </div>

          <div className="h-8 w-px bg-white/20 hidden sm:block"></div>

          <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-white/10 p-1.5 px-2 rounded-md transition-colors text-left group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20">
               {currentUser?.avatar ? (
                 <img src={currentUser.avatar} alt="Admin" className="w-full h-full object-cover" />
               ) : (
                 <UserCircle className="w-8 h-8 text-gray-300" />
               )}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold leading-tight">{currentUser?.name || 'Admin'}</span>
              <span className="text-[10px] font-medium opacity-80 uppercase leading-none mt-0.5">Super Admin <span className="inline-block transform group-hover:-translate-y-0.5 transition-transform">▼</span></span>
            </div>
          </button>

        </div>
      </header>

      {/* 2. BODY CONTAINER (Sidebar + Main) */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Sidebar */}
        <AnimatePresence>
          {(isOpen || !window.matchMedia("(max-width: 1024px)").matches) && (
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className={`w-[260px] bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] fixed lg:sticky top-16 z-30 flex-shrink-0 shadow-lg lg:shadow-none`}
            >
              <div className="p-4 overflow-y-auto flex-1 hide-scrollbar">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3 mt-2">Main Navigation</div>
                
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={idx}
                        to={link.path}
                        onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors group ${
                          isActive 
                            ? 'bg-[#11311F] text-amber-400 shadow-md shadow-black/10' 
                            : 'text-gray-600 hover:bg-amber-50 hover:text-[#11311F]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-amber-600'}`} />
                          <span>{link.name}</span>
                        </div>
                        {!isActive && <span className="text-[10px] font-black text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-amber-100 bg-amber-50/30">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-amber-600/50" />
                  <span className="text-xs font-bold text-[#11311F]">FAX Admin Panel</span>
                </div>
                <p className="text-[10px] text-gray-500">© 2024 FA-X Technologies Pvt. Ltd.</p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] p-4 md:p-6 bg-[#F8F9FA]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
