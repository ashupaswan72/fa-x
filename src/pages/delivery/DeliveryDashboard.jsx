import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dbService } from '../../services/database';
import { formatPrice, getStatusBadgeStyle } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Power, Wallet, Package, MapPin, Navigation, CheckCircle, Truck, Phone } from 'lucide-react';

const DeliveryDashboard = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [isOnline, setIsOnline] = useState(currentUser?.status === 'online');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchOrders = async () => {
    if (currentUser) {
      try {
        const ords = await dbService.getOrders(currentUser.uid, 'delivery');
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

  const handleToggleOnline = async () => {
    const newStatus = isOnline ? 'offline' : 'online';
    try {
      await dbService.updateDeliveryPartnerStatus(currentUser.uid, newStatus);
      setIsOnline(!isOnline);
      if (updateCurrentUser) {
        updateCurrentUser({ status: newStatus });
      }
      showToast(newStatus === 'online' ? "You are now ONLINE 🟢" : "You are now OFFLINE 🔴", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to update status", "error");
    }
  };

  const handleUpdateDeliveryStatus = async (orderId, newStatus) => {
    setProcessingId(orderId);
    try {
      await dbService.deliveryPartnerUpdateOrderStatus(orderId, newStatus);
      showToast(`Order marked as ${newStatus}!`, "success");
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast("Failed to update order status", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectAssignment = async (orderId) => {
    setProcessingId(orderId);
    try {
      await dbService.driverRejectAssignment(orderId);
      showToast("Order assignment rejected.", "info");
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast("Failed to reject order.", "error");
    } finally {
      setProcessingId(null);
    }
  };

  // Calculations for Today's Stats
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => o.createdAt?.startsWith(today) || true); // Assuming all completed ones for demo or filter by date
  
  // Delivered today
  const completedToday = todaysOrders.filter(o => o.deliveryStatus === 'delivered');
  const todaysDeliveriesCount = completedToday.length;
  // Estimate earnings: flat ₹40 per delivery for demo
  const todaysEarnings = completedToday.length * 40;

  // Active / New Requests
  const newRequests = orders.filter(o => o.deliveryStatus === 'driver_assigned'); // Assigned by admin, driver must accept
  const pendingPickup = orders.filter(o => o.deliveryStatus === 'driver_accepted' || o.deliveryStatus === 'processing'); // Accepted, must pick up
  const activeDeliveries = orders.filter(o => o.deliveryStatus === 'shipped' || o.deliveryStatus === 'out_for_delivery');

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Status Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-dark">Driver Dashboard</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Manage your routes and track your earnings.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
          <span className={`text-xs font-bold uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-gray-400'}`}>
            {isOnline ? 'Online & Ready' : 'Offline'}
          </span>
          <button 
            onClick={handleToggleOnline}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isOnline ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-9' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-0 shadow-lg shadow-emerald-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Today's Earnings</p>
              <h2 className="text-4xl font-black mt-2">{formatPrice(todaysEarnings)}</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Completed Today</p>
              <h2 className="text-4xl font-black mt-2">{todaysDeliveriesCount} <span className="text-lg font-semibold opacity-80">Deliveries</span></h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active & New Orders */}
      <div className="space-y-6">
        <h3 className="font-black text-xl text-dark flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" /> Active Route
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Active Delivery (Out for delivery) */}
            {activeDeliveries.map(order => (
              <Card key={order.id} className="border-l-4 border-l-amber-500 flex flex-col h-full shadow-md shadow-amber-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm z-10">
                  En Route
                </div>
                <div className="flex justify-between items-start mb-4 pt-1">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order #{order.id?.substring(0,8)}</p>
                    <h3 className="font-black text-dark text-lg mt-1">{formatPrice(order.totalAmount)}</h3>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl space-y-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" /> Pickup From</p>
                    <p className="text-sm font-semibold text-dark">{order.farmerName}</p>
                  </div>
                  <div className="border-l-2 border-dashed border-amber-200 ml-1.5 h-6"></div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 mb-1"><Navigation className="w-3 h-3" /> Deliver To</p>
                    <p className="text-sm font-semibold text-dark">{order.customerName}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.shippingAddress?.street}, {order.shippingAddress?.city}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleUpdateDeliveryStatus(order.id, 'delivered')}
                  variant="primary" 
                  fullWidth
                  loading={processingId === order.id}
                  className="mt-auto py-3 text-sm flex justify-center items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Mark as Delivered
                </Button>
              </Card>
            ))}

            {/* Pending Pickup (Driver Accepted) */}
            {pendingPickup.map(order => (
              <Card key={order.id} className="border-l-4 border-l-primary flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Accepted Assignment
                    </p>
                    <h3 className="font-black text-dark text-lg mt-1">Order #{order.id?.substring(0,8)}</h3>
                  </div>
                  <span className="px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider bg-gray-100 text-gray-600">
                    Waiting Pickup
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-3 mb-6">
                  <div className="flex items-start space-x-3 text-xs text-dark">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block">{order.farmerName}</span>
                      <span className="text-gray-500">Pick up items from the farmer</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handleUpdateDeliveryStatus(order.id, 'out_for_delivery')}
                  variant="outline" 
                  fullWidth
                  loading={processingId === order.id}
                  className="mt-auto py-3 text-sm flex justify-center items-center gap-2 border-primary text-primary hover:bg-primary/5"
                >
                  <Package className="w-4 h-4" /> Confirm Pickup
                </Button>
              </Card>
            ))}

            {/* New Requests (Assigned, waiting for driver to Accept/Reject) */}
            {newRequests.map(order => (
              <Card key={order.id} className="border-l-4 border-l-blue-500 flex flex-col h-full shadow-lg relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm z-10">
                  New Request
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Truck className="w-3 h-3 text-blue-500" /> Admin Assigned
                    </p>
                    <h3 className="font-black text-dark text-lg mt-1">Order #{order.id?.substring(0,8)}</h3>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl space-y-3 mb-6 border border-blue-100">
                  <div className="flex justify-between text-xs font-semibold text-dark">
                    <span>Earn:</span>
                    <span className="text-blue-600">₹40.00</span>
                  </div>
                  <div className="border-t border-dashed border-blue-200 my-2"></div>
                  <div className="flex justify-between text-xs text-dark">
                    <span className="text-gray-500">From:</span>
                    <span className="font-semibold">{order.farmerName}</span>
                  </div>
                  <div className="flex justify-between text-xs text-dark">
                    <span className="text-gray-500">To:</span>
                    <span className="font-semibold">{order.customerName}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button 
                    onClick={() => handleUpdateDeliveryStatus(order.id, 'driver_accepted')}
                    variant="primary" 
                    className="flex-1 py-3 text-sm flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                    loading={processingId === order.id}
                  >
                    Accept
                  </Button>
                  <Button 
                    onClick={() => handleRejectAssignment(order.id)}
                    variant="outline" 
                    className="flex-1 py-3 text-sm flex justify-center items-center gap-2 text-red-500 border-red-200 hover:bg-red-50"
                    loading={processingId === order.id}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}

            {newRequests.length === 0 && pendingPickup.length === 0 && activeDeliveries.length === 0 && (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Truck className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="font-bold text-dark mb-1">No Active Routes</h3>
                <p className="text-xs text-gray-400">You don't have any pending or active deliveries right now.</p>
                {!isOnline && (
                  <Button onClick={handleToggleOnline} variant="primary" className="mt-6">
                    Go Online to Receive Orders
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default DeliveryDashboard;
