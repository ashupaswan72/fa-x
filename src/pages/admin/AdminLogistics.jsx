import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Truck, MapPin, User, Package, CheckCircle, Clock, Plus, Pencil, Trash2, X } from 'lucide-react';

const AdminLogistics = () => {
  const [activeTab, setActiveTab] = useState('assign'); // 'partners', 'assign', 'active'
  const [partners, setPartners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection state for assigning
  const [selectedPartnerId, setSelectedPartnerId] = useState("");

  // Partner Management Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [fetchedPartners, fetchedOrders] = await Promise.all([
        dbService.getDeliveryPartners(),
        dbService.getOrders(null, 'admin')
      ]);
      setPartners(fetchedPartners);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Fetch Data Error:", error);
      showToast(error.message || "Failed to fetch logistics data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignOrder = async (orderId) => {
    if (!selectedPartnerId) {
      showToast("Please select a delivery partner first.", "error");
      return;
    }
    try {
      await dbService.assignDeliveryPartner(orderId, selectedPartnerId);
      showToast("Order assigned to delivery partner!", "success");
      setSelectedPartnerId("");
      fetchData(); // Refresh UI
    } catch (error) {
      console.error(error);
      showToast("Failed to assign order.", "error");
    }
  };

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setPartnerName("");
    setPartnerEmail("");
    setPartnerPhone("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (partner) => {
    setEditingPartner(partner);
    setPartnerName(partner.name || "");
    setPartnerEmail(partner.email || "");
    setPartnerPhone(partner.phone || "");
    setIsModalOpen(true);
  };

  const handleDeletePartner = async (partnerId) => {
    if (window.confirm("Are you sure you want to remove this delivery partner?")) {
      try {
        await dbService.deleteDeliveryPartner(partnerId);
        showToast("Delivery partner removed.", "info");
        fetchData();
      } catch (e) {
        console.error(e);
        showToast("Failed to remove partner.", "error");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!partnerName || !partnerEmail) {
      showToast("Name and email are required.", "warning");
      return;
    }

    setSubmitting(true);
    const payload = {
      name: partnerName,
      email: partnerEmail,
      phone: partnerPhone
    };

    try {
      if (editingPartner) {
        await dbService.updateDeliveryPartner(editingPartner.id || editingPartner.uid, payload);
        showToast("Delivery partner updated!", "success");
      } else {
        await dbService.addDeliveryPartner(payload);
        showToast("New delivery partner added!", "success");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast("Operation failed.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Processing orders waiting to be assigned (ONLY after Farmer accepts it -> 'processing')
  const assignableOrders = orders.filter(o => 
    o.paymentStatus === 'paid' && 
    o.deliveryStatus === 'processing' &&
    !o.deliveryPartnerId
  );

  // Orders currently assigned and in transit
  const activeDeliveries = orders.filter(o => 
    o.deliveryPartnerId && 
    ['driver_assigned', 'driver_accepted', 'shipped', 'out_for_delivery'].includes(o.deliveryStatus)
  );

  // Partner specific mapping to see how many active loads they have
  const getPartnerLoad = (partnerId) => {
    return activeDeliveries.filter(o => o.deliveryPartnerId === partnerId).length;
  };

  const getPartnerName = (partnerId) => {
    const p = partners.find(p => p.id === partnerId || p.uid === partnerId);
    return p ? p.name : 'Unknown Partner';
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Delivery & Logistics</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Manage your delivery fleet, assign orders to drivers, and track active shipments.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('assign')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'assign' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <Package className="w-4 h-4" /> Unassigned Orders ({assignableOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'active' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <Truck className="w-4 h-4" /> Active Deliveries ({activeDeliveries.length})
        </button>
        <button 
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'partners' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <User className="w-4 h-4" /> Delivery Fleet ({partners.length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading logistics data...</div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* TAB: ASSIGN ORDERS */}
          {activeTab === 'assign' && (
            <div className="space-y-6">
              {assignableOrders.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assignableOrders.map(order => (
                    <Card key={order.id} className="flex flex-col space-y-4 border border-emerald-50 hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                        <div>
                          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Farmer Accepted
                          </p>
                          <h3 className="font-black text-dark text-sm mt-1">Order #{order.id?.substring(0,8)}</h3>
                          <p className="text-[9px] text-gray-400 font-semibold">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Items</p>
                          <p className="text-xs font-black text-dark">{order.items?.length || 0}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-3 rounded-xl">
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500"/> Pickup From</p>
                          <p className="text-xs font-bold text-dark mt-0.5 truncate">{order.farmerName}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-500"/> Deliver To</p>
                          <p className="text-xs font-bold text-dark mt-0.5 truncate">{order.customerName}</p>
                          <p className="text-[9px] text-gray-500 truncate">{order.shippingAddress?.city}</p>
                        </div>
                      </div>

                      <div className="flex items-end gap-3 pt-2">
                        <div className="flex-1 space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Assign To Driver</label>
                          <select 
                            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none"
                            value={selectedPartnerId}
                            onChange={(e) => setSelectedPartnerId(e.target.value)}
                          >
                            <option value="">-- Select Driver --</option>
                            {partners.map(p => (
                              <option key={p.uid || p.id} value={p.uid || p.id}>
                                {p.name} ({getPartnerLoad(p.uid || p.id)} active loads)
                              </option>
                            ))}
                          </select>
                        </div>
                        <Button 
                          onClick={() => handleAssignOrder(order.id)} 
                          variant="primary"
                          className="mb-[1px]"
                        >
                          Dispatch
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
                  <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                  <p className="text-sm text-dark font-black">All Caught Up!</p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">There are no accepted orders waiting for logistics assignment.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: ACTIVE DELIVERIES */}
          {activeTab === 'active' && (
            <div className="space-y-6">
              {activeDeliveries.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/80 border-b border-gray-100">
                      <tr className="text-[10px] uppercase text-gray-500 tracking-wider">
                        <th className="p-4 font-bold">Order ID</th>
                        <th className="p-4 font-bold">Driver Assigned</th>
                        <th className="p-4 font-bold">Route</th>
                        <th className="p-4 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {activeDeliveries.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <p className="text-xs font-black text-dark">#{order.id?.substring(0,8)}</p>
                            <p className="text-[9px] text-gray-400 font-semibold">{formatDate(order.createdAt)}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" /> {getPartnerName(order.deliveryPartnerId)}
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-gray-500 truncate max-w-[80px]" title={order.farmerName}>{order.farmerName}</span>
                              <span className="text-gray-300">→</span>
                              <span className="text-[10px] font-bold text-dark truncate max-w-[80px]" title={order.customerName}>{order.customerName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1 w-max mx-auto ${
                              order.deliveryStatus === 'driver_assigned' ? 'bg-blue-50 text-blue-600' :
                              order.deliveryStatus === 'driver_accepted' ? 'bg-indigo-50 text-indigo-600' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              <Truck className="w-3 h-3" /> {
                                order.deliveryStatus === 'driver_assigned' ? 'Pending Acceptance' :
                                order.deliveryStatus === 'driver_accepted' ? 'Accepted' :
                                order.deliveryStatus
                              }
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-semibold mt-1">No active deliveries at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: FLEET (PARTNERS) */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div>
                  <h3 className="font-bold text-dark text-sm">Delivery Partner Management</h3>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Add or remove drivers from your active fleet.</p>
                </div>
                <Button variant="primary" onClick={handleOpenAddModal} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 shadow-sm">
                  <Plus className="w-4 h-4" /> Add Partner
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {partners.map(partner => (
                <Card key={partner.uid || partner.id} className="text-center flex flex-col items-center p-6 hover:shadow-md transition-shadow">
                  <div className="relative mb-3">
                    <img 
                      src={partner.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=10b981&color=fff`} 
                      alt={partner.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center" title="Verified Driver">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-black text-dark text-sm">{partner.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{partner.phone || 'No phone'}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-50 w-full flex justify-between items-center px-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Active Loads</span>
                    <span className="text-lg font-black text-primary">{getPartnerLoad(partner.uid || partner.id)}</span>
                  </div>

                  <div className="flex space-x-2 pt-3 w-full border-t border-gray-50 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOpenEditModal(partner)}
                      className="flex-grow flex items-center justify-center space-x-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Button>
                    <button 
                      onClick={() => handleDeletePartner(partner.id || partner.uid)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-colors cursor-pointer"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            </div>
          )}

        </div>
      )}

      {/* Partner Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-bold text-dark text-lg">{editingPartner ? 'Edit Delivery Partner' : 'Add Delivery Partner'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-dark text-xl font-bold"><X className="w-5 h-5"/></button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-dark">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Full Name *</label>
                <input 
                  type="text" 
                  value={partnerName} 
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email Address *</label>
                <input 
                  type="email" 
                  value={partnerEmail} 
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="rahul@delivery.com"
                  className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Phone Number</label>
                <input 
                  type="text" 
                  value={partnerPhone} 
                  onChange={(e) => setPartnerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 text-dark"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700" 
                loading={submitting}
              >
                {editingPartner ? 'Save Changes' : 'Register Partner'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminLogistics;
