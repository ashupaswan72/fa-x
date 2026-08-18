import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Settings, Globe, Mail, ShieldAlert, IndianRupee, Users, Lock, Save, Truck } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'financial', 'roles', 'security'
  
  // --- CONFIG STATE ---
  const [config, setConfig] = useState({
    platformName: "FA-X Marketplace",
    tagline: "Pre-Order Fresh. Save More. Empower Farmers.",
    supportEmail: "support@fax.com",
    commissionRate: 5,
    deliveryCharge: 50,
    autoEmailNotifs: true,
    require2fa: false,
    strictPasswords: true
  });

  // --- ROLES STATE ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load config from LocalStorage if it exists
    const storedConfig = localStorage.getItem('fax_system_config');
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }

    // Load users for the Roles tab
    const fetchUsers = async () => {
      try {
        const data = await dbService.getUsers();
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    // Persist to local storage (acts as our global settings DB for this demo)
    localStorage.setItem('fax_system_config', JSON.stringify(config));
    showToast("Global configuration saved successfully!", "success");
  };

  const handleUpdateRole = async (uid, currentRole, newRole) => {
    if (currentRole === newRole) return;
    
    // Safety check mockup: assuming we know our own ID or can't easily demote ourselves if we are the only admin.
    if (newRole !== 'admin' && currentRole === 'admin') {
      if (!window.confirm("WARNING: You are about to demote an Admin. If this is your account, you will lose access. Proceed?")) {
        return;
      }
    }

    try {
      await dbService.updateUserRole(uid, newRole);
      showToast(`User role updated to ${newRole}!`, "success");
      
      // Update local state
      setUsers(users.map(u => u.uid === uid || u.id === uid ? { ...u, role: newRole } : u));
    } catch (e) {
      console.error(e);
      showToast(e.message || "Failed to update role", "error");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">System Settings</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Configure platform constants, financial rules, security policies, and user permissions.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'general' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <Settings className="w-4 h-4" /> Platform
        </button>
        <button 
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'financial' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <IndianRupee className="w-4 h-4" /> Financial
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'roles' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <Users className="w-4 h-4" /> Roles & Permissions
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'security' ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Security
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* TAB: GENERAL */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="space-y-6 text-xs font-semibold text-dark">
                <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> Identity & Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Platform Name</label>
                    <input 
                      type="text" 
                      value={config.platformName}
                      onChange={(e) => handleConfigChange('platformName', e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Support Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        value={config.supportEmail}
                        onChange={(e) => handleConfigChange('supportEmail', e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                        required
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Tagline / Mission</label>
                    <input 
                      type="text" 
                      value={config.tagline}
                      onChange={(e) => handleConfigChange('tagline', e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="space-y-6 text-xs font-semibold text-dark">
                <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" /> Global Behaviors
                </h2>
                <label className="flex items-start space-x-3 text-dark cursor-pointer p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                  <input 
                    type="checkbox" 
                    checked={config.autoEmailNotifs}
                    onChange={(e) => handleConfigChange('autoEmailNotifs', e.target.checked)}
                    className="w-4.5 h-4.5 mt-0.5 rounded border-emerald-300 text-primary" 
                  />
                  <div>
                    <p className="font-bold text-sm">Automatic Transaction Emails</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">Automatically send emails to customers when orders are shipped or refunded.</p>
                  </div>
                </label>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <h3 className="font-bold text-dark text-sm mb-4">Save Changes</h3>
                <p className="text-xs text-gray-500 mb-6">Unsaved changes will be lost if you navigate away from this tab.</p>
                <Button type="submit" variant="primary" fullWidth className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save General Settings
                </Button>
              </Card>
            </div>
          </form>
        )}

        {/* TAB: FINANCIAL */}
        {activeTab === 'financial' && (
          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="space-y-6 text-xs font-semibold text-dark">
                <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-500" /> Revenue & Charges
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="space-y-2 p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
                    <label className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1"><IndianRupee className="w-3 h-3"/> Platform Commission (%)</label>
                    <p className="text-[9px] text-gray-500 font-medium">The percentage of each sale taken as a platform fee.</p>
                    <input 
                      type="number" 
                      min="0" max="100" step="0.1"
                      value={config.commissionRate}
                      onChange={(e) => handleConfigChange('commissionRate', Number(e.target.value))}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-dark font-bold"
                    />
                  </div>

                  <div className="space-y-2 p-4 bg-blue-50/30 border border-blue-100 rounded-2xl">
                    <label className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1"><Truck className="w-3 h-3"/> Global Delivery Charge (₹)</label>
                    <p className="text-[9px] text-gray-500 font-medium">Flat rate delivery fee applied to customer checkouts.</p>
                    <input 
                      type="number" 
                      min="0"
                      value={config.deliveryCharge}
                      onChange={(e) => handleConfigChange('deliveryCharge', Number(e.target.value))}
                      className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-blue-500 text-dark font-bold"
                    />
                  </div>

                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-6 border-emerald-100">
                <h3 className="font-bold text-dark text-sm mb-4">Save Configuration</h3>
                <p className="text-[10px] text-gray-500 mb-6">Updating these values will immediately affect new orders and checkouts across the platform.</p>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 w-full text-white flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Financial Rules
                </Button>
              </Card>
            </div>
          </form>
        )}

        {/* TAB: ROLES & PERMISSIONS */}
        {activeTab === 'roles' && (
          <Card className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-dark">User Roles & Access Control</h2>
              <p className="text-xs text-gray-500 mt-1">Manage what permissions accounts have across the platform.</p>
            </div>

            {loading ? (
              <div className="text-center py-6 text-xs text-gray-400">Loading users...</div>
            ) : (
              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr className="text-[10px] uppercase text-gray-500 tracking-wider">
                      <th className="p-4 font-bold">User</th>
                      <th className="p-4 font-bold">Contact</th>
                      <th className="p-4 font-bold">Current Role</th>
                      <th className="p-4 font-bold">Change Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(user => (
                      <tr key={user.uid || user.id} className="hover:bg-gray-50/50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-bold text-dark">{user.name}</p>
                            <p className="text-[9px] font-mono text-gray-400">{user.uid || user.id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-[10px] text-gray-600">{user.email}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'farmer' ? 'bg-primary/20 text-primary' :
                            user.role === 'delivery' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {user.role || 'customer'}
                          </span>
                        </td>
                        <td className="p-4">
                          <select 
                            value={user.role || 'customer'}
                            onChange={(e) => handleUpdateRole(user.uid || user.id, user.role, e.target.value)}
                            className="text-xs font-semibold px-2 py-1 rounded-lg border border-gray-200 outline-none focus:border-primary"
                          >
                            <option value="customer">Customer</option>
                            <option value="farmer">Farmer</option>
                            <option value="delivery">Delivery</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* TAB: SECURITY */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="space-y-6 text-xs font-semibold text-dark border-rose-100">
                <h2 className="text-sm font-bold text-rose-600 border-b border-rose-50 pb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Security Policies
                </h2>
                
                <label className="flex items-start space-x-3 text-dark cursor-pointer p-4 bg-rose-50/30 rounded-xl border border-rose-100 hover:border-rose-200 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.require2fa}
                    onChange={(e) => handleConfigChange('require2fa', e.target.checked)}
                    className="w-4.5 h-4.5 mt-0.5 rounded border-rose-300 text-rose-500" 
                  />
                  <div>
                    <p className="font-bold text-sm text-rose-900">Require 2FA for Administrators</p>
                    <p className="text-[10px] text-rose-700/70 font-medium mt-1">Force all users with the 'admin' role to configure Two-Factor Authentication via Authenticator App before accessing this dashboard.</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 text-dark cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={config.strictPasswords}
                    onChange={(e) => handleConfigChange('strictPasswords', e.target.checked)}
                    className="w-4.5 h-4.5 mt-0.5 rounded border-gray-300 text-gray-700" 
                  />
                  <div>
                    <p className="font-bold text-sm">Strict Password Policies</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-1">Require uppercase, lowercase, numbers, and symbols for all new user signups.</p>
                  </div>
                </label>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-6 border-rose-100">
                <h3 className="font-bold text-dark text-sm mb-4">Update Policies</h3>
                <p className="text-[10px] text-gray-500 mb-6">Security policy changes apply globally.</p>
                <Button type="submit" className="bg-rose-500 hover:bg-rose-600 w-full text-white flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Security Rules
                </Button>
              </Card>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AdminSettings;
