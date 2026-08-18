import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { formatPrice, formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import { ShoppingBag, Wallet, Award, ArrowRight } from 'lucide-react';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const { balance, rewardPoints } = useWallet();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const ords = await dbService.getOrders(currentUser.uid, 'customer');
          setOrders(ords.slice(0, 4)); // Get latest 4 orders
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [currentUser]);

  const activePreorders = orders.filter(o => o.type === 'preorder' && o.paymentStatus === 'deposit_paid').length;

  return (
    <div className="space-y-10">
      
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-dark">Welcome back, {currentUser?.name}!</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Here is a quick summary of your agricultural trade activities.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center space-x-4">
          <div className="bg-emerald-500/10 p-3.5 rounded-xl">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Wallet Funds</span>
            <p className="text-xl font-black text-dark mt-1">{formatPrice(balance)}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3.5 rounded-xl">
            <Award className="w-6 h-6 text-accent-hover" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Reward Points</span>
            <p className="text-xl font-black text-dark mt-1">{rewardPoints} pts</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-emerald-500/10 p-3.5 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Orders</span>
            <p className="text-xl font-black text-dark mt-1">{orders.length}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3.5 rounded-xl">
            <span className="text-xl">⏳</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Active Preorders</span>
            <p className="text-xl font-black text-dark mt-1">{activePreorders} items</p>
          </div>
        </Card>
      </div>

      {/* Recent Orders grid */}
      <Card className="space-y-6">
        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
          <h2 className="text-lg font-black text-dark">Recent Purchase Transactions</h2>
          <Link to="/customer/orders" className="text-xs font-bold text-primary hover:underline flex items-center space-x-1">
            <span>All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-6 text-xs text-gray-400 font-semibold">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div 
                key={order.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-emerald-50/20 rounded-xl border border-emerald-500/5 text-xs font-semibold"
              >
                <div>
                  <p className="font-bold text-dark text-sm">Order ID: {order.id}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Placed on {formatDate(order.createdAt)} • {order.items?.length} items</p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 block font-bold leading-none">Total Value</span>
                    <span className="text-dark font-black text-sm">{formatPrice(order.totalAmount)}</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.deliveryStatus)}`}>
                    {order.deliveryStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 font-semibold flex flex-col items-center space-y-2">
            <span className="text-3xl">📦</span>
            <p className="text-xs">You haven't placed any orders yet.</p>
            <Link to="/" className="text-xs text-primary underline">Shop fresh harvests now</Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;
