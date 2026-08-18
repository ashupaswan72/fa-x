import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice, formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { MapPin, Phone, User, CheckCircle, PackageSearch, XCircle, LayoutList } from 'lucide-react';

const FarmerOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'preorder'

  const fetchOrders = async () => {
    if (currentUser) {
      try {
        const ords = await dbService.getOrders(currentUser.uid, 'farmer');
        setOrders(ords);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  const handleAcceptOrder = async (orderId) => {
    try {
      await dbService.farmerAcceptOrder(orderId);
      showToast("Order accepted successfully!", "success");
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast("Failed to accept order. Did you run the SQL script?", "error");
    }
  };

  const handleRejectOrder = async (order) => {
    if (!window.confirm("Are you sure you want to reject this order? Stock will be restored.")) return;
    try {
      await dbService.farmerRejectOrder(order.id || order.uid, order.items);
      showToast("Order rejected and stock restored.", "info");
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast("Failed to reject order.", "error");
    }
  };

  // Separate standard/active orders from preorders
  const activeOrders = orders.filter(o => o.type !== 'preorder');
  const preorderOrders = orders.filter(o => o.type === 'preorder');

  // Aggregate Preorder Demand
  const demandMap = {};
  preorderOrders.forEach(order => {
    if (order.deliveryStatus === 'cancelled') return;
    
    order.items?.forEach(item => {
      if (!demandMap[item.productId]) {
        demandMap[item.productId] = {
          title: item.title,
          totalQty: 0,
          totalRevenue: 0,
          ordersCount: 0
        };
      }
      demandMap[item.productId].totalQty += (item.quantity || 1);
      demandMap[item.productId].totalRevenue += (item.discountedPrice || item.price) * (item.quantity || 1);
      demandMap[item.productId].ordersCount += 1;
    });
  });
  const demandList = Object.values(demandMap).sort((a, b) => b.totalQty - a.totalQty);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Order Management</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Accept customer orders and track upcoming preorder demand.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'active' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <LayoutList className="w-4 h-4" /> Active Orders
        </button>
        <button 
          onClick={() => setActiveTab('preorder')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'preorder' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <PackageSearch className="w-4 h-4" /> Preorder Demand Forecasting
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-gray-500">Loading your orders...</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* TAB: ACTIVE ORDERS */}
          {activeTab === 'active' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeOrders.length > 0 ? activeOrders.map(order => (
                <Card key={order.id} className="flex flex-col h-full border-l-4 border-l-primary/50 relative overflow-hidden">
                  {order.deliveryStatus === 'pending' && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm z-10">
                      New Request
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4 pt-1">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order #{order.id?.slice(0,8) || order.uid}</p>
                      <h3 className="font-black text-dark mt-1 flex items-center gap-2">
                        {formatPrice(order.totalAmount || 0)}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.deliveryStatus || 'pending')}`}>
                      {order.deliveryStatus || 'pending'}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl space-y-3 mb-4 flex-grow">
                    <div className="flex items-center space-x-3 text-xs text-dark">
                      <User className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-semibold">{order.customerName || 'Anonymous Customer'}</span>
                    </div>
                    {order.shippingAddress && (
                      <div className="flex items-start space-x-3 text-xs text-dark">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>
                          {order.shippingAddress.street}, {order.shippingAddress.city}<br/>
                          <span className="text-gray-500">{order.shippingAddress.state} - {order.shippingAddress.zip}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4 border-t border-gray-50 pt-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Items ordered</p>
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs items-center">
                        <span className="font-semibold text-dark flex-1 truncate pr-2">{item.title}</span>
                        <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">x{item.quantity || 1}</span>
                      </div>
                    ))}
                  </div>

                  {order.deliveryStatus === 'pending' && (
                    <div className="flex gap-3 mt-auto border-t border-gray-50 pt-4">
                      <Button onClick={() => handleAcceptOrder(order.id)} variant="primary" className="flex-1 flex justify-center items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Accept
                      </Button>
                      <Button onClick={() => handleRejectOrder(order)} variant="outline" className="flex-1 flex justify-center items-center gap-2 text-red-500 hover:bg-red-50 hover:border-red-200">
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </div>
                  )}
                  {['processing', 'driver_assigned', 'driver_accepted', 'out_for_delivery', 'shipped', 'delivered'].includes(order.deliveryStatus) && (
                    <div className="mt-auto border-t border-gray-50 pt-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Tracking</p>
                      <div className="relative flex justify-between items-center px-2">
                        {/* Connecting Line */}
                        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 bg-gray-100 rounded-full z-0"></div>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500" style={{
                          width: ['delivered'].includes(order.deliveryStatus) ? '100%' 
                               : ['out_for_delivery', 'shipped'].includes(order.deliveryStatus) ? '50%' 
                               : '0%'
                        }}></div>
                        
                        {/* Step 1: Processing/Assigned */}
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            ['processing', 'driver_assigned', 'driver_accepted', 'out_for_delivery', 'shipped', 'delivered'].includes(order.deliveryStatus) 
                              ? 'bg-primary border-primary ring-4 ring-primary/20' 
                              : 'bg-white border-gray-300'
                          }`}></div>
                          <span className={`text-[9px] font-bold absolute top-5 whitespace-nowrap ${
                            ['processing', 'driver_assigned', 'driver_accepted', 'out_for_delivery', 'shipped', 'delivered'].includes(order.deliveryStatus) ? 'text-primary' : 'text-gray-400'
                          }`}>Confirmed</span>
                        </div>

                        {/* Step 2: Picked Up / Shipped */}
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            ['out_for_delivery', 'shipped', 'delivered'].includes(order.deliveryStatus) 
                              ? 'bg-primary border-primary ring-4 ring-primary/20' 
                              : 'bg-white border-gray-300'
                          }`}></div>
                          <span className={`text-[9px] font-bold absolute top-5 whitespace-nowrap ${
                            ['out_for_delivery', 'shipped', 'delivered'].includes(order.deliveryStatus) ? 'text-primary' : 'text-gray-400'
                          }`}>Shipped</span>
                        </div>

                        {/* Step 3: Delivered */}
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            order.deliveryStatus === 'delivered' 
                              ? 'bg-primary border-primary ring-4 ring-primary/20' 
                              : 'bg-white border-gray-300'
                          }`}></div>
                          <span className={`text-[9px] font-bold absolute top-5 whitespace-nowrap ${
                            order.deliveryStatus === 'delivered' ? 'text-primary' : 'text-gray-400'
                          }`}>Delivered</span>
                        </div>
                      </div>
                      <div className="h-6"></div> {/* Spacer for absolute text */}
                    </div>
                  )}
                </Card>
              )) : (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <PackageSearch className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="font-bold text-dark mb-1">No Active Orders</h3>
                  <p className="text-xs text-gray-400">You don't have any incoming standard orders at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: PREORDER DEMAND */}
          {activeTab === 'preorder' && (
            <div className="space-y-6">
              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                <h3 className="font-bold text-dark mb-2 text-sm flex items-center gap-2">
                  <PackageSearch className="w-4 h-4 text-amber-500" /> Aggregated Preorder Demand
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                  This view consolidates all incoming preorders by product. Use this data to accurately forecast how much crop needs to be prepared for upcoming harvest deliveries. It combines demand from multiple individual customers into a single bulk view.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demandList.length > 0 ? demandList.map((demand, idx) => (
                  <Card key={idx} className="border-t-4 border-t-amber-400 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-dark text-lg leading-tight mb-2">{demand.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                        From {demand.ordersCount} different orders
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-amber-50 p-3 rounded-xl flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-800">Total Demand:</span>
                        <span className="text-xl font-black text-amber-600">{demand.totalQty} <span className="text-xs font-semibold">units</span></span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs px-1">
                        <span className="font-semibold text-gray-500">Expected Value:</span>
                        <span className="font-bold text-dark">{formatPrice(demand.totalRevenue)}</span>
                      </div>
                    </div>
                  </Card>
                )) : (
                  <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <PackageSearch className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <h3 className="font-bold text-dark mb-1">No Preorder Demand</h3>
                    <p className="text-xs text-gray-400">You don't have any active preorders.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
