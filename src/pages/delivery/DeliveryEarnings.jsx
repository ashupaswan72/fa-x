import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import { Wallet, TrendingUp, Calendar, CreditCard, CheckCircle2, ChevronRight, Activity, ArrowRightLeft, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dbService } from '../../services/database';

const DeliveryEarnings = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        if (!currentUser) return;
        const fetchedOrders = await dbService.getOrders(currentUser.uid, 'delivery');
        setOrders(fetchedOrders || []);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, [currentUser]);

  // Calculate Ledger
  const ledger = orders
    .filter(o => o.deliveryStatus === 'delivered')
    .map(o => {
      // Mocking some tips based on order ID for variety if not present in DB
      const charCodeSum = o.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const tip = charCodeSum % 3 === 0 ? 20 : (charCodeSum % 5 === 0 ? 50 : 0);
      const baseFee = 60; // Flat base fee per delivery
      
      return {
        id: o.id,
        date: new Date(o.createdAt || Date.now()),
        customerName: o.shippingAddress?.name || 'Customer',
        baseFee,
        tip,
        total: baseFee + tip,
        status: o.payoutStatus || 'pending'
      };
    })
    .sort((a, b) => b.date - a.date);

  const totalEarnings = ledger.reduce((sum, item) => sum + item.total, 0);
  const totalTips = ledger.reduce((sum, item) => sum + item.tip, 0);
  const totalDeliveries = ledger.length;
  
  // Pending Payout (earnings from the last 7 days)
  const pendingPayout = ledger
    .filter(item => item.status !== 'paid')
    .reduce((sum, item) => sum + item.total, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-dark">Earnings & Payouts</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Track your delivery fees, tips, and weekly bank transfers.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border border-emerald-100 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">Available</span>
          </div>
          <div>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Total Earned</p>
            <h2 className="text-3xl font-black">₹{totalEarnings.toLocaleString()}</h2>
          </div>
        </Card>
        
        <Card className="p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Tips</p>
            <h2 className="text-2xl font-black text-dark">₹{totalTips.toLocaleString()}</h2>
          </div>
        </Card>

        <Card className="p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Completed Deliveries</p>
            <h2 className="text-2xl font-black text-dark">{totalDeliveries}</h2>
          </div>
        </Card>

        <Card className="p-5 border border-amber-100 bg-amber-50/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-lg">Next Payout</span>
          </div>
          <div>
            <p className="text-amber-700/70 text-xs font-bold uppercase tracking-wider mb-1">Pending Transfer</p>
            <h2 className="text-2xl font-black text-amber-700">₹{pendingPayout.toLocaleString()}</h2>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ledger Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-black text-dark flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" /> Recent Transactions
          </h2>
          <Card className="overflow-hidden border border-gray-100">
            {ledger.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="font-semibold text-sm">No completed deliveries yet.</p>
                <p className="text-xs mt-1">Your earnings will appear here once you deliver orders.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Order</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Base Pay</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Tip</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Total</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ledger.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-sm text-dark">{item.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                          <div className="text-xs font-semibold text-gray-400 truncate max-w-[150px]">To: {item.customerName}</div>
                        </td>
                        <td className="p-4 text-right font-bold text-dark text-sm">₹{item.baseFee}</td>
                        <td className="p-4 text-right font-bold text-emerald-600 text-sm">
                          {item.tip > 0 ? `+₹${item.tip}` : '-'}
                        </td>
                        <td className="p-4 text-right font-black text-dark">₹{item.total}</td>
                        <td className="p-4 text-center">
                          {item.status === 'paid' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <CheckCircle2 className="w-3 h-3" /> Paid Out
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                              <TrendingUp className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Bank Account / Payout Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-dark flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" /> Payout Method
          </h2>
          <Card className="p-6 border border-gray-100 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-sm">Primary Bank Account</h3>
                  <p className="text-xs font-semibold text-gray-400">Automatic Weekly Payouts</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-100">Active</span>
            </div>

            <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-gray-400">Bank</span>
                <span className="text-xs font-black text-dark">HDFC Bank Ltd.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-gray-400">Account No.</span>
                <span className="text-xs font-black text-dark">•••• •••• 4589</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-gray-400">IFSC Code</span>
                <span className="text-xs font-black text-dark">HDFC0001234</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Earnings are automatically processed every <strong className="text-dark">Monday</strong> and usually reflect in your bank account within 24-48 hours.
              </p>
            </div>

            <button className="w-full mt-6 bg-white border border-gray-200 text-dark font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              Manage Payout Methods <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
