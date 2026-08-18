import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice, formatDate, getDaysRemaining } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Plus, Users, Clock, Flame, FileSpreadsheet } from 'lucide-react';

const FarmerGroupBuys = () => {
  const { currentUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [targetMembers, setTargetMembers] = useState("");
  const [discountPct, setDiscountPct] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCampaigns = async () => {
    if (currentUser) {
      try {
        const allGbs = await dbService.getGroupBuys();
        const allProds = await dbService.getProducts();
        
        setCampaigns(allGbs.filter(c => c.farmerId === currentUser.uid));
        setProducts(allProds.filter(p => p.farmerId === currentUser.uid));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [currentUser]);

  const handleOpenModal = () => {
    if (products.length === 0) {
      showToast("Please add products to your inventory first.", "warning");
      return;
    }
    setSelectedProductId(products[0].id);
    setTargetMembers(10);
    setDiscountPct(15);
    setDeadline("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId || !targetMembers || !discountPct || !deadline) {
      showToast("Please complete all form fields.", "warning");
      return;
    }

    setSubmitting(true);
    const prod = products.find(p => p.id === selectedProductId);
    
    const payload = {
      productId: selectedProductId,
      productTitle: prod.title,
      farmerId: currentUser.uid,
      targetMembers: Number(targetMembers),
      discountPct: Number(discountPct),
      deadline: new Date(deadline).toISOString()
    };

    try {
      await dbService.createGroupBuy(payload);
      showToast("Group Buy campaign successfully launched! 👥", "success");
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      showToast("Failed to launch campaign", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
        <div>
          <h1 className="text-3xl font-black text-dark">Group Buying Campaigns</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Pool customers together to sell high-volume crops under discounted terms.</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={handleOpenModal}
          className="flex items-center space-x-1"
        >
          <Plus className="w-5.5 h-5.5" />
          <span>Launch Campaign</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading campaigns...</div>
      ) : campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map(gb => {
            const progress = (gb.currentMembers / gb.targetMembers) * 100;
            const daysLeft = getDaysRemaining(gb.deadline);

            return (
              <Card key={gb.id} className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-dark text-sm leading-snug">{gb.productTitle}</h3>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Campaign ID: {gb.id}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                      gb.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {gb.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-dark bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-500/5">
                    <span className="flex items-center space-x-1"><Flame className="w-4 h-4 text-accent-hover" /> <span>-{gb.discountPct}% Discount</span></span>
                    <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5 text-primary" /> <span>{daysLeft} days left</span></span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs font-semibold text-dark">
                      <span>Progress: {gb.currentMembers} / {gb.targetMembers} members</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3 text-[10px] text-gray-400 font-medium">
                  Campaign Ends: {formatDate(gb.deadline)}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
          <FileSpreadsheet className="w-12 h-12 text-emerald-600/30 mx-auto" />
          <h3 className="font-bold text-dark text-sm">No active group buys</h3>
          <p className="text-[11px] text-gray-400">Launch a campaign to pool customers for your harvest surplus at custom discounts.</p>
        </div>
      )}

      {/* Campaign Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-bold text-dark text-lg">Launch Group Buy Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-dark text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-dark">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Choose Crop / Product</label>
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title} (₹{p.price}/kg)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Target Members (Buyers)</label>
                  <input 
                    type="number" 
                    value={targetMembers}
                    onChange={(e) => setTargetMembers(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Campaign Discount (%)</label>
                  <input 
                    type="number" 
                    value={discountPct}
                    onChange={(e) => setDiscountPct(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Campaign Deadline Date</label>
                <input 
                  type="datetime-local" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={submitting}
                className="py-3"
              >
                Launch Pool Campaign
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FarmerGroupBuys;
