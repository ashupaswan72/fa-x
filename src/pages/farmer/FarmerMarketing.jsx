import React from 'react';
import { Megaphone, Tag, Users, TrendingUp, Plus, ArrowRight, Percent, CheckCircle2 } from 'lucide-react';

const FarmerMarketing = () => {
  const activeCampaigns = [
    { id: 'CAMP-01', name: 'Summer Mango Fest', type: 'Group Buy Discount', discount: '20% Off', status: 'Active', reach: '2.5k views' },
    { id: 'CAMP-02', name: 'Organic Veggie Bundle', type: 'Coupon Code (VEG15)', discount: '15% Off', status: 'Active', reach: '1.2k views' },
    { id: 'CAMP-03', name: 'Flash Sale: Basmati', type: 'Boosted Listing', discount: 'Sponsored', status: 'Scheduled', reach: '-' },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Marketing Tools</h1>
          <p className="text-sm font-medium text-gray-500">Boost your sales with group buys, coupons, and sponsored listings.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#11311F] text-amber-500 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold hover:bg-[#064e3b] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric Cards */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Active Campaigns</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">2</h3>
            <p className="text-[10px] font-bold text-green-600 mt-2">Running currently</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Total Campaign Sales</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">₹14,500</h3>
            <p className="text-[10px] font-bold text-green-600 mt-2">+12% vs last month</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Group Buy Members</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">45</h3>
            <p className="text-[10px] font-bold text-gray-400 mt-2">Across 3 active pools</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Campaign Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#11311F] rounded-xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/20 rounded-full blur-xl"></div>
            <Tag className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-bold text-lg mb-1">Coupon Codes</h3>
            <p className="text-xs text-gray-300 mb-4">Create fixed amount or percentage discounts for your loyal customers.</p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
              Create Coupon <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-bold text-gray-900">Group Buys</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Launch a community purchasing pool. Set a target quantity to unlock bulk discounts.</p>
            <button className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold py-2 rounded transition-colors">
              Start Group Buy
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900">Boost Listing</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Pay a small fee to feature your product at the top of search results for 7 days.</p>
            <button className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold py-2 rounded transition-colors">
              Boost Product
            </button>
          </div>
        </div>

        {/* Active Campaigns Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Manage Campaigns</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                    <th className="font-semibold pb-3 px-2">Campaign Name</th>
                    <th className="font-semibold pb-3 px-2">Type</th>
                    <th className="font-semibold pb-3 px-2">Offer</th>
                    <th className="font-semibold pb-3 px-2">Reach</th>
                    <th className="font-semibold pb-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCampaigns.map((camp, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">
                        <p className="text-[11px] font-bold text-gray-800">{camp.name}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{camp.id}</p>
                      </td>
                      <td className="py-4 px-2 text-[11px] text-gray-600 font-medium">{camp.type}</td>
                      <td className="py-4 px-2">
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100">
                          <Percent className="w-3 h-3" />
                          {camp.discount}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[11px] text-gray-500">{camp.reach}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {camp.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {activeCampaigns.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-sm font-medium">
                  No active campaigns. Start one to boost sales!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerMarketing;
