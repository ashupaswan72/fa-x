import React from 'react';
import { Search, Filter, MoreVertical, ShieldBan, Mail, Eye } from 'lucide-react';

const AdminCustomers = () => {
  const customers = [
    { id: 'CUST-8821', name: 'Aman Verma', email: 'aman.verma@example.com', orders: 42, ltv: '₹ 1.2 Lakh', joined: '12 Jan 2023', status: 'Active' },
    { id: 'CUST-8822', name: 'Sneha Patel', email: 'sneha.p@example.com', orders: 18, ltv: '₹ 45,000', joined: '04 Mar 2023', status: 'Active' },
    { id: 'CUST-8823', name: 'Rahul Sharma', email: 'rahul.s@example.com', orders: 5, ltv: '₹ 12,500', joined: '28 Aug 2023', status: 'Inactive' },
    { id: 'CUST-8824', name: 'Priya Singh', email: 'priya.singh@example.com', orders: 89, ltv: '₹ 3.4 Lakh', joined: '02 Nov 2022', status: 'Active' },
    { id: 'CUST-8825', name: 'Vikram Mehta', email: 'vikram.m@example.com', orders: 2, ltv: '₹ 4,200', joined: '15 Feb 2024', status: 'Suspended' },
    { id: 'CUST-8826', name: 'Anjali Desai', email: 'anjali.d@example.com', orders: 34, ltv: '₹ 98,000', joined: '19 May 2023', status: 'Active' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Customer Management</h1>
          <p className="text-sm font-medium text-gray-500">View and manage all registered customers (85,245 Total)</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <input 
            type="text" 
            placeholder="Search by name, email, or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Lifetime Value</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((cust, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{cust.name}</p>
                        <p className="text-xs text-gray-500">{cust.email} • {cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cust.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      cust.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">{cust.orders}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900">{cust.ltv}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{cust.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Suspend Account">
                        <ShieldBan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">6</span> of <span className="font-bold text-gray-900">85,245</span> results</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-xs font-medium text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminCustomers;
