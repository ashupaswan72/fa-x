import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatPrice, formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  IndianRupee, 
  MapPin, 
  User, 
  Calendar 
} from 'lucide-react';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'disputed'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      // Get all orders for admin
      const data = await dbService.getOrders(null, 'admin');
      setOrders(data);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newDeliveryStatus, newPaymentStatus) => {
    try {
      await dbService.updateOrderStatusAdmin(orderId, newDeliveryStatus, newPaymentStatus);
      showToast(`Order status updated to ${newDeliveryStatus}`, "success");
      
      // Update local state to close modal and reflect changes
      if (selectedOrder) {
        setSelectedOrder({ ...selectedOrder, deliveryStatus: newDeliveryStatus, paymentStatus: newPaymentStatus });
      }
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast(`Failed to update order`, "error");
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'processing': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'cancelled': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'disputed': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'refunded': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'paid': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'all') return true;
    return o.deliveryStatus?.toLowerCase() === activeTab;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Order Management</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Track deliveries, process refunds, and resolve order disputes.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'disputed'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap capitalize ${
              activeTab === tab 
                ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                : 'text-gray-400 hover:text-dark'
            }`}
          >
            {tab} ({orders.filter(o => tab === 'all' ? true : o.deliveryStatus?.toLowerCase() === tab).length})
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading transactions...</div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <Card 
              key={order.id} 
              className="flex flex-col cursor-pointer hover:shadow-md transition-shadow hover:border-primary/30"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-dark text-sm uppercase tracking-wider text-[10px]">
                    Order #{order.id?.substring(0,8)}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(order.deliveryStatus)}`}>
                    {order.deliveryStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Customer</p>
                  <p className="text-xs font-bold text-dark truncate">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Farmer</p>
                  <p className="text-xs font-bold text-dark truncate">{order.farmerName}</p>
                </div>
              </div>

              <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Items</p>
                  <p className="text-xs font-semibold text-dark">{order.items?.length || 0} product(s)</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Total Amount</p>
                  <p className="text-lg font-black text-primary flex items-center justify-end">
                    <IndianRupee className="w-4 h-4" /> {order.totalAmount}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-emerald-50">
          <p className="text-xs text-gray-500 font-semibold">No orders found matching this filter.</p>
        </div>
      )}

      {/* Order Detail & Action Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
              <div>
                <h2 className="text-lg font-black text-dark flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Order Details
                </h2>
                <p className="text-[10px] text-gray-400 font-mono mt-1">ID: {selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Details */}
              <div className="space-y-6">
                
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Status</h3>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Delivery</p>
                      <span className={`px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedOrder.deliveryStatus)}`}>
                        {selectedOrder.deliveryStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Payment</p>
                      <span className={`px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Parties</h3>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
                    <p className="text-xs flex items-center gap-2"><User className="w-3.5 h-3.5 text-gray-400"/> <span className="font-bold">Customer:</span> {selectedOrder.customerName}</p>
                    <p className="text-xs flex items-center gap-2"><User className="w-3.5 h-3.5 text-primary"/> <span className="font-bold">Farmer:</span> {selectedOrder.farmerName}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1 border border-gray-100 text-xs">
                    <p className="font-bold text-dark flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {selectedOrder.shippingAddress?.name || 'N/A'}</p>
                    <p className="text-gray-600 pl-4.5">{selectedOrder.shippingAddress?.street}</p>
                    <p className="text-gray-600 pl-4.5">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
                    <p className="text-gray-600 pl-4.5 font-semibold mt-2">Phone: {selectedOrder.shippingAddress?.phone}</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Items & Actions */}
              <div className="space-y-6">
                
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Order Items</h3>
                  <div className="bg-emerald-50/30 rounded-xl border border-emerald-100 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-emerald-50 border-b border-emerald-100">
                        <tr className="text-[10px] uppercase text-emerald-800">
                          <th className="p-2 font-bold">Item</th>
                          <th className="p-2 font-bold text-right">Qty</th>
                          <th className="p-2 font-bold text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items?.map((item, idx) => (
                          <tr key={idx} className="border-b border-emerald-50 last:border-0">
                            <td className="p-2 text-xs font-semibold text-dark truncate max-w-[120px]" title={item.title}>{item.title}</td>
                            <td className="p-2 text-xs text-right text-gray-600">{item.quantity}</td>
                            <td className="p-2 text-xs text-right font-black text-dark">,1{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-3 bg-white border-t border-emerald-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total</span>
                      <span className="text-xl font-black text-primary">,1{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Admin Actions</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'processing', 'paid')}
                      className="text-xs py-2 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 flex items-center justify-center gap-1"
                    >
                      <Package className="w-3.5 h-3.5" /> Force Processing
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped', 'paid')}
                      className="text-xs py-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex items-center justify-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" /> Force Shipped
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered', 'paid')}
                      className="text-xs py-2 col-span-2 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Delivered
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'disputed', selectedOrder.paymentStatus)}
                      className="text-xs py-2 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 flex items-center justify-center gap-1"
                      title="Flag order for investigation"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Flag Dispute
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if(window.confirm("Are you sure you want to cancel and refund this order?")) {
                          handleUpdateStatus(selectedOrder.id, 'cancelled', 'refunded');
                        }
                      }}
                      className="text-xs py-2 bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancel & Refund
                    </Button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrderManagement;
