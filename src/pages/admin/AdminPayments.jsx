import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatPrice, formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Wallet, Settings, TrendingUp, IndianRupee, ArrowDownCircle, CheckCircle, RefreshCcw, Landmark } from 'lucide-react';

const AdminPayments = () => {
  const [orders, setOrders] = useState([]);
  const [commissionRate, setCommissionRate] = useState(5); // Default 5%
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'payouts', 'transactions'

  const fetchOrders = async () => {
    try {
      const ords = await dbService.getOrders(null, 'admin');
      // Polyfill payoutStatus for older mock objects
      const mapped = ords.map(o => ({...o, payoutStatus: o.payoutStatus || 'pending'}));
      setOrders(mapped);
    } catch (e) {
      console.error(e);
      showToast("Failed to load financial data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRateSave = (e) => {
    e.preventDefault();
    showToast(`Platform transaction commission updated to ${commissionRate}%!`, "success");
  };

  const handleProcessPayout = async (farmerId, farmerName) => {
    if(window.confirm(`Are you sure you want to process payouts for ${farmerName}?`)) {
      try {
        await dbService.processFarmerPayout(farmerId);
        showToast(`Payout processed for ${farmerName}!`, "success");
        fetchOrders(); // Refresh ledger
      } catch (e) {
        console.error(e);
        showToast("Failed to process payout", "error");
      }
    }
  };

  // ---- METRICS CALCULATION ----
  const totalVolume = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const platformRevenue = totalVolume * (commissionRate / 100);
  
  const refundedVolume = orders
    .filter(o => o.paymentStatus === 'refunded')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Farmers ledger: aggregate pending payouts per farmer
  const farmerLedger = {};
  orders.forEach(o => {
    if (!o.farmerId) return;
    if (!farmerLedger[o.farmerId]) {
      farmerLedger[o.farmerId] = {
        id: o.farmerId,
        name: o.farmerName,
        pendingBalance: 0,
        paidOutBalance: 0
      };
    }
    
    // Only 'delivered' and 'paid' orders are eligible for payout calculation
    if (o.paymentStatus === 'paid' && o.deliveryStatus === 'delivered') {
      const orderValueAfterCommission = o.totalAmount * (1 - (commissionRate / 100));
      if (o.payoutStatus === 'pending') {
        farmerLedger[o.farmerId].pendingBalance += orderValueAfterCommission;
      } else if (o.payoutStatus === 'paid_out') {
        farmerLedger[o.farmerId].paidOutBalance += orderValueAfterCommission;
      }
    }
  });
  const farmerLedgerArray = Object.values(farmerLedger);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Payment & Finance</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Review financial transactions, adjust platform commissions, process farmer payouts, and track revenue.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        {['dashboard', 'payouts', 'transactions'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors capitalize ${
              activeTab === tab 
                ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                : 'text-gray-400 hover:text-dark'
            }`}
          >
            {tab === 'dashboard' ? 'Revenue Dashboard' : tab === 'payouts' ? 'Farmer Payouts' : 'Transaction History'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading financial ledger...</div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Settings / Config */}
              <div className="space-y-6">
                <Card className="space-y-4">
                  <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" /> Commission Settings
                  </h3>
                  <form onSubmit={handleRateSave} className="space-y-3 font-semibold text-xs text-dark">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Transaction Fee Rate (%)</label>
                      <input 
                        type="number" 
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(Number(e.target.value))}
                        className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                        required
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    <Button type="submit" variant="primary" fullWidth>Update Rate</Button>
                  </form>
                </Card>
              </div>

              {/* Revenue Reports Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <Card className="flex flex-col justify-center text-center p-6 bg-gradient-to-br from-emerald-50 to-white">
                  <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Merchandise Value</p>
                  <p className="text-2xl font-black text-dark mt-1">{formatPrice(totalVolume)}</p>
                </Card>
                
                <Card className="flex flex-col justify-center text-center p-6 bg-gradient-to-br from-primary/10 to-white">
                  <Landmark className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform Revenue</p>
                  <p className="text-2xl font-black text-primary mt-1">{formatPrice(platformRevenue)}</p>
                </Card>

                <Card className="flex flex-col justify-center text-center p-6 bg-gradient-to-br from-amber-50 to-white">
                  <Wallet className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Payouts</p>
                  <p className="text-xl font-black text-dark mt-1">
                    {formatPrice(farmerLedgerArray.reduce((sum, f) => sum + f.pendingBalance, 0))}
                  </p>
                </Card>

                <Card className="flex flex-col justify-center text-center p-6 bg-gradient-to-br from-rose-50 to-white">
                  <RefreshCcw className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Refunded Volume</p>
                  <p className="text-xl font-black text-rose-600 mt-1">{formatPrice(refundedVolume)}</p>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <Card className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <div>
                  <h2 className="text-lg font-black text-dark">Farmer Payout Ledger</h2>
                  <p className="text-xs text-gray-500">Funds are eligible for payout once orders are Delivered and Paid.</p>
                </div>
              </div>

              {farmerLedgerArray.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr className="text-[10px] uppercase text-gray-500 tracking-wider">
                        <th className="p-4 font-bold">Farmer</th>
                        <th className="p-4 font-bold text-right">Already Paid</th>
                        <th className="p-4 font-bold text-right">Pending Escrow</th>
                        <th className="p-4 font-bold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmerLedgerArray.map(farmer => (
                        <tr key={farmer.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <td className="p-4">
                            <p className="text-sm font-bold text-dark">{farmer.name}</p>
                            <p className="text-[10px] font-mono text-gray-400">{farmer.id}</p>
                          </td>
                          <td className="p-4 text-right">
                            <p className="text-sm font-semibold text-gray-600">{formatPrice(farmer.paidOutBalance)}</p>
                          </td>
                          <td className="p-4 text-right">
                            <p className="text-sm font-black text-amber-600">{formatPrice(farmer.pendingBalance)}</p>
                          </td>
                          <td className="p-4 text-center">
                            <Button 
                              size="sm" 
                              variant={farmer.pendingBalance > 0 ? "primary" : "outline"}
                              disabled={farmer.pendingBalance === 0}
                              onClick={() => handleProcessPayout(farmer.id, farmer.name)}
                              className="text-[10px]"
                            >
                              {farmer.pendingBalance > 0 ? 'Process Payout' : 'All Settled'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 font-semibold text-xs">
                  No farmer ledger data found.
                </div>
              )}
            </Card>
          )}

          {activeTab === 'transactions' && (
            <Card className="space-y-6">
              <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Global Transaction History</h2>
              
              {orders.length > 0 ? (
                <div className="divide-y divide-gray-50 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr className="text-[10px] uppercase text-gray-500 tracking-wider">
                        <th className="p-3 font-bold">Date & ID</th>
                        <th className="p-3 font-bold">Parties</th>
                        <th className="p-3 font-bold text-center">Payment Status</th>
                        <th className="p-3 font-bold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <td className="p-3">
                            <p className="text-xs font-bold text-dark">{formatDate(order.createdAt)}</p>
                            <p className="text-[9px] font-mono text-gray-400">#{order.id?.substring(0,8)}</p>
                          </td>
                          <td className="p-3">
                            <p className="text-[10px] text-gray-600"><span className="font-bold">From:</span> {order.customerName}</p>
                            <p className="text-[10px] text-gray-600"><span className="font-bold">To:</span> {order.farmerName}</p>
                          </td>
                          <td className="p-3 text-center">
                            {order.paymentStatus === 'refunded' ? (
                              <span className="px-2 py-1 rounded bg-rose-50 text-rose-600 text-[9px] font-black uppercase tracking-wider">Refunded</span>
                            ) : order.paymentStatus === 'paid' ? (
                              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider">Paid</span>
                            ) : (
                              <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-wider">{order.paymentStatus}</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <p className="font-black text-sm text-dark">{formatPrice(order.totalAmount)}</p>
                            <p className="text-[9px] font-bold text-primary">Fee: {formatPrice((order.totalAmount || 0) * (commissionRate/100))}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 font-semibold text-xs">
                  No payment transactions recorded.
                </div>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPayments;
