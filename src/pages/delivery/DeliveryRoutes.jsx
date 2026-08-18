import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dbService } from '../../services/database';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { MapPin, Navigation, Package, CheckCircle2, User, Phone, Map, ShieldCheck, X } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

const DeliveryRoutes = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpTargetOrderId, setOtpTargetOrderId] = useState(null);
  const [otpInput, setOtpInput] = useState('');

  const fetchActiveRoutes = async () => {
    if (!currentUser) return;
    try {
      const allOrders = await dbService.getOrders(currentUser.uid, 'delivery');
      // Filter only active orders assigned to this driver that are not yet delivered
      const active = allOrders.filter(o => 
        !['pending', 'processing', 'driver_assigned', 'delivered', 'cancelled'].includes(o.deliveryStatus)
      );
      setOrders(active);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch routes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveRoutes();
  }, [currentUser]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await dbService.deliveryPartnerUpdateOrderStatus(orderId, newStatus);
      showToast(`Status updated to ${newStatus.replace(/_/g, ' ')}`, "success");
      fetchActiveRoutes();
    } catch (e) {
      console.error(e);
      showToast("Failed to update status", "error");
    }
  };

  const handleActionClick = (order) => {
    const status = order.deliveryStatus;
    if (status === 'driver_accepted') {
      updateStatus(order.id, 'arrived_at_farmer');
    } else if (status === 'arrived_at_farmer') {
      updateStatus(order.id, 'shipped');
    } else if (status === 'shipped') {
      updateStatus(order.id, 'out_for_delivery');
    } else if (status === 'out_for_delivery') {
      updateStatus(order.id, 'arrived_at_customer');
    } else if (status === 'arrived_at_customer') {
      setOtpTargetOrderId(order.id);
      setShowOtpModal(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      showToast("Please enter a valid 4-digit code", "error");
      return;
    }
    // Mocking OTP validation success
    setShowOtpModal(false);
    setOtpInput('');
    try {
      await dbService.deliveryPartnerUpdateOrderStatus(otpTargetOrderId, 'delivered');
      showToast("Delivery Confirmed Successfully!", "success");
      fetchActiveRoutes();
    } catch (error) {
      showToast("Failed to confirm delivery", "error");
    }
  };

  const getActionConfig = (status) => {
    switch (status) {
      case 'driver_accepted':
        return { label: 'Arrived at Farmer', icon: MapPin, color: 'bg-blue-600 hover:bg-blue-700' };
      case 'arrived_at_farmer':
        return { label: 'Picked Up Order', icon: Package, color: 'bg-indigo-600 hover:bg-indigo-700' };
      case 'shipped':
        return { label: 'Start Transit (On the Way)', icon: Navigation, color: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'out_for_delivery':
        return { label: 'Arrived at Customer', icon: MapPin, color: 'bg-amber-600 hover:bg-amber-700' };
      case 'arrived_at_customer':
        return { label: 'Confirm Delivery (OTP)', icon: ShieldCheck, color: 'bg-primary hover:bg-primary-dark' };
      default:
        return { label: 'Processing', icon: Navigation, color: 'bg-gray-400' };
    }
  };

  const getStatusText = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-dark flex items-center gap-2">
          <Map className="w-8 h-8 text-primary" /> Active Routes
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Manage your active pickups, transit tracking, and secure deliveries.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2 border-emerald-100 bg-emerald-50/20">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">No Active Routes</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            You have no active deliveries in progress. Check the Dashboard to accept new incoming delivery requests.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => {
            const config = getActionConfig(order.deliveryStatus);
            const ActionIcon = config.icon;

            return (
              <Card key={order.id} className="flex flex-col border-l-4 border-l-primary/50 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1.5 rounded-bl-xl shadow-sm z-10 border-b border-l border-primary/20">
                  {getStatusText(order.deliveryStatus)}
                </div>
                
                <div className="p-5 flex-1">
                  <div className="mb-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order #{order.id.slice(0,8)}</p>
                    <h3 className="font-black text-dark mt-1 text-lg">
                      {order.items?.length || 1} Item(s) to Deliver
                    </h3>
                  </div>

                  {/* Pickup Info */}
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl mb-3">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Package className="w-3 h-3" /> Pickup Details
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-dark mb-1.5">
                      <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="font-bold">{order.farmerName || 'Farmer'}</span>
                    </div>
                  </div>

                  {/* Dropoff Info */}
                  <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Dropoff Details
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-dark mb-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="font-bold">{order.customerName || 'Customer'}</span>
                    </div>
                    {order.shippingAddress && (
                      <div className="flex items-start space-x-3 text-xs text-dark">
                        <Navigation className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-medium text-gray-600">
                          {order.shippingAddress.street}, {order.shippingAddress.city}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={() => handleActionClick(order)}
                    className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${config.color}`}
                  >
                    <ActionIcon className="w-5 h-5" />
                    {config.label}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* OTP Confirmation Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 relative">
            <button 
              onClick={() => { setShowOtpModal(false); setOtpInput(''); }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-dark bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-xl font-black text-dark mb-1">Confirm Delivery</h2>
              <p className="text-xs text-gray-500 mb-6 font-medium">Ask the customer for the 4-digit Delivery PIN (or scan QR code).</p>

              <form onSubmit={handleOtpSubmit}>
                <div className="mb-6">
                  <input
                    type="text"
                    maxLength="4"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • •"
                    className="w-full text-center text-4xl font-black tracking-[1em] text-dark py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
                  />
                  <p className="text-[10px] font-bold text-gray-400 mt-2">Simulated PIN: Enter any 4 digits to proceed</p>
                </div>

                <Button type="submit" variant="primary" className="w-full py-4 text-base font-bold rounded-xl shadow-lg shadow-primary/30">
                  Verify & Complete Order
                </Button>
              </form>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
              <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-1 mx-auto">
                <MapPin className="w-3.5 h-3.5" /> Scan Customer QR Code instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryRoutes;
