import React from 'react';
import { CreditCard, Download, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

const FarmerPayments = () => {
  const transactions = [
    { id: 'TXN-001', date: '02 Aug 2024', amount: '₹12,450.00', status: 'Completed', type: 'Payout', method: 'Bank Transfer' },
    { id: 'TXN-002', date: '01 Aug 2024', amount: '₹3,200.00', status: 'Completed', type: 'Order Revenue', method: 'UPI' },
    { id: 'TXN-003', date: '28 Jul 2024', amount: '₹8,900.00', status: 'Pending', type: 'Order Revenue', method: 'Net Banking' },
    { id: 'TXN-004', date: '25 Jul 2024', amount: '₹15,000.00', status: 'Completed', type: 'Payout', method: 'Bank Transfer' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Payments & Transactions</h1>
          <p className="text-sm font-medium text-gray-500">Track your earnings, payouts, and order revenues.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#11311F] text-amber-500 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold hover:bg-[#064e3b] transition-colors">
          <Download className="w-4 h-4" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Total Earnings (This Month)</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">₹45,230.00</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold mt-2">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Pending Settlement</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">₹8,900.00</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold mt-2">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="text-amber-500">Processing</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Last Payout</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">₹12,450.00</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold mt-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span className="text-green-500">Completed on 02 Aug</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm overflow-hidden">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                <th className="font-semibold pb-3 px-2">Transaction ID</th>
                <th className="font-semibold pb-3 px-2">Date</th>
                <th className="font-semibold pb-3 px-2">Type</th>
                <th className="font-semibold pb-3 px-2">Method</th>
                <th className="font-semibold pb-3 px-2 text-right">Amount</th>
                <th className="font-semibold pb-3 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-2 text-[11px] font-bold text-gray-800">{txn.id}</td>
                  <td className="py-3 px-2 text-[11px] text-gray-600">{txn.date}</td>
                  <td className="py-3 px-2 text-[11px] font-semibold text-gray-700">{txn.type}</td>
                  <td className="py-3 px-2 text-[11px] text-gray-500">{txn.method}</td>
                  <td className="py-3 px-2 text-[11px] font-bold text-gray-900 text-right">{txn.amount}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default FarmerPayments;
