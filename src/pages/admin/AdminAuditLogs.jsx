import React from 'react';
import { Search, Filter, ShieldAlert, Monitor, Terminal, FileEdit, LogIn, Lock } from 'lucide-react';

const AdminAuditLogs = () => {
  const logs = [
    { id: 'LOG-9921', time: '07 May 2024, 14:32:11', user: 'Admin (admin@fax.com)', action: 'System Settings Updated', ip: '192.168.1.42', status: 'Success', icon: FileEdit, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'LOG-9920', time: '07 May 2024, 11:15:05', user: 'System Auto', action: 'Daily Backup Completed', ip: 'localhost', status: 'Success', icon: Monitor, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'LOG-9919', time: '07 May 2024, 09:45:22', user: 'Unknown', action: 'Failed Login Attempt', ip: '45.22.11.89', status: 'Failed', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-100' },
    { id: 'LOG-9918', time: '06 May 2024, 18:20:10', user: 'Admin (admin@fax.com)', action: 'User Profile Deleted', ip: '192.168.1.42', status: 'Success', icon: Terminal, color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 'LOG-9917', time: '06 May 2024, 08:05:00', user: 'Admin (admin@fax.com)', action: 'Admin Login', ip: '192.168.1.42', status: 'Success', icon: LogIn, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Audit Logs</h1>
          <p className="text-sm font-medium text-gray-500">Track system activities, security events, and data changes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Lock className="w-4 h-4 text-red-500" />
            <span>Export Secure Log</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <input 
            type="text" 
            placeholder="Search logs by IP, User, or Action..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <option>All Events</option>
            <option>Security Only</option>
            <option>Data Changes</option>
            <option>Logins</option>
          </select>
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
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Action Event</th>
                <th className="px-6 py-4">User Agent</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log, i) => {
                const Icon = log.icon;
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-gray-900">{log.time.split(',')[0]}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{log.time.split(',')[1]}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${log.bg} ${log.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-gray-800">{log.action}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-600">{log.user}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block border border-gray-100">{log.ip}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminAuditLogs;
