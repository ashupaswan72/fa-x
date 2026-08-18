import React from 'react';
import { Search, Filter, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';

const AdminReturns = () => {
  const returns = [
    { id: 'RET-1029', orderId: 'OD42874653', customer: 'Rohan Gupta', product: 'Premium Alphonso Mangoes', reason: 'Damaged during transit', date: '07 May 2024', status: 'Pending' },
    { id: 'RET-1028', orderId: 'OD42874612', customer: 'Simran Kaur', product: 'Fresh Farm Eggs (12 pcs)', reason: 'Received wrong item', date: '06 May 2024', status: 'Approved' },
    { id: 'RET-1027', orderId: 'OD42874588', customer: 'Amit Singhal', product: 'Organic Red Tomatoes', reason: 'Quality not as expected', date: '05 May 2024', status: 'Rejected' },
    { id: 'RET-1026', orderId: 'OD42874522', customer: 'Pooja Verma', product: 'Cold-Pressed Mustard Oil', reason: 'Leaking bottle', date: '04 May 2024', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Returns & Refunds</h1>
          <p className="text-sm font-medium text-gray-500">Manage order returns, replacements, and refund requests</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Clock className="w-6 h-6" /></div>
           <div>
             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pending Requests</p>
             <h3 className="text-2xl font-black text-gray-900">36</h3>
           </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
           <div>
             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Approved This Week</p>
             <h3 className="text-2xl font-black text-gray-900">142</h3>
           </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><XCircle className="w-6 h-6" /></div>
           <div>
             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Rejected This Week</p>
             <h3 className="text-2xl font-black text-gray-900">18</h3>
           </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <input 
            type="text" 
            placeholder="Search by Return ID or Order ID..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <span>Filter by Status</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Return ID / Date</th>
                <th className="px-6 py-4">Order Info</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {returns.map((ret, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900">{ret.id}</p>
                    <p className="text-xs text-gray-500 font-medium">{ret.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-green-700">{ret.orderId}</p>
                    <p className="text-xs text-gray-600 font-semibold">{ret.product}</p>
                    <p className="text-[10px] text-gray-500">Customer: {ret.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-700 italic">"{ret.reason}"</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ret.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      ret.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {ret.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {ret.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                      {ret.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {ret.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded text-xs font-bold transition-colors">Approve</button>
                        <button className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded text-xs font-bold transition-colors">Reject</button>
                      </div>
                    ) : (
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded text-xs font-bold transition-colors">View Details</button>
                    )}
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

export default AdminReturns;
