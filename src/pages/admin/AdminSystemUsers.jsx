import React from 'react';
import { Search, UserPlus, Shield, Key, Edit, Trash2 } from 'lucide-react';

const AdminSystemUsers = () => {
  const sysUsers = [
    { id: 'ADM-01', name: 'Super Admin', email: 'admin@fax.com', role: 'Super Administrator', status: 'Active', mfa: true, lastLogin: 'Just now' },
    { id: 'ADM-02', name: 'Support Manager', email: 'support@fax.com', role: 'Customer Support Lead', status: 'Active', mfa: true, lastLogin: '2 hours ago' },
    { id: 'ADM-03', name: 'Logistics Head', email: 'logistics@fax.com', role: 'Logistics Manager', status: 'Active', mfa: false, lastLogin: '1 day ago' },
    { id: 'ADM-04', name: 'Temp Auditor', email: 'audit@fax.com', role: 'Read-Only Auditor', status: 'Suspended', mfa: false, lastLogin: '2 weeks ago' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">System Users & Roles</h1>
          <p className="text-sm font-medium text-gray-500">Manage administrative staff, permissions, and RBAC</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#11311F] text-amber-500 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold hover:bg-[#064e3b] transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add New Staff</span>
          </button>
        </div>
      </div>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between border-l-4 border-l-purple-500">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">Super Administrators</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">1</h3>
           </div>
           <Shield className="w-8 h-8 text-purple-200" />
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between border-l-4 border-l-blue-500">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">Support / Managers</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">2</h3>
           </div>
           <Shield className="w-8 h-8 text-blue-200" />
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between border-l-4 border-l-gray-300">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase">Read-Only Roles</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">1</h3>
           </div>
           <Shield className="w-8 h-8 text-gray-200" />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Search staff members..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100">
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4 text-center">MFA Enabled</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sysUsers.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          {user.name}
                          {user.status === 'Suspended' && <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[9px] uppercase tracking-wider">Suspended</span>}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-md text-xs font-semibold">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.mfa ? (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">Yes</span>
                    ) : (
                      <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Manage Permissions">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Edit Staff">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Revoke Access">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default AdminSystemUsers;
