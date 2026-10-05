import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartItems } = useCart() || { cartItems: [] };
  const { currentUser } = useAuth() || {};

  const getAccountLink = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'admin') return '/admin';
    if (currentUser.role === 'farmer') return '/farmer';
    return '/customer';
  };

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Categories', icon: Grid, path: '/categories' },
    { label: 'Cart', icon: ShoppingCart, path: '/cart', badge: cartItems?.length || 0 },
    { label: 'Account', icon: User, path: getAccountLink() },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={idx} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-[#4CAF50]' : 'text-gray-500 hover:text-[#11311F]'}`}
            >
              <div className="relative mb-1">
                <item.icon className={`w-5 h-5 ${isActive ? 'fill-[#4CAF50]/10' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF9800] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-semibold ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
