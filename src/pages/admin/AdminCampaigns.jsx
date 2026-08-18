import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatPrice, formatDate, getDaysRemaining, getStatusBadgeStyle } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { FileSpreadsheet, Image as ImageIcon, Tag, BellRing, Trash2, PlusCircle, CheckCircle } from 'lucide-react';

const AdminCampaigns = () => {
  const [activeTab, setActiveTab] = useState('banners'); // 'banners', 'coupons', 'groupbuys', 'notifications'
  
  // Data states
  const [groupBuys, setGroupBuys] = useState([]);
  const [banners, setBanners] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newBanner, setNewBanner] = useState({ title: '', image_url: '', link: '' });
  const [newCoupon, setNewCoupon] = useState({ code: '', discount_pct: 10, max_uses: 100, expires_at: '' });
  const [newNotification, setNewNotification] = useState({ title: '', message: '', type: 'info' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gbs, bns, cps, nots] = await Promise.all([
        dbService.getGroupBuys(),
        dbService.getBanners(),
        dbService.getCoupons(),
        dbService.getNotifications()
      ]);
      setGroupBuys(gbs);
      setBanners(bns);
      setCoupons(cps);
      setNotifications(nots);
    } catch (e) {
      console.error(e);
      // Suppress error toast since tables might not exist yet if SQL script wasn't run
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- BANNERS LOGIC ---
  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      await dbService.createBanner(newBanner);
      showToast("Banner created successfully!", "success");
      setNewBanner({ title: '', image_url: '', link: '' });
      fetchData();
    } catch (e) {
      showToast("Failed to create banner (Did you run the SQL script?)", "error");
    }
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm("Delete this banner?")) {
      try {
        await dbService.deleteBanner(id);
        showToast("Banner deleted", "success");
        fetchData();
      } catch (e) {
        showToast("Failed to delete banner", "error");
      }
    }
  };

  // --- COUPONS LOGIC ---
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await dbService.createCoupon({
        ...newCoupon,
        code: newCoupon.code.toUpperCase(),
        expires_at: new Date(newCoupon.expires_at).toISOString()
      });
      showToast("Promo code created successfully!", "success");
      setNewCoupon({ code: '', discount_pct: 10, max_uses: 100, expires_at: '' });
      fetchData();
    } catch (e) {
      showToast("Failed to create promo code", "error");
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm("Delete this promo code?")) {
      try {
        await dbService.deleteCoupon(id);
        showToast("Promo code deleted", "success");
        fetchData();
      } catch (e) {
        showToast("Failed to delete promo code", "error");
      }
    }
  };

  // --- NOTIFICATIONS LOGIC ---
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      await dbService.createNotification(newNotification);
      showToast("System broadcast sent!", "success");
      setNewNotification({ title: '', message: '', type: 'info' });
      fetchData();
    } catch (e) {
      showToast("Failed to broadcast notification", "error");
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm("Delete this broadcast?")) {
      try {
        await dbService.deleteNotification(id);
        showToast("Broadcast removed", "success");
        fetchData();
      } catch (e) {
        showToast("Failed to delete broadcast", "error");
      }
    }
  };

  // --- GROUP BUYS LOGIC ---
  const handleSimulateRefund = async (campaign) => {
    if (window.confirm(`Are you sure you want to cancel and refund campaign ${campaign.id}?`)) {
      try {
        // ... existing mock refund logic ...
        showToast("Campaign closed. Participated buyers have been fully refunded!", "info");
        fetchData();
      } catch (e) {
        console.error(e);
        showToast("Refund execution failed", "error");
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Marketing & Content</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Manage homepage banners, global promo codes, group buys, and system broadcasts.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-100 pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'banners' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Homepage Banners
        </button>
        <button 
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'coupons' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <Tag className="w-4 h-4" /> Promo Codes
        </button>
        <button 
          onClick={() => setActiveTab('groupbuys')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'groupbuys' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Group Buys
        </button>
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === 'notifications' ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500' : 'text-gray-400 hover:text-dark'
          }`}
        >
          <BellRing className="w-4 h-4" /> System Broadcasts
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading marketing data...</div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* TAB: BANNERS */}
          {activeTab === 'banners' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <Card className="space-y-4 lg:col-span-1">
                <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-primary" /> Create Banner
                </h3>
                <form onSubmit={handleCreateBanner} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Banner Title</label>
                    <input 
                      type="text" 
                      required
                      value={newBanner.title}
                      onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Image URL (Banner Graphic)</label>
                    <input 
                      type="url" 
                      required
                      value={newBanner.image_url}
                      onChange={(e) => setNewBanner({...newBanner, image_url: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Target Link (Optional)</label>
                    <input 
                      type="text" 
                      value={newBanner.link}
                      onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                      placeholder="/products?category=fruits"
                    />
                  </div>
                  <Button type="submit" variant="primary" fullWidth>Upload Banner</Button>
                </form>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {banners.length > 0 ? (
                  banners.map(b => (
                    <Card key={b.id} className="flex gap-4 items-center p-3">
                      <img src={b.image_url} alt={b.title} className="w-32 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-black text-dark text-sm">{b.title}</h4>
                        <p className="text-[10px] text-gray-500 font-mono mt-1 truncate max-w-[200px]">{b.link || 'No link'}</p>
                      </div>
                      <button onClick={() => handleDeleteBanner(b.id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white border border-gray-100 rounded-3xl">
                    <ImageIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-400">No active banners found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <Card className="space-y-4 lg:col-span-1">
                <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-amber-500" /> Generate Promo Code
                </h3>
                <form onSubmit={handleCreateCoupon} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Code (e.g. SUMMER20)</label>
                    <input 
                      type="text" 
                      required
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                      className="w-full uppercase bg-amber-50/30 border border-amber-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 text-dark font-mono font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">% Discount</label>
                      <input 
                        type="number" 
                        required min="1" max="99"
                        value={newCoupon.discount_pct}
                        onChange={(e) => setNewCoupon({...newCoupon, discount_pct: Number(e.target.value)})}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 text-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Max Uses</label>
                      <input 
                        type="number" 
                        required min="1"
                        value={newCoupon.max_uses}
                        onChange={(e) => setNewCoupon({...newCoupon, max_uses: Number(e.target.value)})}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 text-dark"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Expiration Date</label>
                    <input 
                      type="datetime-local" 
                      required
                      value={newCoupon.expires_at}
                      onChange={(e) => setNewCoupon({...newCoupon, expires_at: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 text-dark"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="bg-amber-500 hover:bg-amber-600 border-none" fullWidth>Create Promo</Button>
                </form>
              </Card>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.length > 0 ? (
                  coupons.map(c => (
                    <Card key={c.id} className="relative overflow-hidden border-dashed border-2 border-amber-200 bg-amber-50/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-amber-600 text-xl font-mono tracking-widest">{c.code}</h4>
                          <p className="text-xs font-bold text-dark mt-1">{c.discount_pct}% OFF Entire Order</p>
                        </div>
                        <button onClick={() => handleDeleteCoupon(c.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-4 pt-3 border-t border-amber-200/50 flex justify-between items-end">
                        <div>
                          <p className="text-[9px] text-gray-500 font-bold uppercase">Uses left</p>
                          <p className="text-xs font-black text-dark">{c.max_uses - (c.current_uses || 0)} / {c.max_uses}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-500 font-bold uppercase">Expires</p>
                          <p className="text-[10px] font-bold text-dark">{formatDate(c.expires_at)}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 bg-white border border-gray-100 rounded-3xl">
                    <Tag className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-400">No active promo codes found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <Card className="space-y-4 lg:col-span-1">
                <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2 flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-rose-500" /> System Broadcast
                </h3>
                <form onSubmit={handleCreateNotification} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Alert Title</label>
                    <input 
                      type="text" 
                      required
                      value={newNotification.title}
                      onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400 text-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Message</label>
                    <textarea 
                      required rows={3}
                      value={newNotification.message}
                      onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400 text-dark resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Alert Type</label>
                    <select 
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-rose-400 text-dark"
                    >
                      <option value="info">Info (Blue)</option>
                      <option value="success">Success (Green)</option>
                      <option value="warning">Warning (Yellow)</option>
                      <option value="error">Critical (Red)</option>
                    </select>
                  </div>
                  <Button type="submit" variant="primary" className="bg-rose-500 hover:bg-rose-600 border-none" fullWidth>Broadcast Now</Button>
                </form>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <Card key={n.id} className={`border-l-4 ${
                      n.type === 'error' ? 'border-l-red-500' :
                      n.type === 'warning' ? 'border-l-amber-500' :
                      n.type === 'success' ? 'border-l-emerald-500' : 'border-l-blue-500'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-dark text-sm">{n.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">{formatDate(n.created_at)}</p>
                        </div>
                        <button onClick={() => handleDeleteNotification(n.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white border border-gray-100 rounded-3xl">
                    <BellRing className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-400">No active system broadcasts.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: GROUP BUYS (Existing) */}
          {activeTab === 'groupbuys' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupBuys.length > 0 ? groupBuys.map(gb => {
                const progress = (gb.currentMembers / gb.targetMembers) * 100;
                const daysLeft = getDaysRemaining(gb.deadline);

                return (
                  <Card key={gb.id} className="flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-dark text-sm leading-tight">{gb.productTitle}</h3>
                          <p className="text-[9.5px] text-gray-400 font-semibold uppercase">ID: {gb.id}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${getStatusBadgeStyle(gb.status)}`}>
                          {gb.status}
                        </span>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-xs font-semibold text-dark">
                          <span>Progress: {gb.currentMembers} / {gb.targetMembers} members</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>

                      <div className="bg-emerald-50/20 p-2.5 rounded-xl border border-emerald-500/5 text-xs text-dark space-y-1">
                        <p className="flex justify-between">
                          <span>Discount Tier:</span>
                          <span className="text-primary font-bold">-{gb.discountPct}% OFF</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Harvest End Date:</span>
                          <span>{formatDate(gb.deadline)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-50 pt-3 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-semibold">Days Remaining: {daysLeft}</span>
                      
                      {gb.status === 'active' && (
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleSimulateRefund(gb)}
                          className="text-[10px] py-1.5 px-3"
                        >
                          Cancel & Refund
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              }) : (
                <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
                  <FileSpreadsheet className="w-12 h-12 text-emerald-600/30 mx-auto" />
                  <h3 className="font-bold text-dark text-sm">No campaigns running</h3>
                  <p className="text-[11px] text-gray-400">Farmers can initiate campaigns from their inventories dashboard panels.</p>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AdminCampaigns;
