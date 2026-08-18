import React, { useState } from 'react';
import { Wallet, Building2, History, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

const FarmerPayouts = () => {
  const { wallet } = useWallet();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use real balance if available, otherwise mock
  const availableBalance = wallet ? wallet.balance : 23560;

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    if (Number(withdrawAmount) > availableBalance) {
      alert("Insufficient funds for this withdrawal.");
      return;
    }
    
    setIsWithdrawing(true);
    // Simulate API call
    setTimeout(() => {
      setIsWithdrawing(false);
      setShowSuccess(true);
      setWithdrawAmount('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const payoutHistory = [
    { id: 'PO-2024-089', date: '02 Aug 2024', amount: '₹12,450.00', status: 'Completed', method: 'Bank Transfer (ending in 4321)' },
    { id: 'PO-2024-075', date: '25 Jul 2024', amount: '₹15,000.00', status: 'Completed', method: 'Bank Transfer (ending in 4321)' },
    { id: 'PO-2024-061', date: '10 Jul 2024', amount: '₹8,500.00', status: 'Completed', method: 'Bank Transfer (ending in 4321)' },
    { id: 'PO-2024-042', date: '28 Jun 2024', amount: '₹22,000.00', status: 'Failed', method: 'UPI' },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">Payouts</h1>
        <p className="text-sm font-medium text-gray-500">Manage your earnings and withdraw funds to your bank account.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Actions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Available Balance Card */}
          <div className="bg-[#11311F] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-10 -translate-y-10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-gray-300">Available Balance</h3>
              </div>
              <h2 className="text-4xl font-black text-amber-500 mb-6">₹{availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
              
              <form onSubmit={handleWithdraw} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Withdraw Amount (₹)</label>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={availableBalance}
                    placeholder="Enter amount"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isWithdrawing || !withdrawAmount || Number(withdrawAmount) > availableBalance}
                  className="w-full bg-amber-500 text-[#11311F] font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWithdrawing ? 'Processing...' : 'Withdraw Funds'}
                  {!isWithdrawing && <ArrowRight className="w-4 h-4" />}
                </button>
                {showSuccess && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 p-2 rounded-lg justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                    Withdrawal request submitted!
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Linked Bank Account */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              Linked Bank Account
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-bold text-gray-900">State Bank of India</p>
                  <p className="text-xs text-gray-500 font-medium">•••• •••• •••• 4321</p>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
              </div>
              <p className="text-[10px] text-gray-400 font-semibold mt-2 border-t border-gray-200 pt-2">Ramesh Kumar</p>
            </div>
            <button className="w-full mt-3 text-xs font-bold text-[#0A6C35] hover:underline text-center">
              Manage Bank Accounts
            </button>
          </div>

        </div>

        {/* Right Column: Payout History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <History className="w-4 h-4 text-gray-400" />
                Payout History
              </h3>
              <button className="text-xs font-bold text-[#0A6C35] hover:underline">Download Report</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                    <th className="font-semibold pb-3 px-2">Payout ID</th>
                    <th className="font-semibold pb-3 px-2">Date</th>
                    <th className="font-semibold pb-3 px-2">Method</th>
                    <th className="font-semibold pb-3 px-2 text-right">Amount</th>
                    <th className="font-semibold pb-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((payout, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2 text-[11px] font-bold text-gray-800">{payout.id}</td>
                      <td className="py-4 px-2 text-[11px] text-gray-600">{payout.date}</td>
                      <td className="py-4 px-2 text-[11px] text-gray-600 font-medium">{payout.method}</td>
                      <td className="py-4 px-2 text-[11px] font-black text-gray-900 text-right">{payout.amount}</td>
                      <td className="py-4 px-2 text-center">
                        {payout.status === 'Completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            {payout.status}
                          </span>
                        )}
                        {payout.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                            <Clock className="w-3 h-3" />
                            {payout.status}
                          </span>
                        )}
                        {payout.status === 'Failed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                            <AlertCircle className="w-3 h-3" />
                            {payout.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {payoutHistory.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-sm font-medium">
                  No payouts requested yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FarmerPayouts;
