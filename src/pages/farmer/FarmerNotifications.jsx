import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import { showToast } from '../../components/ui/Toast';
import { Bell, ShoppingBag, CreditCard, Package, TrendingUp, Info, Check } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const FarmerNotifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (currentUser) {
      try {
        const notifs = await dbService.getFarmerNotifications(currentUser.uid);
        if (notifs && notifs.length > 0) {
          setNotifications(notifs);
        } else {
          // Fallback mock notifications if DB is empty
          setNotifications([
            {
              id: 'mock-1',
              title: 'New Order Received',
              message: 'You have a new standard order for 50kg Tomatoes. Please accept and prepare for logistics pickup.',
              type: 'order',
              isRead: false,
              createdAt: new Date().toISOString()
            },
            {
              id: 'mock-2',
              title: 'Payment Processed',
              message: 'Your weekly payout of ₹15,400 has been processed to your bank account ending in 4589.',
              type: 'payment',
              isRead: false,
              createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            },
            {
              id: 'mock-3',
              title: 'Low Inventory Alert',
              message: 'Your stock for Alphonso Mangoes is running low (under 100kg). Consider updating your inventory.',
              type: 'inventory',
              isRead: true,
              createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            },
            {
              id: 'mock-4',
              title: 'Market Trend Alert',
              message: 'Wholesale prices for Basmati Rice have increased by 4.7% this week.',
              type: 'market',
              isRead: true,
              createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
            }
          ]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    // In a real production app, we would set up a Supabase Realtime subscription here
    // to listen for new rows in the farmer_notifications table and update automatically.
  }, [currentUser]);

  const handleMarkAsRead = async (id) => {
    try {
      await dbService.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
      showToast("Failed to mark notification as read", "error");
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case 'inventory': return <Package className="w-5 h-5 text-rose-500" />;
      case 'market': return <TrendingUp className="w-5 h-5 text-amber-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-50 border-blue-100';
      case 'payment': return 'bg-emerald-50 border-emerald-100';
      case 'inventory': return 'bg-rose-50 border-rose-100';
      case 'market': return 'bg-amber-50 border-amber-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-dark">Notifications</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Real-time alerts for your orders, inventory, and market trends.
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {unreadCount} Unread
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-gray-500">Loading alerts...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 rounded-2xl border transition-all ${
                notif.isRead 
                  ? 'bg-white border-gray-100 opacity-75' 
                  : `${getColorForType(notif.type)} shadow-sm relative overflow-hidden`
              }`}
            >
              {!notif.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              )}
              
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  notif.isRead ? 'bg-gray-100' : 'bg-white shadow-sm'
                }`}>
                  {getIconForType(notif.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm ${notif.isRead ? 'font-semibold text-gray-700' : 'font-black text-dark'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400">
                      {formatDate(notif.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {notif.message}
                  </p>
                  
                  {!notif.isRead && (
                    <button 
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-[10px] font-bold text-primary flex items-center gap-1 hover:text-primary-dark transition-colors"
                    >
                      <Check className="w-3 h-3" /> Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-dark text-lg mb-1">All Caught Up!</h3>
          <p className="text-sm text-gray-400">You don't have any notifications right now.</p>
        </div>
      )}
    </div>
  );
};

export default FarmerNotifications;
