import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Check, ShieldCheck, MapPin, X, Ban, UserCheck, TrendingUp, IndianRupee } from 'lucide-react';

const AdminUserVerification = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'active', 'suspended'
  const [farmerStats, setFarmerStats] = useState({});
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const fetchFarmers = async () => {
    try {
      const users = await dbService.getUsers();
      const farmerUsers = users.filter(u => u.role === 'farmer');
      setFarmers(farmerUsers);
      
      // Fetch stats for all active farmers
      const statsObj = {};
      await Promise.all(farmerUsers.filter(f => f.status === 'verified').map(async (f) => {
        const uid = f.id || f.uid;
        statsObj[uid] = await dbService.getFarmerStats(uid);
      }));
      setFarmerStats(statsObj);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleApprove = async (uid) => {
    try {
      await dbService.verifyUserKYC(uid);
      showToast("Farmer KYC Approved! They can now list crops.", "success");
      fetchFarmers();
    } catch (e) {
      console.error(e);
      showToast("Verification failed", "error");
    }
  };

  const handleReject = async (uid) => {
    try {
      await dbService.rejectFarmerKYC(uid);
      showToast("Farmer KYC Rejected.", "warning");
      fetchFarmers();
    } catch (e) {
      console.error(e);
      showToast("Rejection failed", "error");
    }
  };

  const handleSuspend = async (uid) => {
    if (window.confirm("Are you sure you want to suspend this farmer's account?")) {
      try {
        await dbService.suspendUser(uid);
        showToast("Farmer account suspended successfully.", "warning");
        fetchFarmers();
      } catch (e) {
        console.error(e);
        showToast("Suspension failed", "error");
      }
    }
  };

  const handleUnblock = async (uid) => {
    try {
      await dbService.unblockUser(uid);
      showToast("Farmer account unblocked successfully.", "success");
      fetchFarmers();
    } catch (e) {
      console.error(e);
      showToast("Unblock failed", "error");
    }
  };

  const filteredFarmers = farmers.filter(f => {
    if (activeTab === 'pending') return f.status === 'pending_kyc';
    if (activeTab === 'active') return f.status === 'verified';
    if (activeTab === 'suspended') return f.status === 'suspended' || f.status === 'rejected';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Farmer Management</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Review registrations, monitor performance, and manage farmer accounts.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-100 pb-2">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'pending' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'}`}
        >
          Pending KYC ({farmers.filter(f => f.status === 'pending_kyc').length})
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'active' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-dark'}`}
        >
          Active Farmers ({farmers.filter(f => f.status === 'verified').length})
        </button>
        <button 
          onClick={() => setActiveTab('suspended')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'suspended' ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500' : 'text-gray-400 hover:text-dark'}`}
        >
          Suspended/Rejected ({farmers.filter(f => f.status === 'suspended' || f.status === 'rejected').length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading farmer data...</div>
      ) : filteredFarmers.length > 0 ? (
        <div className="space-y-6">
          {filteredFarmers.map(farmer => {
            const uid = farmer.id || farmer.uid;
            const stats = farmerStats[uid];

            return (
              <Card key={uid} className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-6">
                
                {/* Profile Details */}
                <div className="space-y-3 flex-grow max-w-2xl">
                  <div className="flex items-center space-x-4">
                    <img src={farmer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} alt={farmer.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-bold text-dark text-sm">{farmer.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${getStatusBadgeStyle(farmer.status)}`}>
                          {farmer.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold mt-0.5">UID: {uid.substring(0,8)}...</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-500 font-semibold bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                    <p>Farm: <strong className="text-dark">{farmer.farmName || 'N/A'}</strong></p>
                    <p>Contact: <strong className="text-dark">{farmer.phone || 'N/A'}</strong></p>
                    <p>Email: <strong className="text-dark">{farmer.email}</strong></p>
                    <p className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="truncate" title={farmer.address}>{farmer.address || 'N/A'}</span>
                    </p>
                  </div>

                  {activeTab === 'pending' && (
                    <div className="bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-500/10 text-[10px] text-emerald-800 flex flex-col space-y-1">
                      <div className="flex justify-between">
                        <span>Aadhaar ID Card: <strong>{farmer.aadhaar_card || 'Pending'}</strong></span>
                        <span className="underline cursor-pointer text-primary">View Document</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Resident Certificate: <strong>{farmer.resident_certificate || 'Pending'}</strong></span>
                        <span className="underline cursor-pointer text-primary">View Document</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Performance Metrics (Active Only) */}
                {activeTab === 'active' && stats && (
                  <div className="flex space-x-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 min-w-[200px] justify-center xl:justify-start">
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center space-x-1">
                        <IndianRupee className="w-3 h-3" /> <span>Sales</span>
                      </p>
                      <p className="text-lg font-black text-dark mt-1">₹{stats.totalSales}</p>
                    </div>
                    <div className="w-px bg-primary/10"></div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center space-x-1">
                        <TrendingUp className="w-3 h-3" /> <span>Rating</span>
                      </p>
                      <p className="text-lg font-black text-dark mt-1">{stats.rating}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex xl:flex-col gap-2 shrink-0">
                  {activeTab === 'pending' && (
                    <>
                      <Button variant="primary" size="sm" onClick={() => handleApprove(uid)} className="flex items-center space-x-1">
                        <Check className="w-4 h-4" /> <span>Approve KYC</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(uid)} className="flex items-center space-x-1 text-rose-500 border-rose-100 hover:bg-rose-50">
                        <X className="w-4 h-4" /> <span>Reject</span>
                      </Button>
                    </>
                  )}

                  {activeTab === 'active' && (
                    <Button variant="outline" size="sm" onClick={() => handleSuspend(uid)} className="flex items-center space-x-1 text-rose-500 border-rose-100 hover:bg-rose-50">
                      <Ban className="w-4 h-4" /> <span>Suspend Account</span>
                    </Button>
                  )}

                  {activeTab === 'suspended' && (
                    <Button variant="outline" size="sm" onClick={() => handleUnblock(uid)} className="flex items-center space-x-1 text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                      <UserCheck className="w-4 h-4" /> <span>Unblock & Verify</span>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedFarmer(farmer)}>
                    View Full Profile
                  </Button>
                </div>

              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-emerald-50">
          <p className="text-xs text-gray-500 font-semibold">No {activeTab} farmers found on the platform.</p>
        </div>
      )}

      {/* Full Profile Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-100">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-lg font-black text-dark">Farmer Profile</h2>
              <button 
                onClick={() => setSelectedFarmer(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="flex items-center space-x-6">
                <img src={selectedFarmer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} alt={selectedFarmer.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-emerald-50" />
                <div>
                  <h3 className="text-2xl font-black text-dark">{selectedFarmer.name}</h3>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusBadgeStyle(selectedFarmer.status)}`}>
                    {selectedFarmer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Contact Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500 font-semibold">Email:</span> <span className="font-bold text-dark">{selectedFarmer.email}</span></p>
                    <p><span className="text-gray-500 font-semibold">Phone:</span> <span className="font-bold text-dark">{selectedFarmer.phone || 'Not Provided'}</span></p>
                    <p><span className="text-gray-500 font-semibold">Address:</span> <span className="font-bold text-dark">{selectedFarmer.address || 'Not Provided'}</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Business Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500 font-semibold">Farm Name:</span> <span className="font-bold text-dark">{selectedFarmer.farmName || 'Not Provided'}</span></p>
                    <p><span className="text-gray-500 font-semibold">UID:</span> <span className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">{selectedFarmer.id || selectedFarmer.uid}</span></p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">KYC Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Aadhaar Card</p>
                    <p className="font-bold text-dark text-sm truncate">{selectedFarmer.aadhaar_card || 'Not Submitted'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Resident Certificate</p>
                    <p className="font-bold text-dark text-sm truncate">{selectedFarmer.resident_certificate || 'Not Submitted'}</p>
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

export default AdminUserVerification;
